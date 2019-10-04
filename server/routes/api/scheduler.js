const express = require("express");
const router = express.Router();
const request = require("request");
const path = require("path");
const fs = require("fs");

// @route   GET /scheduler/test
// @desc    Tests scheduler route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Scheduler Works" }));

// @route   POST scheduler
// @desc    Scheduler route
// @access  Public
router.post("/", (req, res) => {
  // TODO implement json web tokens
  const uid = req.body.uid.replace(/@/g, "..");
  const guid = req.body.guid;
  const fid = `${uid}/${guid}/`;

  // Parameters from the front-end form
  // const model = "MT_iMM1415";
  // const thresh = "local";
  // const percval = "percentile";
  // const type = "minmaxmean";
  // const low = 25;
  // const high = 75;

  const model = req.body.model;
  const thresh = req.body.thresh;
  const percval = req.body.percval;
  const type = req.body.type;
  const low = req.body.low;
  const high = req.body.high;

  const options = {
    method: "POST",
    url: "http://cellfie2.renci.org:8080/tx-queue/2/scheduler/job",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    },
    body: {
      image: "krobasky/cellfiemodels:nooptV1",
      //<cmd> -d <data-file.csv> -r <ref-model> [--local-thresh|--global-thresh] [--percent|--value] -t <type> --low <low> --high <high>
      command: `/bin/bash -c './execCellfie.sh -d /CellFie/tmp/in.csv -r ${model} ${thresh} ${percval} -t ${type} --low ${low} --high ${high} '> /CellFie/tmp/output.tsv 2> /CellFie/tmp/err.tsv`,
      mounts: [
        {
          source: `/var/sysbio/cellfie/local/data/${fid}`,
          // source: `/var/sysbio/cellfie/local/golden/ marray_tensor.AveExpr.csv`,
          target: "/CellFie/tmp",
          type: "bind",
          read_only: false
        }
      ]
    },
    json: true
  };
  console.log(options)
  try {
    request(options, (err, res, body) => {
      console.log("inside request()...");
      res.status(200).send(`${res.statusCode}`);
    });
    console.log("requested");
  } catch (err) {
    return res.status(500).send(err);
  }
  console.log("Hit Scheduler Post");
});

module.exports = router;
