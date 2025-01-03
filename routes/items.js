const { Router } = require("express");
const axios = require("axios");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Cable = require("../models/Cable");
const itemsApi = Router();
const path = require("path");
const bcrypt = require("bcryptjs");
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

//exams route get request
itemsApi.get("/exams", async (req, res, next) => {
  try {
    const exams = await Exam.find();
    if (!exams || exams.length === 0) {
      return res.status(404).json({ error: "No exams found" });
    }

    return res.status(200).json({ exams });
  } catch (error) {
    next(error);
  }
});

//exams amount route get request
itemsApi.get("/exams/amount", async (req, res, next) => {
  try {
    const { examName } = req.query;

    if (!examName) {
      return res.status(400).json({ error: "Exam name is required." });
    }

    const exam = await Exam.findOne({ examName });

    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    return res.status(200).json({ amount: exam.amount });
  } catch (error) {
    next(error);
  }
});

//exams route post
itemsApi.post("/exams", authenticateToken, async (req, res, next) => {
  try {
    const { exam_name, quantity, pin } = req.body;
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

    // Verify user's PIN
    const isPinValid = await bcrypt.compare(pin, getUser.pin);
    if (!isPinValid) {
      return res.status(400).json({ error: "Invalid PIN" });
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

// electricity 
itemsApi.post("/bills", authenticateToken, async (req, res, next) => {
  try {
    const { disco, meterType, meterNumber, amount, pin } = req.body;
    const userId = req.user.id;

    // Check for missing required fields
    if (!disco || !meterType || !meterNumber || !amount || !pin) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Get the current user from the database
    const getUser = await User.findById(userId);
    if (!getUser) {
      return res.status(400).json({ error: "User not found!" });
    }

    const isPinValid = await bcrypt.compare(pin, getUser.pin);
    if (!isPinValid) {
      return res.status(400).json({ error: "Invalid PIN" });
    }

    // Check if the user's balance is sufficient to pay the bill
    if (getUser.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds. Please fund your wallet." });
    }

    // Prepare the payload for the payment API request
    const payload = {
      disco,
      meter_typer: meterType,
      meter_number: meterNumber,
      amount,
      bypass: false,
      'request-id': `Bill_${Date.now()}`
    };

    // Set the headers for the API request (assuming the external payment API requires an API key)
    const headers = {
      "Authorization": `Bearer ${process.env.PAYMENT_API_KEY}`,
      "Content-Type": "application/json",
    };

    const paymentResponse = await axios.post('https://legitdataway.com/api/bill', payload, { headers });

    if (paymentResponse.data.success) {
      getUser.balance -= amount;
      await getUser.save();

      // Optionally, create a transaction record in the database
      // const transaction = new Transaction({
      //   user: userId,
      //   amount,
      //   bill: bill._id,
      //   type: 'debit',
      // });
      // await transaction.save();

      return res.status(200).json({
        success: true,
        message: "Bill payment successful!",
        data: paymentResponse.data,
      });
    } else {
      // Handle payment API failure
      return res.status(400).json({
        error: paymentResponse.data.message || "Payment failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error while processing the bill payment:", error);
    next(error);
  }
});

// POST route to create a new cable entry and make the external API call
itemsApi.post("/cable", authenticateToken, async (req, res, next) => {
  try {
    const { cable, iuc, cable_plan, pin } = req.body;
    const userId = req.user.id;

    if (!cable || !iuc || !cable_plan || !pin) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Get the current user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Validate the user's PIN
    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      return res.status(400).json({ error: "Invalid PIN" });
    }

    // Check if the user's balance is sufficient to pay the bill
    if (user.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds. Please fund your wallet." });
    }

    // Prepare the payload for the external API call
    const payload = {
      cable: cable,
      iuc: iuc,
      cable_plan: cable_plan,
      bypass: false,
      'request-id': `Cable_${Date.now()}`
    };

    // Set the headers for the external API call
    const headers = {
      Authorization: `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    };

    // Make the POST request to the external API
    const externalResponse = await axios.post('https://legitdataway.com/api/cable', payload, { headers });

    if (externalResponse.data.success) {

      // Optionally, create a transaction record (if needed for tracking purposes)
      // const transaction = new Transaction({
      //   user: userId,
      //   cable: newCable._id,
      //   type: 'debit', // If this is a debit operation, for example
      // });
      // await transaction.save();

      // Return a successful response
      res.status(201).json({
        success: true,
        message: "Cable payment successfully!",
        cable: newCable,
      });
    } else {
      return res.status(400).json({
        error: externalResponse.data.message || "Payment failed. Please try again.",
      });
    }
  } catch (error) {
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

itemsApi.post('/add/exam', async (req, res) => {
  const { examName, planId, amount } = req.body;

  if (!examName || !planId || !amount) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (typeof examName !== 'string' || examName.trim().length === 0) {
    return res.status(400).json({ message: 'Exam name must be a non-empty string.' });
  }

  if (typeof planId !== 'number' || planId <= 0) {
    return res.status(400).json({ message: 'Plan ID must be a positive number.' });
  }

  if (typeof amount !== 'number' || amount < 0) {
    return res.status(400).json({ message: 'Amount must be a positive number.' });
  }

  try {
    // Create the new exam
    const newExam = new Exam({
      examName,
      planId,
      amount,
    });

    // Save the new exam to the database
    await newExam.save();

    return res.status(201).json({ message: 'Exam added successfully.', exam: newExam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding the exam.', error: error.message });
  }
});

itemsApi.get("/admin", async (req, res) => {
  const data = await Data.find();
  return res.status(200).json(data);
})

module.exports = itemsApi;

