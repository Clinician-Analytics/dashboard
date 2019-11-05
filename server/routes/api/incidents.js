const express = require("express");
const router = express.Router();
const { check, validationResults } = require("express-validator");
const auth = require("../../middleware/auth");

const SystemData = require("../../models/SystemData");
const AnnualReport = require("../../models/AnnualReport");

// @route   GET /incidents/test
// @desc    Tests incidents route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Route Works" }));

// @route   POST /incidents
// @desc    Post incidents data
// @access  Public
router.post("/stats", async (req, res) => {
  const contents = {};
  try {
    // const radarData = await AnnualReport.aggregate([
    //   {
    //     $match: { als_bls: { $exists: true, $ne: "" } }
    //   },
    //   {
    //     $match: { shift: { $exists: true, $ne: "" } }
    //   },
    //   {
    //     $group: {
    //       _id: { shift: "$shift", als_bls: "$als_bls" },
    //       uniqueCount: { $addToSet: "$incident_id" }
    //     }
    //   }
    //     {
    //       $project: {
    //         shift: 1,
    //         uniqueIncidentCount: { $size: "$uniqueCount" }
    //       }
    //     }
    // ]);
    const calendarStats18 = await AnnualReport.aggregate([
      { $match: { year: "2018" } },
      { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
      {
        $unwind: "$day"
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: 1,
          avg_daily: { $avg: "$count" },
          min_daily: { $min: "$count" },
          max_daily: { $max: "$count" },
          stdDev: { $stdDevPop: "$count" }
        }
      }
    ]);
    const calendarStats19 = await AnnualReport.aggregate([
      { $match: { year: "2019" } },
      { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
      {
        $unwind: "$day"
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: 1,
          avg_daily: { $avg: "$count" },
          min_daily: { $min: "$count" },
          max_daily: { $max: "$count" },
          stdDev: { $stdDevPop: "$count" }
        }
      }
    ]);
    const unit_rankGraph18 = await AnnualReport.aggregate([
      { $match: { year: "2018" } },
      {
        $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } }
      },
      {
        $unwind: "$unit"
      },
      {
        $group: { _id: "$unit", date: "$heatmapdate", callVolume: { $sum: 1 } }
      },
      { $match: { callVolume: { $gt: 200 } } },
      { $sort: { _id: 1 } }
    ]);
    contents.unit_rankGraph18 = unit_rankGraph18;
    contents.calendarStats18 = calendarStats18;
    contents.calendarStats19 = calendarStats19;
    // contents.radarData = radarData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /incidents/clinician-report/:pNumber
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
    const calendarStats18 = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
      { $match: { year: "2018" } },
      { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
      {
        $unwind: "$day"
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: 1,
          avg_daily: { $avg: "$count" },
          min_daily: { $min: "$count" },
          max_daily: { $max: "$count" },
          stdDev: { $stdDevPop: "$count" }
        }
      }
    ]);
    const calendarStats19 = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
      { $match: { year: "2019" } },
      { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
      {
        $unwind: "$day"
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: 1,
          avg_daily: { $avg: "$count" },
          min_daily: { $min: "$count" },
          max_daily: { $max: "$count" },
          stdDev: { $stdDevPop: "$count" }
        }
      }
    ]);
    contents.calendarStats18 = calendarStats18;
    contents.calendarStats19 = calendarStats19;
    contents.heatmapData = heatmapData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
