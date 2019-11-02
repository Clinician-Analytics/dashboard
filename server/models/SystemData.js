const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SystemSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  incident_id: {
    type: String,
    required: true
  },
  incident_date_time: {
    type: Date,
    required: true
  },
  incident_date: {
    type: Date,
    required: true
  },
  callreceive_time: {
    type: Date,
    required: true
  },
  dispatched_time: {
    type: Date,
    required: true
  },
  enroute_time: {
    type: Date,
    required: true
  },
  onscene_time: {
    type: Date,
    required: true
  },
  departscene_time: {
    type: Date,
    required: true
  },
  at_destination_time: {
    type: Date,
    required: true
  },
  incident_close_time: {
    type: Date,
    required: true
  },
  location_type: {
    type: String,
    required: true
  },
  requested_by: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  emd_complaint: {
    type: String,
    required: true
  },
  primary_impress: {
    type: String,
    required: true
  },
  support_primary: {
    type: String,
    required: true
  },
  support_sign: {
    type: String,
    required: true
  },
  cc_anatomic: {
    type: String,
    required: true
  },
  cc_organsystem: {
    type: String,
    required: true
  },
  als_bls: {
    type: String,
    required: true
  }
});

module.exports = SystemData = mongoose.model("system_data", SystemSchema);
