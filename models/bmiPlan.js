const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        planname: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "infPlan"
        },
        short_desc: {
            type: String
        },
        title: {
            type: String
        },
        long_desc: {
            type: String
        },
        highlight_desc: {
            type: String
        },
        upload_pdf: {
            type: Array
        },
        plan_max: {
            type: String
        },//dropdown
        plan_deductible: {
            type: Number
        },
        coverageAmt: {
            type: Number
        },//input
        start_date: {
            type: String
        },
        end_date: {
            type: String
        },
        total: {
            type: Number
        },
        email: {
            type: String
        },
        coverage_area: {
            type: String
        },
        dob:{
            type: String
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("bmiPlan", thisSchema);