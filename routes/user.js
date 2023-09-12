const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
 
  authentication,
  quote,
  auth,
  quoteAll,
  adminPlan
 
} = require("../controller/user");
 
router.post("/user/authentication",authentication );
router.post("/user/quote",quote );
router.post("/user/QuoteAll",quoteAll );

router.post("/user/auth",auth );
router.post("/user/adminPlan",adminPlan );


module.exports = router;
