const { Router } = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const Transaction = require('../models/Transaction');
const { authenticateToken } = require('../middlewares/auth');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

const userApi = Router();

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shabibsadata@gmail.com",
    pass: process.env.EMAIL_PASSWORD
  },
});

//login route
userApi.post(
  '/login',
  [
    body('emailOrUsername')
      .notEmpty()
      .withMessage('Please provide an email or username'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { emailOrUsername, password } = req.body;

    try {
      // Find the user by email or username
      const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email/username or password' });
      }

      // Compare the provided plain password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email/username or password' });
      }

      // Generate JWT token for the user
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      // Set the auth token cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });

      // Set the refresh token cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 3600000,
      });

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstname: user.firstName,
          lastname: user.lastName,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
);




userApi.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('authToken', newToken, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Token refreshed' });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});

//register route
const registerValidationRules = [
  body("firstName")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .trim()
    .escape(),
  body("lastName")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters")
    .trim()
    .escape(),
  body("username")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters")
    .trim()
    .escape(),
  body("phoneNumber")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits")
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  body("pin")
    .matches(/^[0-9]{4}$/)
    .withMessage("PIN must be exactly 4 digits"),
  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender selection"),
];

userApi.post("/register", registerValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, username, phoneNumber, email, password, pin, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const existUserName = await User.findOne({ username });
    if (existUserName) {
      return res.status(400).json({ message: "User already exists with this username" });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password,
      pin,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});


// Route to get transactions
userApi.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ userId });

    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this user.' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'An error occurred while fetching transactions.' });
  }
});

// route to get balance
userApi.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Route to get recent transactions
userApi.get('/recent/transactions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(10);

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


//logout
userApi.post('/logout', (req, res) => {
  res.clearCookie('authToken', {
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.clearCookie('refreshToken', {
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

//forget password

userApi.post("/forgetpassword", async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required! " });

    //check email if exit in database
    const emailExit = await User.findOne({ email });
    if (!emailExit) return res.status(400).json({ message: "Email does not exit!" });

    // Generate a random OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save OTP in the store with a short expiry time (e.g., 5 minutes)
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // Send OTP via email
    const mailOptions = {
      from: "shabibsadata@gmail.com",
      to: emailExit.email,
      subject: "Your Password Reset OTP",
      text: `Hello ${emailExit.firstName} ${emailExit.lastName},\n\nYour OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "OTP sent to your email." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email. Please try again later." });
    }


  } catch (error) {
    next(error);
  }
});

// Endpoint to verify OTP
userApi.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const otpData = otpStore[email];

  if (!otpData) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  if (otpData.otp.toString() !== otp) {
    return res.status(400).json({ message: "Incorrect OTP." });
  }

  if (Date.now() > otpData.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired." });
  }

  // OTP is valid
  delete otpStore[email];
  res.json({ message: "OTP verified successfully. Proceed to reset your password." });
});

// update password route
userApi.post("/password-reset", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and newPassword are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and new password are required!" });
    }

    // Fetch the user by email
    const emailUser = await User.findOne({ email });
    if (!emailUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Update the user's password
    emailUser.password = password;
    await emailUser.save();

    // Respond with success
    return res.status(200).json({ message: "Password has been successfully reset!" });

  } catch (error) {
    next(error);
  }
});

userApi.get("/delete", async (req, res) => {
  await User.deleteMany({});
});

module.exports = userApi;
