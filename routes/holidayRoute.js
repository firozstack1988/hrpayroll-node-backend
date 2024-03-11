const express=require("express");
const router=express.Router();
const {getHoliday,
      createHoliday
       }=require("../controller/holidayController");

router.route("/").get(getHoliday); 
router.route("/").post(createHoliday); 
 

module.exports = router;