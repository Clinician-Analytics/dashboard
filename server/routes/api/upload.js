const express = require("express");
const router = express.Router();

// @route   GET upload/test
// @desc    Tests upload route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Upload Works" }));

module.exports = router;
