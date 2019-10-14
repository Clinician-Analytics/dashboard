const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnnualReportSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    clinician_id: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    role_status: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    callreceive_time: {
        type: String,
    },
    dispatch_time: {
        type: String
    },
    enroute_time: {
        type: String
    },
    onscene_time: {
        type: String
    },
    patientcontact_time: {
        type: String
    },
    departscene_time: {
        type: String
    },
    atdestination_time: {
        type: String
    },
    closed_time: {
        type: String
    },
    lock_date: {
        type: String
    },
    disposition: {
        type: String
    },
    cc_anatomic: {
        type: String
    },
    cc_organ: {
        type: String
    },
    prim_impress: {
        type: String
    },
    support_prim: {
        type: String
    },
    support_sign: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = AnnualReport = mongoose.model("annualReport", AnnualReportSchema);
