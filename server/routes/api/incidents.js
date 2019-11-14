const express = require("express");
const router = express.Router();
const { check, validationResults } = require("express-validator");
const auth = require("../../middleware/auth");

const AnnualReport = require("../../models/AnnualReport");

// @route   GET /reports/test
// @desc    Tests reports route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

router.post("/heatmap_all", async (req, res) => {
  const contents = {};
  try {
    const heatmapData_all = await AnnualReport.aggregate([
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
    heatmapData_all.map(day => {
      day.day = day._id;
      delete day._id;
    });
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
    contents.heatmapData_all = heatmapData_all;
    contents.requestedByData = requestedByData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    debugger;
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/callVolumeByUnit_all", async (req, res) => {
  const contents = {};
  try {
    const callVolumeByUnitData_all = await AnnualReport.aggregate([
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
    contents.callVolumeByUnitData_all = callVolumeByUnitData_all;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    debugger;
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
