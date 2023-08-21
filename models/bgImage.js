const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
      
        img: {
            type: Array,
        },
       

    },
    { timestamps: true }
);

module.exports = mongoose.model("bgimage", thisSchema);
