const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        
        email: {
            type: String,
        },
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
        dob:{
            type:"String" 
        }
  
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", thisSchema);
