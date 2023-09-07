const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {

        agentName: {
            type: String,
        },
        agentCode: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zipcode: {
            type: String,
        },
        phone: {
            type: String,
        },
        image: {
            type: Array
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("agent", thisSchema);
