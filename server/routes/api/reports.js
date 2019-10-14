const express = require("express");
const router = express.Router();
const { check, validationResults } = require("express-validator");
const auth = require("../../middleware/auth");
const csv2json = require('csv2json');
const fs = require('fs');

const AnnualReport = require("../../models/AnnualReport");
const User = require("../../models/User");


// @route   GET /reports/test
// @desc    Tests reports route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

// @route   POST /reports
// @desc    Post reports data
// @access  Public
router.post("/", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    if (req.body.uid === "") {
        return res.status(400).json({ msg: "No email provided" });
    }
    const file = req.files.file;
    try {
        fs.createReadStream(file)
            .pipe(csv2json({
                // Defaults to comma.
                separator: ';'
            }))
            .pipe(fs.createWriteStream('data.json'));
    } catch (err) {
        res.status(500).send('Server Error')
    }
});

module.exports = router;
