const express = require("express");
const airtimeRouter = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const User = require("../models/User");
const Data = require("../models/Data");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const Transaction = require("../models/Transaction");


// buy data route endpoint
airtimeRouter.post("/airtime/buy", authenticateToken, async (req, res) => {
    const { provider, amount, phone, pin } = req.body;
    const userId = req.user;

    // Check for missing fields
    if (!provider || !amount || !phone || !pin) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Find the user
        const user = await User.findById(userId.id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check user's balance
        if (user.balance < amount) {
            return res.status(400).json({ error: "Insufficient funds. Please fund your wallet." });
        }

        // Verify user's PIN
        const isPinValid = await bcrypt.compare(pin, user.pin);
        if (!isPinValid) {
            return res.status(400).json({ error: "Invalid PIN" });
        }

        // Prepare payload for the external API
        const payload = {
            network: provider,
            phone: phone,
            plan_type: "VTU",
            bypass: false,
            'request-id': `Airtime${Date.now()}`,
            amount
        };

        const headers = {
            "Authorization": `Token ${process.env.API_KEY}`,
            "Content-Type": "application/json"
        };

        // Create transaction
        const transaction = new Transaction({
            userId: user._id,
            network: provider,
            phone,
            amount,
            status: 'pending',
            requestId: payload['request-id']
        });
        await transaction.save();

        // Send the request to the external API
        const response = await axios.post('https://legitdataway.com/api/topup/', payload, { headers });

        // Handle the external API response
        if (response.status === 200 && response.data.success) {
            user.balance -= plan.amount;
            await user.save();

            transaction.status = 'success';
            transaction.transactionId = response.data['request-id'];
            await transaction.save();

            return res.status(200).json({
                success: true,
                message: "Airtime purchase successful",
                externalResponse: response.data
            });
        } else {
            transaction.status = 'failed';
            await transaction.save();

            return res.status(500).json({
                error: "Failed to purchase airtime through external API",
                externalResponse: response.data
            });
        }
    } catch (error) {
        console.error("Airtime purchase request failed:", error);

        // Handle errors and send relevant message to the user
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data || "Airtime purchase request failed"
            });
        }

        return res.status(500).json({ error: "Airtime purchase request failed" });
    }
});

module.exports = airtimeRouter;