const express = require("express");
const router = express.Router();

const AnnualReport = require("../../models/AnnualReport");

// @route   GET /upload/test
// @desc    Tests upload route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Upload Works" }));

// @route   POST /upload
// @desc    Upload route
// @access  Public
router.post("/", async (req, res) => {
  console.log(req.body.data);
  try {
    AnnualReport.collection.insertMany(req.body.data, onInsert);
    const onInsert = (err, docs) => {
      if (err) {
        console.error(err);
      } else {
        console.info("%d objects were successfully stored.", docs.length);
      }
    }
  } catch(err) {
    console.error(err)
  }
});

module.exports = router;