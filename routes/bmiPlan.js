const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    createBmiPlan,
    bmiPlanList,
    getOnePlan,
    editPlanDetail

} = require("../controller/bmiPlan");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
      file.mimetype.includes("pdf")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });
  
  let multipleUpload = uploads.fields([
    { name: "upload_pdf", maxCount: 1 },
  
  ]);

router.post("/user/createBmiPlan",multipleUpload, createBmiPlan);
router.post("/admin/editPlanDetail/:id",multipleUpload, editPlanDetail);

router.get("/user/bmiPlanList", bmiPlanList);
router.get("/admin/getOnePlan/:id", getOnePlan);


module.exports = router;
