require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userApi = require("./routes/userApi");
const itemsApi = require("./routes/items");
const connectDB = require("./db/db");
const path = require("path");
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(helmet());
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app's dist directory
app.use(express.static(path.join(__dirname, "./clients/dist")));

app.use("/api", userApi);
app.use("/api", itemsApi);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./clients/dist", "index.html"));
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port:", PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server due to database connection error:", err);
  });

