const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addInfPlan,
    infPlanList,
    getOnePlan,
    edit_infPlan,
    dlt_infPlan

} = require("../controller/infPlan");

router.post("/user/addInfPlan", addInfPlan);
router.get("/user/infPlanList", infPlanList);
router.get("/user/getOnePlan/:id", getOnePlan);
router.post("/admin/edit_infPlan/:id", edit_infPlan);
router.delete("/admin/dlt_infPlan/:id", dlt_infPlan);




module.exports = router;
