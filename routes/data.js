const express = require("express");
const dataRouter = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const User = require("../models/User");
const Data = require("../models/Data");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const Transaction = require("../models/Transaction");


// Get plans by network
dataRouter.get('/plans/:network', async (req, res) => {
    const { network } = req.params;

    // Validate that network is a valid number
    const networkId = parseInt(network, 10);

    if (isNaN(networkId)) {
        return res.status(400).json({ error: "Invalid network ID." });
    }

    try {
        // Fetch data plans from the database based on the network
        const plans = await Data.find({ network: networkId });

        // If no plans are found for the specified network
        if (plans.length === 0) {
            return res.status(404).json({ error: "No plans found for the specified network." });
        }

        // Return the plans
        return res.status(200).json({ plans });
    } catch (error) {
        console.error("Error fetching plans:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a specific data plan by network and plan ID
dataRouter.get('/plans/:network/:planId', async (req, res) => {
    const { network, planId } = req.params;

    // Validate that network and planId are valid numbers
    const networkId = parseInt(network, 10);
    const planIdNum = parseInt(planId, 10);

    if (isNaN(networkId) || isNaN(planIdNum)) {
        return res.status(400).json({ error: "Invalid network ID or plan ID." });
    }

    try {
        // Fetch the specific plan for the network
        const plan = await Data.find({ network: networkId, planId: planIdNum });
        
        // If no plan is found for the specified network and planId
        if (!plan) {
            return res.status(404).json({ error: "No plan found for the specified network and plan ID." });
        }

        // Return the found plan
        return res.status(200).json({ plan });
    } catch (error) {
        console.error("Error fetching plan:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// buy data route endpoint
dataRouter.post("/data/buy", authenticateToken, async (req, res) => {
    const { provider, planId, phone, pin } = req.body;
    const userId = req.user;

    // Check for missing fields
    if (!provider || !planId || !phone || !pin) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Find the user
        const user = await User.findById(userId.id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Find the selected data plan
        const plan = await Data.findOne({ planId, network: provider });
        if (!plan) {
            return res.status(400).json({ error: "Plan not found" });
        }

          // Verify user's PIN
        const isPinValid = await bcrypt.compare(pin, user.pin);
        if (!isPinValid) {
            return res.status(400).json({ error: "Invalid PIN" });
        }

        // Check user's balance
        if (user.balance < plan.amount) {
            return res.status(400).json({ error: "Insufficient funds. Please fund your wallet." });
        }

        // Prepare payload for the external API
        const payload = {
            network: provider,
            phone: phone,
            data_plan: planId,
            bypass: false,
            'request-id': `Data_${Date.now()}`
        };

        const headers = {
            "Authorization": `Token ${process.env.API_KEY}`,
            "Content-Type": "application/json"
        };

        // Create transaction
        const transaction = new Transaction({
            userId: user._id,
            network: provider,
            planId: planId,
            phone: phone,
            amount: plan.amount,
            status: 'pending',
            requestId: payload['request-id']
        });
        await transaction.save();

        // Send the request to the external API
        const response = await axios.post('https://legitdataway.com/api/data', payload, { headers });

        // Handle the external API response
        if (response.status === 200 && response.data.success) {
            user.balance -= plan.amount;
            await user.save();

            transaction.status = 'success';
            transaction.transactionId = response.data['request-id'];
            await transaction.save();

            return res.status(200).json({
                success: true,
                message: "Data purchase successful",
                externalResponse: response.data
            });
        } else {
            transaction.status = 'failed';
            await transaction.save();

            return res.status(500).json({
                error: "Failed to purchase data through external API",
                externalResponse: response.data
            });
        }
    } catch (error) {
        console.error("Data purchase request failed:", error);

        // Handle errors and send relevant message to the user
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data || "Data purchase request failed"
            });
        }

        return res.status(500).json({ error: "Data purchase request failed" });
    }
});

module.exports = dataRouter;
