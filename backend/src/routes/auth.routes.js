const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const {loginSchema} = require("../validators/auth.schema");
const validate = require("../middlewares/validate-middleware");

// home route
router.route("/").get(authController.home);

// Login route
router
.route("/login")
.post(validate(loginSchema),authController.login);

module.exports = router;
