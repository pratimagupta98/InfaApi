const BmiPlan = require("../models/bmiPlan");


exports.createBmiPlan = async (req, res) => {
    try {
        const { planname, short_desc, title, long_desc, highlight_desc, upload_pdf, plan_max, plan_deductible, coverageAmt, start_date, end_date, total, email, coverage_area, dob } = req.body;

        const folderObj = new BmiPlan({
            planname,
            short_desc,
            title,
            long_desc,
            highlight_desc,
            upload_pdf,
            plan_max,
            plan_deductible,
            coverageAmt,
            start_date,
            end_date,
            total,
            email,
            coverage_area,
            dob
        });

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



exports.bmilanList = async (req, res) => {
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

