const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.route("/").get(authController.home);

module.exports = router;
