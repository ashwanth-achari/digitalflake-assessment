const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    if (!URI) {
      console.error("MONGODB_URI is missing in environment variables.");
      process.exit(1);
    }

    await mongoose.connect(URI);
    console.log("Database connection successfull");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
