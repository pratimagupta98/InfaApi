const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    agentRegistration,
     agentList,
     getOneAgent,
     editAgentProfile,
     delAgent

} = require("../controller/agent");


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
    { name: "image", maxCount: 1 },
  
  ]);

router.post("/admin/agentRegistration",multipleUpload, agentRegistration);
router.post("/admin/editAgentProfile/:id",multipleUpload, editAgentProfile);

router.get("/admin/agentList", agentList);
router.get("/admin/getOneAgent/:id", getOneAgent);
router.delete("/admin/delAgent/:id", delAgent);



module.exports = router;
