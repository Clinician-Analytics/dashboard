const express = require("express");
const router = express.Router();
const { check, validationResults } = require("express-validator");
const auth = require("../../middleware/auth");

const SystemData = require("../../models/SystemData");

// @route   GET /reports/test
// @desc    Tests reports route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

module.exports = router;
