const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    createBmiPlan,
    bmilanList,
    getOnePlan

} = require("../controller/bmiPlan");

router.post("/user/createBmiPlan", createBmiPlan);
router.get("/user/bmilanList", bmilanList);
router.get("/user/getOnePlan/:id", getOnePlan);


module.exports = router;
