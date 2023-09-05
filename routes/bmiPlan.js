const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    createBmiPlan,
    bmiPlanList,
    getOnePlan

} = require("../controller/bmiPlan");

router.post("/user/createBmiPlan", createBmiPlan);
router.get("/user/bmiPlanList", bmiPlanList);
router.get("/user/getOnePlan/:id", getOnePlan);


module.exports = router;
