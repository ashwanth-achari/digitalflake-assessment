const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Home Logic 
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome by controller Home Page");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { home };
