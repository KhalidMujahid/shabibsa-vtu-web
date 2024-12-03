const { Router } = require("express");
const axios = require("axios");
const User = require("../models/User");
const FormData = require("form-data");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs");
const itemsApi = Router();
const path = require("path");
const { authenticateToken } = require("../middlewares/auth");

// by airtime airtime route
itemsApi.post("/airtime/buy", authenticateToken, async (req, res) => {
  const { amount, phone, pin, network_id } = req.body;
  const userId = req.user._id;

  if (!pin) {
    return res.status(400).json({ error: "PIN is required" });
  }

  try {
    // Verify the user and PIN
    const user = await User.findById(userId);
    if (!user || !(await bcrypt.compare(pin, user.pin))) {
      return res.status(400).json({ error: "Invalid user or PIN" });
    }

    const requestData = {
      network: network_id,
      amount,
      mobile_number: phone,
      Ported_number: true,
      airtime_type: "VTU",
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://datastationapi.com/api/topup/",
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(requestData),
    };

    const response = await axios(config);

    res.json(response.data);
  } catch (error) {
    console.error("Payment request failed:", error.message);

    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data || "Payment request failed" });
    }

    // Handle other errors
    res.status(500).json({ error: "Payment request failed" });
  }
});

// get data plans
itemsApi.get('/plans/:network', async (req, res) => {
  const { network } = req.params;

  if (!network) {
    return res.status(400).json({ error: "Network parameter is required." });
  }

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://datastationapi.com/api/user/`,
    headers: {
      'Authorization': `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);

    const plans = response.data.Dataplans[network];
    if (!plans) {
      return res.status(404).json({ error: `No plans found for network: ${network}` });
    }

    return res.status(200).json({ data: plans });
  } catch (error) {
    console.error('Error fetching plans:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch plans', details: error?.response?.data });
  }
});

//data plan
itemsApi.get('/data/:plans', async (req, res) => {
  const { plan } = req.params;

  if (!network) {
    return res.status(400).json({ error: "Network parameter is required." });
  }

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://datastationapi.com/api/user/`,
    headers: {
      'Authorization': `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);

    const plans = response.data.Dataplans[network];
    if (!plans) {
      return res.status(404).json({ error: `No plans found for network: ${network}` });
    }

    return res.status(200).json({ data: plans });
  } catch (error) {
    console.error('Error fetching plans:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch plans', details: error?.response?.data });
  }
});

// buy data
itemsApi.post("/data/buy", authenticateToken,async (req, res) => {
  const { provider, planId, phone, pin,amount } = req.body;
  const userId = req.user;

  // Check for missing fields
  if (!provider || !planId || !phone || !pin) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check user's balance
    if (user.balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient funds. Please fund your wallet." });
    }

    // Verify user's PIN
    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      return res.status(400).json({ error: "Invalid PIN" });
    }

    // Prepare data for API request
    const requestData = {
      network: provider,
      mobile_number: phone,
      plan: planId,
      Ported_number: true,
    };

    // Configure the Axios request
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://datastationapi.com/api/data/",
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(requestData),
    };

    // Send the API request
    const response = await axios(config);

    // Deduct amount from user balance
    user.balance -= amount;
    await user.save();

    // Respond with API response data
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Data purchase request failed:", error);

    // Handle Axios-specific errors
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "Data purchase request failed",
      });
    }

    // Handle other errors
    res.status(500).json({ error: "Data purchase request failed" });
  }
});

//bluk sms
itemsApi.post("/bluksms", async(req,res,next) => {
  try{
    const { recipients,message } = req.body;
    
  } catch(error){
    next(error);
  }
});

//exams route
itemsApi.post("/exams", async (req, res, next) => {
  try {
    const { exam_name, quantity } = req.body;

    if (!exam_name || !quantity) {
      return res.status(400).json({ error: "exam_name and quantity are required." });
    }

    const data = JSON.stringify({
      exam_name: exam_name,
      quantity: quantity,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://datastationapi.com/api/epin/",
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    res.status(200).json(response.data);

  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from the server." });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
    next(error);
  }
});

// download apk
itemsApi.get('/download', async (req, res, next) => {
  const filePath = path.resolve(__dirname, '../public');
  return res.status(200).download(filePath, 'banaconnect.apk', (err) => {
    if (err) {
      next(err);
    }
  });
});


module.exports = itemsApi;
