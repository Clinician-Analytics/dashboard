const express = require("express");
const router = express.Router();

const AnnualReport = require("../../models/AnnualReport");

// @route   GET /uploads/test
// @desc    Tests upload route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Upload Works" }));

// @route   POST /uploads
// @desc    Upload route
// @access  Public
router.post("/", async (req, res) => {
  console.log(req.body.data);
  try {
    await AnnualReport.collection.insertMany(req.body.data, status => {

      res.json(status)
    });
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;