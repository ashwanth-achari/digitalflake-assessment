const User = require("../models/User-model");

// Home
const home = async (req, res) => {
  res.status(200).send("Welcome by digitalflake Home Page");
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Fetch user with password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next({
        status: 400,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next({
        status: 400,
        message: "Invalid email or password",
      });
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { home, login };
