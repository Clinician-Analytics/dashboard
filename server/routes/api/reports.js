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
    // const heatmapData_2018 = await AnnualReport.aggregate([
    //   { $match: { year: "2018" } },
    //   { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
    //   {
    //     $unwind: "$day"
    //   },
    //   {
    //     $group: { _id: "$day", value: { $sum: 1 } }
    //   },
    //   { $sort: { _id: 1 } }
    // ]);
    // heatmapData_2018.map(day => {
    //   day.day = day._id;
    //   delete day._id;
    // });
    // const heatmapData_2019 = await AnnualReport.aggregate([
    //   { $match: { year: "2019" } },
    //   { $group: { _id: "$incident_id", day: { $addToSet: "$heatmap_date" } } },
    //   {
    //     $unwind: "$day"
    //   },
    //   {
    //     $group: { _id: "$day", value: { $sum: 1 } }
    //   },
    //   { $sort: { _id: 1 } }
    // ]);
    // heatmapData_2019.map(day => {
    //   day.day = day._id;
    //   delete day._id;
    // });
    // const callVolumeByUnitData_all = await AnnualReport.aggregate([
    //   { $match: {} },
    //   { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
    //   {
    //     $unwind: "$unit"
    //   },
    //   {
    //     $group: { _id: "$unit", callVolume: { $sum: 1 } }
    //   },
    //   { $match: { callVolume: { $gt: 200 } } },
    //   { $sort: { _id: 1 } }
    // ]);
    // const callVolumeByUnitData_2018 = await AnnualReport.aggregate([
    //   { $match: { year : "2018" } },
    //   { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
    //   {
    //     $unwind: "$unit"
    //   },
    //   {
    //     $group: { _id: "$unit", callVolume: { $sum: 1 } }
    //   },
    //   { $match: { callVolume: { $gt: 200 } } },
    //   { $sort: { _id: 1 } }
    // ]);
    // const callVolumeByUnitData_2019 = await AnnualReport.aggregate([
    //   { $match: { year : "2019" } },
    //   { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
    //   {
    //     $unwind: "$unit"
    //   },
    //   {
    //     $group: { _id: "$unit", callVolume: { $sum: 1 } }
    //   },
    //   { $match: { callVolume: { $gt: 200 } } },
    //   { $sort: { _id: 1 } }
    // ]);
    // const requestedByData = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       requested_by: { $addToSet: "$requested_by" }
    //     }
    //   },
    //   {
    //     $unwind: "$requested_by"
    //   },
    //   {
    //     $group: { _id: "$requested_by", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition_all = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition_2018 = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition_2019 = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const prim_impress_all = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       prim_impress: { $addToSet: "$prim_impress" }
    //     }
    //   },
    //   {
    //     $unwind: "$prim_impress"
    //   },
    //   {
    //     $group: { _id: "$prim_impress", value: { $sum: 1 } }
    //   }
    // ]);
    // const prim_impress_2018 = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       prim_impress: { $addToSet: "$prim_impress" }
    //     }
    //   },
    //   {
    //     $unwind: "$prim_impress"
    //   },
    //   {
    //     $group: { _id: "$prim_impress", value: { $sum: 1 } }
    //   }
    // ]);
    // const prim_impress_2019 = await AnnualReport.aggregate([
    //   { $match: {} },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       prim_impress: { $addToSet: "$prim_impress" }
    //     }
    //   },
    //   {
    //     $unwind: "$prim_impress"
    //   },
    //   {
    //     $group: { _id: "$prim_impress", value: { $sum: 1 } }
    //   }
    // ]);
    contents.heatmapData_all = heatmapData_all;
    // contents.heatmapData_2018 = heatmapData_2018;
    // contents.heatmapData_2019 = heatmapData_2019;
    // contents.callVolumeByUnitData_all = callVolumeByUnitData_all;
    // contents.callVolumeByUnitData_2018 = callVolumeByUnitData_2018;
    // contents.callVolumeByUnitData_2019 = callVolumeByUnitData_2019;
    // contents.requestedByData = requestedByData;
    // contents.disposition_all = disposition_all;
    // contents.disposition_2018 = disposition_2018;
    // contents.disposition_2019 = disposition_2019;
    // contents.prim_impress_all = prim_impress_all;
    // contents.prim_impress_2018 = prim_impress_2018;
    // contents.prim_impress_2019 = prim_impress_2019;
    console.log(contents);
    res.send(contents);
  } catch (err) {
    debugger;
    console.error(err);
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
    const callVolumeByUnitData_all = await AnnualReport.aggregate([
      { $match: { clinician_id: p_number } },
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
    // const callVolumeByUnitData_2018 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number, year: "2018" } },
    //   { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
    //   {
    //     $unwind: "$unit"
    //   },
    //   {
    //     $group: { _id: "$unit", callVolume: { $sum: 1 } }
    //   },
    //   { $match: { callVolume: { $gt: 200 } } },
    //   { $sort: { _id: 1 } }
    // ]);
    // const callVolumeByUnitData_2019 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number, year: "2019" } },
    //   { $group: { _id: "$incident_id", unit: { $addToSet: "$unit" } } },
    //   {
    //     $unwind: "$unit"
    //   },
    //   {
    //     $group: { _id: "$unit", callVolume: { $sum: 1 } }
    //   },
    //   { $match: { callVolume: { $gt: 200 } } },
    //   { $sort: { _id: 1 } }
    // ]);
    // const requestedByData = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       requested_by: { $addToSet: "$requested_by" }
    //     }
    //   },
    //   {
    //     $unwind: "$requested_by"
    //   },
    //   {
    //     $group: { _id: "$requested_by", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition_all = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition_2018 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number, year: "2018" } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const disposition_2019 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number, year: "2019" } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       disposition: { $addToSet: "$disposition" }
    //     }
    //   },
    //   {
    //     $unwind: "$disposition"
    //   },
    //   {
    //     $group: { _id: "$disposition", value: { $sum: 1 } }
    //   }
    // ]);
    // //disposition with level of care
    // const prim_impress_all = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       prim_impress: { $addToSet: "$prim_impress" }
    //     }
    //   },
    //   {
    //     $unwind: "$prim_impress"
    //   },
    //   {
    //     $group: { _id: "$prim_impress", value: { $sum: 1 } }
    //   }
    // ]);
    // const prim_impress_2018 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number, year: "2018" } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       prim_impress: { $addToSet: "$prim_impress" }
    //     }
    //   },
    //   {
    //     $unwind: "$prim_impress"
    //   },
    //   {
    //     $group: { _id: "$prim_impress", value: { $sum: 1 } }
    //   }
    // ]);
    // const prim_impress_2019 = await AnnualReport.aggregate([
    //   { $match: { clinician_id: p_number, year: "2019" } },
    //   {
    //     $group: {
    //       _id: "$incident_id",
    //       prim_impress: { $addToSet: "$prim_impress" }
    //     }
    //   },
    //   {
    //     $unwind: "$prim_impress"
    //   },
    //   {
    //     $group: { _id: "$prim_impress", value: { $sum: 1 } }
    //   }
    // ]);
    contents.heatmapData_all = heatmapData_all;
    contents.callVolumeByUnitData_all = callVolumeByUnitData_all;
    // contents.callVolumeByUnitData_2018 = callVolumeByUnitData_2018;
    // contents.callVolumeByUnitData_2019 = callVolumeByUnitData_2019;
    // contents.requestedByData = requestedByData;
    // contents.disposition_all = disposition_all;
    // contents.disposition_2018 = disposition_2018;
    // contents.disposition_2019 = disposition_2019;
    // contents.prim_impress_all = prim_impress_all;
    // contents.prim_impress_2018 = prim_impress_2018;
    // contents.prim_impress_2019 = prim_impress_2019;
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
