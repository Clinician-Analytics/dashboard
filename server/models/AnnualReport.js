const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnnualReportSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    report: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = AnnualReport = mongoose.model("annualReport", AnnualReportSchema);
