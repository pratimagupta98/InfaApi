const InfPlan = require("../models/infPlan");


exports.addInfPlan = async (req, res) => {
    try {
        const { planName, desc } = req.body;
        const findexist = await InfPlan.findOne({ planName: planName })
        if (findexist) {
            res.send({ msg: "Plan alredy exist!", success: false });
        } else {
            const folderObj = new InfPlan({
                planName,
                desc,
            });

            await folderObj.save();

            res.status(201).json({
                msg: "Plan created successfully",
                success: true,
            });
        }
    } catch (error) {
        if (error.code === 11000) {

            res.status(409).json({
                msg: "Plan name already exists!",
                success: false,
            });
        } else {
            // Handle other errors
            res.status(500).json({
                msg: "Internal Server Error",
                error: error.message,
                success: false,
            });
        }
    }

};


exports.infPlanList = async (req, res) => {
    await InfPlan.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
}

exports.getOnePlan = async (req, res, next) => {
    const Plan = await InfPlan.findById(req.params.id);
    // VideoModel.findOne({ _id: req.params.id })

    if (!Plan) {
        return next(new AppError("No plan found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            Plan,
        },
    });
}