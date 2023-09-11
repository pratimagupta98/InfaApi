const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        adminimg: {
            type: Array,

        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        mobile: {
            type: Number,
        },
        password: {
            type: String,
        },
        cnfmPassword: {
            type: String,
        },
        admincomision: {
            type: Number
        },

        totalEarning: [
            {
                amount: {
                    type: Number,
                    default: 0,
                },
                date: {
                    type: Date,
                    default: new Date(),
                },
            },
        ],
        area:{
            type:"String"
        },
        maximum:{
            type:"String"
        },
        email:{
            type:"String"  
        },
        referenceId:{
            type:"String"  
        },
        fromDate:{
            type:"String" 
        },
        toDate:{
            type:"String" 
        },
        travelers:{
            type:Array 
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("user", thisSchema);
