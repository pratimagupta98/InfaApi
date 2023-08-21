const Bgimg = require("../models/bgImage");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const resp = require("../helpers/apiResponse");
const fs = require("fs");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addBgimg = async (req, res) => {
      if (req.files) {
        if (req.files.img[0].path) {
          alluploads = [];
          for (let i = 0; i < req.files.img.length; i++) {
            const resp = await cloudinary.uploader.upload(
              req.files.img[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.img[i].path);
            alluploads.push(resp.secure_url);
          }
        

          const newBgimg = new Bgimg({
            img: alluploads, // Assuming 'img' is a field in your model
            // Other fields you want to set
          });
     
      newBgimg.save()


    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}
}
}
