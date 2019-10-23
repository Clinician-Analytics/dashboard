const express = require("express");
const router = express.Router();
const { check, validationResults } = require("express-validator");
const auth = require("../../middleware/auth");

const AnnualReport = require("../../models/AnnualReport");
const User = require("../../models/User");

// @route   GET /reports/test
// @desc    Tests reports route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

// @route   POST /reports/heatmap
// @desc    Post annual reports data for generating the heatmap the report parameter is the year of the report ie annual_report_2019
// @access  Public
router.post("/heatmap", async (req, res) => {
    try {
        const heatmapData = await AnnualReport.aggregate( [
            {$match: {} },
            { $group: { day: "$heatmap_date", value: { $sum: 1 } } }
         ] )
        console.log(heatmapData)
        res.send(heatmapData)
    } catch (err) {
        res.status(500).send('Server Error')
    }
});

// @route   POST /reports
// @desc    Post reports data
// @access  Public
router.post("/", (req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        res.status(500).send('Server Error')
    }
});

module.exports = router;
