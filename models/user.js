const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        
        email: {
            type: String,
        },
        area:{
            type:String
        },
        maximum:{
            type:String
        },
        email:{
            type:String
        },
        referenceId:{
            type:String
        },
        fromDate:{
            type:String
        },
        toDate:{
            type:String 
        },
        dob:{
            type:String
        },
        trip_startdate:{
            type:String
        },
        trip_enddate:{
            type:String
        },
        departure:{
            type:String
        },
        destination:{
            type:String
        },
        additional_avg_cov:{
            type:String
        },
        visitor_first_name:{
            type:String
        },
        visitor_last_name:{
            type:String
        },
        visitor_dob:{
            type:String
        },
        gender:{
            type:String
        },
        passport_no:{
            type:Number
        },
        contactNo:{
            type:Number
        },
        emergency_contact_name:{
            type:String  
        },
        emergency_contact_phone:{
            type:Number  
        },
        emergency_contact_email:{
            type:String  
        },
        paymentAddress:{
            type:String  
        },
        city:{
            type:String  
        },
        state:{
            type:String  
        },
        postal_code:{
            type:Number  
        },
        order_total:{
            type:Number
        },
        reference:{
            type:Number
        },
        plan:{
            type:String
        },
        payment_method:{
            type:String
        },
        card_holder_name:{
            type:String
        },
        payment_email:{
            type:String
        },
        card_number:{
            type:String
        },
        card_expiry_date:{
            type:String
        },
        card_cvv:{
            type:String
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", thisSchema);
