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
            type: Number
        },//dropdown
        plan_deductible: {
            type: Number
        },
        coverageAmt: {
            type: Number
        },//input
        fromDate: {
            type: "String"
        },
        toDate: {
            type: "String"
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
        dob: {
            type: String
        },
        filterdata: {
            type: String // TRAVELASSIST,FIXED,NETWORK,BASIC,PRE-EX
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("bmiPlan", thisSchema);