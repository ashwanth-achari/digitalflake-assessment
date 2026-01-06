const mongoose = require("mongoose");
const User = require("../models/User-model");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const adminUser = new User({
      username: "Admin",
      email: "admin@gmail.com",
      phone: "1234567890",
      password: "Admin@123",
    });

    await adminUser.save();

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
