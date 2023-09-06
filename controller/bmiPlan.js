const BmiPlan = require("../models/bmiPlan");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.createBmiPlan = async (req, res) => {
    try {
        const { planname, short_desc, title, long_desc, highlight_desc, upload_pdf, plan_max, plan_deductible, coverageAmt, start_date, end_date, total, email, coverage_area, dob } = req.body;

        const folderObj = new BmiPlan({
            planname:planname,
            short_desc:short_desc,
            title:title,
            long_desc:long_desc,
            highlight_desc:highlight_desc,
            upload_pdf,
            plan_max:plan_max,
            plan_deductible:plan_deductible,
            coverageAmt:coverageAmt,
            start_date:start_date,
            end_date:end_date,
            total:total,
            email:email,
            coverage_area:coverage_area,
            dob:dob
        });


        if (req.files) {
            if (req.files.upload_pdf[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.upload_pdf.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.upload_pdf[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.upload_pdf[i].path);
                alluploads.push(resp.secure_url);
              }
              folderObj.upload_pdf = alluploads;
            }
          }
         // folderObj.save()
        await folderObj.save();

        res.status(201).json({
            msg: "Bmi Plan created successfully",
            success: true,
        });
    } catch (error) {
        // Handle other errors
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message,
            success: false,
        });
    }
}

exports.bmiPlanList = async (req, res) => {
    await BmiPlan.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
}

exports.getOnePlan = async (req, res, next) => {
    const Plan = await BmiPlan.findById(req.params.id);
    // VideoModel.findOne({ _id: req.params.id })

    if (!Plan) {
        return next(new AppError("No tour found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            Plan,
        },
    });
}







