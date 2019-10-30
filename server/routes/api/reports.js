const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const AnnualReport = require("../../models/AnnualReport");

// @route   GET /reports/test
// @desc    Tests reports route
// @access  Public
router.get("/test", auth, (req, res) => res.json({ msg: "Reports Works" }));

// @route   POST /reports/annual-report
// @desc    Post annual reports data for generating the heatmap the report parameter is the year of the report ie annual_report_2019
// @access  Public
router.post("/annual-reports", auth, async (req, res) => {
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
    contents.heatmapData = heatmapData;
    contents.callVolumeByUnitData = callVolumeByUnitData;
    contents.requestedByData = requestedByData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /reports/clinician-report/:pNumber
// @desc    Post annual reports data for generating the heatmap the report parameter is the year of the report ie annual_report_2019
// @access  Private
router.post("/clinician-reports/:pNumber", auth, async (req, res) => {
  const pNumber = req.params.pNumber;
  const contents = {};
  try {
    const heatmapData = await AnnualReport.aggregate([
      { $match: { id: pNumber } },
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

// Bring in user model
const User = require("../../models/User");
// @route   GET /reports/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await AnnualReport.findOne({ user: req.user.id }).populate(
      "user",
      ["lastName", "p_number"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /reports/clinician/me
// @desc    Post clinician data based on p_number from user model
// @access  Private
// router.get("/user/:p_number", async (req, res) => {
//   const contents = {};
//   try {
//     // pull in p-number from user profile
//     const pNumber = await User.findOne({ user: req.params.p_number });
//     if (!pNumber) return res.status(400).json({ msg: "P Number not found" });
//     res.json(pNumber);
//     // aggregate heatmap data
//     const heatmapData = await AnnualReport.aggregate([
//       { $match: { id: pNumber } },
//       { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
//       {
//         $unwind: "$day"
//       },
//       {
//         $group: { _id: "$day", value: { $sum: 1 } }
//       },
//       { $sort: { _id: 1 } }
//     ]);
//     heatmapData.map(day => {
//       day.day = day._id;
//       delete day._id;
//     });
//     contents.heatmapData = heatmapData;
//     console.log(contents);
//     res.send(contents);
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

// @route   POST /reports/clinician/me
// @desc    Post clinician data based on p_number from user model
// @access  Private

router.post("/clinician-test/:pNumber", auth, async (req, res) => {
  const pNumber = req.body.p_number;
  const contents = {};
  try {
    const heatmapData = await AnnualReport.aggregate([
      { $match: { id: pNumber } },
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
    console.log(pNumber);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
