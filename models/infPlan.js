const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        planName: {
            type: String
        },
        desc: {
            type: String


        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("infPlan", thisSchema);