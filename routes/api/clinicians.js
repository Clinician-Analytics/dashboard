const express = require("express");
const router = express.Router();
const { check, validationResults } = require("express-validator");
const auth = require("../../middleware/auth");

const AnnualReport = require("../../models/AnnualReport");
const User = require("../../models/User");

router.post("/report", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const p_number = user.p_number;
  console.log(p_number);
  const contents = {};
  try {
    const heatmapData_all = await AnnualReport.aggregate([
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
    heatmapData_all.map(day => {
      day.day = day._id;
      delete day._id;
    });
    const callVolumeByUnitData_19 = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
      { $match: { year: "2019" } },
      { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
      {
        $unwind: "$unit"
      },
      {
        $group: { _id: "$unit", callVolume: { $sum: 1 } }
      },
      { $sort: { callVolume: 1 } }
    ]);
    const support_signs = await AnnualReport.aggregate([
      {
        $match: { support_sign: { $exists: true, $ne: "" } }
      },
      { $match: { clinician_id: p_number } },
      { $match: { year: "2019" } },
      {
        $group: {
          _id: "$incident_id",
          support_sign: { $addToSet: "$support_sign" },
          als_bls: { $addToSet: "$als_bls" }
        }
      },
      {
        $group: {
          _id: "$support_sign",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    // const requested_by = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       requested_by: { $addToSet: "$requested_by" }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$requested_by",
    //       count: { $sum: 1 }
    //     }
    //   },
    //   { $sort: { count: -1 } }
    // ]);
    contents.heatmapData_all = heatmapData_all;
    contents.callVolumeByUnitData_19 = callVolumeByUnitData_19;
    contents.support_signs = support_signs;
    // contents.requested_by = requested_by;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/admin", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  let p_number;
  if (user) {
    p_number = user.p_number;
  } else {
    p_number = req.body.pNumber;
  }
  console.log(p_number);
  const contents = {};
  try {
    const heatmapData_all = await AnnualReport.aggregate([
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
    heatmapData_all.map(day => {
      day.day = day._id;
      delete day._id;
    });
    const callVolumeByUnitData_19 = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
      { $match: { year: "2019" } },
      { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
      {
        $unwind: "$unit"
      },
      {
        $group: { _id: "$unit", callVolume: { $sum: 1 } }
      },
      { $sort: { callVolume: 1 } }
    ]);
    const support_signs = await AnnualReport.aggregate([
      {
        $match: { support_sign: { $exists: true, $ne: "" } }
      },
      { $match: { clinician_id: p_number } },
      { $match: { year: "2019" } },
      {
        $group: {
          _id: "$incident_id",
          support_sign: { $addToSet: "$support_sign" },
          als_bls: { $addToSet: "$als_bls" }
        }
      },
      {
        $group: {
          _id: "$support_sign",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    contents.heatmapData_all = heatmapData_all;
    contents.callVolumeByUnitData_19 = callVolumeByUnitData_19;
    contents.support_signs = support_signs;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/stats", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const p_number = user.p_number;
  console.log(p_number);
  const contents = {};
  try {
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
          count: { $sum: 1 },
          avg_daily: { $avg: "$count" },
          min_daily: { $min: "$count" },
          max_daily: { $max: "$count" },
          stdDev: { $stdDevPop: "$count" }
        }
      }
    ]);
    // const calendarStats19 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number } },
    //   { $match: { year: "2019" } },
    //   { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
    //   {
    //     $unwind: "$day"
    //   },
    //   {
    //     $group: {
    //       _id: "$day",
    //       count: { $sum: 1 }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: 1,
    //       count: { $sum: 1 },
    //       avg_daily: { $avg: "$count" },
    //       min_daily: { $min: "$count" },
    //       max_daily: { $max: "$count" },
    //       stdDev: { $stdDevPop: "$count" }
    //     }
    //   }
    // ]);
    contents.calendarStats18 = calendarStats18;
    // contents.calendarStats19 = calendarStats19;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/disposition", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const p_number = user.p_number;
  console.log(p_number);
  const contents = {};
  try {
    const radarData = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
      {
        $match: { als_bls: { $exists: true, $ne: "" } }
      },
      {
        $match: { shift: { $exists: true, $ne: "" } }
      },
      {
        $group: {
          _id: { shift: "$shift", als_bls: "$als_bls" },
          uniqueCount: { $addToSet: "$incident_id" }
        }
      },
      {
        $project: {
          shift: 1,
          uniqueIncidentCount: { $size: "$uniqueCount" }
        }
      }
    ]);
    contents.radarData = radarData;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
