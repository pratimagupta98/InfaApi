const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addInfPlan,
    infPlanList,
    getOnePlan

} = require("../controller/infPlan");

router.post("/user/addInfPlan", addInfPlan);
router.get("/user/infPlanList", infPlanList);
router.get("/user/getOnePlan/:id", getOnePlan);


module.exports = router;
