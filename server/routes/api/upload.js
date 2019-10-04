const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const fsExtra = require("fs.extra");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

router.use(fileUpload());

// @route   GET upload/test
// @desc    Tests upload route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Upload Works" }));

// @route   POST /upload
// @desc    Upload route
// @access  Public
router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  if (req.body.uid === "") {
    return res.status(400).json({ msg: "No email provided" });
  }

  const file = req.files.file;
  console.log(file);
  // File ID with User ID and Unique Global ID (uniqid)
  const guid = uniqid();
  // TODO implement json web tokens
  const uid = req.body.uid.replace(/@/g, "..");
  console.log(uid);
  const fid = `${process.cwd()}/data/${uid}/${guid}`;
  console.log(fid)
  fsExtra.mkdirp(`${fid}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    fs.appendFile(`${fid}/in.csv`, file.data, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
  console.log(fid);

  res.json({ fileName: file.name, filePath: fid, guid: guid });
});

// @route   POST upload/job/:guid
// @desc    Find job with guid
// @access  Public
router.post("/job/:guid:", (req, res) => {
  if (req.body.uid === null || req.body.uid === "") {
    return res.status(400).json({ msg: "Provide email to get jobs" });
  }
  const guid = req.params.guid;
  const uid = req.body.uid;
  const fid = `${process.cwd()}/data/${uid}/${guid}`;
  const directoryPath = path.join(
    `${fid}`
  );
  console.log(directoryPath)
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log("Unable to scan directory: " + err);
      return res.status(400).json({ msg: "No files found for that user." });
    }

    files.forEach(file => {
      console.log(file);
    });
    res.json(files);
  });
});

// @route   POST upload/all
// @desc    Find all uploads from a user, uid is passed in req.body.ui.  
//          Searches for files in that user's directory
//          Returns and object with the a path to the in and out cvs 
// @access  Public
router.post("/all", (req, res) => {
  if (req.body.uid === null || req.body.uid === "") {
    return res.status(400).json({ msg: "Provide email to get jobs" });
  }
  const uid = req.body.uid.replace(/@/g, "..");
  const fid = `${process.cwd()}/data/${uid}`;
  const directoryPath = path.join(
    `${fid}`
  );
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log("Unable to scan directory: " + err);
      return res.status(400).json({ msg: "No files found for that user." });
    }
    files.forEach(function (file) {
      console.log(file);
    });
    res.json(files);
  });
});

module.exports = router;
