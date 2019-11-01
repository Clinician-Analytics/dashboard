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

// @route   POST /reports/annual-report
// @desc    Post annual reports data for generating the heatmap the report parameter is the year of the report ie annual_report_2019
// @access  Public
router.post("/annual-reports", async (req, res) => {
  const contents = {};
  try {
    const heatmapData = await AnnualReport.aggregate([
      { $match: {} },
      { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
      {
        $unwind: "$day"
      },
      {
        $group: { _id: "$day", value: { $sum: 1 } }
      },
      { $sort: { _id: 1 } }
    ]);
    heatmapData.map(day => {
      day.day = day._id;
      delete day._id;
    });
    const callVolumeByUnitData = await AnnualReport.aggregate([
      { $match: {} },
      { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
      {
        $unwind: "$unit"
      },
      {
        $group: { _id: "$unit", callVolume: { $sum: 1 } }
      },
      { $match: { callVolume: { $gt: 200 } } },
      { $sort: { _id: 1 } }
    ]);
    const requestedByData = await AnnualReport.aggregate([
      { $match: {} },
      {
        $group: {
          _id: "$incident_id",
          requested_by: { $addToSet: "$requested_by" }
        }
      },
      {
        $unwind: "$requested_by"
      },
      {
        $group: { _id: "$requested_by", value: { $sum: 1 } }
      }
    ]);
    requestedByData.map(item => {
      item.id = item._id;
      item.label = item._id;
      delete item._id;
    });
    const radarData = await AnnualReport.aggregate([
      { $match: { als_bls: "Advanced Life Support" } },
      { $group: { _id: "$incident_id", als_bls: { $addToSet: "$als_bls" } } },
      {
        $unwind: "$als_bls"
      },
      {
        $group: { _id: "$als_bls", value: { $sum: 1 } }
      }
    ]);
    radarData.map(item => {
      item.id = item._id;
      item.label = item._id;
      delete item._id;
    });
    contents.heatmapData = heatmapData;
    contents.callVolumeByUnitData = callVolumeByUnitData;
    contents.requestedByData = requestedByData;
    contents.radarData = radarData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /reports/clinician-report/:pNumber
// @desc    Post annual reports data for generating the heatmap the report parameter is the year of the report ie annual_report_2019
// @access  Public
router.post("/clinician-reports", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const p_number = user.p_number;
  console.log(p_number);
  const contents = {};
  try {
    const heatmapData = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
      { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
      {
        $unwind: "$day"
      },
      {
        $group: { _id: "$day", value: { $sum: 1 } }
      },
      { $sort: { _id: 1 } }
    ]);
    heatmapData.map(day => {
      day.day = day._id;
      delete day._id;
    });
    contents.heatmapData = heatmapData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
// @route   POST /reports
// @desc    Post reports data
// @access  Public
router.post("/", (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
