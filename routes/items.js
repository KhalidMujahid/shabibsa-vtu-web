const { Router } = require("express");
const axios = require("axios");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const itemsApi = Router();
const path = require("path");
const Data = require("../models/Data");
const { authenticateToken } = require("../middlewares/auth");
const Exam = require("../models/Exam");

//bluk sms
itemsApi.post("/bluksms", async (req, res, next) => {
  try {
    // Extract data from the request body
    const { sender, number, message } = req.body;

    // Prepare the payload
    const payload = {
      sender,
      number,
      message,
    };

    // Define the headers for the API request
    const headers = {
      "Authorization": `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Send the request using axios
    const response = await axios.post('https://legitdataway.com/api/bulksms', payload, { headers });

    // Handle success (send the response from the external API)
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//exams route
itemsApi.post("/exams", authenticateToken, async (req, res, next) => {
  try {
    const { exam_name, quantity } = req.body;
    const userId = req.user;

    // Check for missing required fields
    if (!exam_name || !quantity) {
      return res.status(400).json({ error: "Exam name and quantity are required." });
    }

    // Get the current user
    const getUser = await User.findById(userId.id);
    if (!getUser) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Find the exam based on exam_name
    const exam = await Exam.findOne({ examName: exam_name });
    if (!exam) {
      return res.status(400).json({ error: "Exam not found!" });
    }

    // Check if the user's balance is enough to purchase the exam
    if (getUser.balance < exam.amount) {
      return res.status(400).json({ error: "Insufficient funds. Please fund your wallet." });
    }

    // Prepare the payload for the API request
    const payload = {
      exam: exam.planId,
      quantity: quantity
    };

    // Set the headers for the API request
    const headers = {
      "Authorization": `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Send the POST request using axios
    const response = await axios.post('https://legitdataway.com/api/exam', payload, { headers });

    // Return the response data if the request was successful
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error while processing the exam purchase:", error);
    next(error);
  }
});


// download apk
// itemsApi.get('/download', async (req, res, next) => {
//   const filePath = path.resolve(__dirname, '../public');
//   return res.status(200).download(filePath, 'banaconnect.apk', (err) => {
//     if (err) {
//       next(err);
//     }
//   });
// });

// Admin endpoint
itemsApi.post("/admin", async (req, res, next) => {
  try {
    const { planId, network, planType, planName, amount } = req.body;

    if (!planId || !network || !planType || !planName || !amount) {
      return res.status(400).json({ error: "All fields are required." });
    }

   
    const newData = new Data({
      planId,
      network,
      planType,
      planName,
      amount
    });

    // Save the new data to the database
    await newData.save();

    // Send a success response with the created document
    return res.status(201).json({ message: "Data added successfully", data: newData });

  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ error: "An error occurred while adding data." });
  }
});

itemsApi.get("/admin",async (req,res) => {
  const data = await Data.find();
  return res.status(200).json(data);
})

module.exports = itemsApi;

