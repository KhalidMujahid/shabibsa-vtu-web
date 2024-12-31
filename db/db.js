const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.error("Error while connecting to database:", err);
    process.exit(1);
  }
}

module.exports = connectDB;

