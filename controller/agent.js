const Agent = require("../models/agent");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const resp = require("../helpers/apiResponse");

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.agentRegistration = async (req, res) => {
    try {
        const { agentName, agentCode, email, address, city, state, zipcode, phone } = req.body;

        const folderObj = new Agent({
            agentName: agentName,
            agentCode: agentCode,
            email: email,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,

        });


        if (req.files) {
            if (req.files.image[0].path) {
                alluploads = [];
                for (let i = 0; i < req.files.image.length; i++) {
                    const resp = await cloudinary.uploader.upload(
                        req.files.image[i].path,
                        { use_filename: true, unique_filename: false }
                    );
                    fs.unlinkSync(req.files.image[i].path);
                    alluploads.push(resp.secure_url);
                }
                folderObj.image = alluploads;
            }
        }
        // folderObj.save()
        await folderObj.save();

        res.status(201).json({
            msg: "Agent created successfully",
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

exports.agentList = async (req, res) => {
    await Agent.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
}

exports.getOneAgent = async (req, res, next) => {
    const agent = await Agent.findById(req.params.id) 
    // VideoModel.findOne({ _id: req.params.id })

    if (!agent) {
        return next(new AppError("No agent found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            agent,
        },
    });
}

exports.editAgentProfile = async (req, res) => {
    const {   } = req.body

    data = {}
    if (agentName) {
        data.agentName = agentName
    }
    if (agentCode) {
        data.agentCode = agentCode
    }
    if (email) {
        data.email = email
    }
    if (address) {
        data.address = address
    }
    if (city) {
        data.city = city
    }
    if (state) {
        data.state = state
    }
    if (zipcode) {
        data.zipcode = zipcode
    }
    if (phone) {
        data.phone = phone
    }
    
    
    if (req.files) {
        if (req.files.image) {
            alluploads = [];
            for (let i = 0; i < req.files.image.length; i++) {
                // console.log(i);
                const resp = await cloudinary.uploader.upload(req.files.image[i].path, {
                    use_filename: true,
                    unique_filename: false,
                });
                fs.unlinkSync(req.files.image[i].path);
                alluploads.push(resp.secure_url);
            }
            // newStore.storeImg = alluploads;
            data.image = alluploads;
        }
    }
    await Agent.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};




exports.delAgent= async (req, res) => {
    await Agent.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
