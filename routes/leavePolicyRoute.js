const express=require("express");
const router=express.Router();
const {getLeavePolicy,
      createLeavePolicy,
      getLeavePolicyById,
      updateLeavePolicy
       }=require("../controller/leavePolicyController");

router.route("/").get(getLeavePolicy); 
router.route("/").post(createLeavePolicy); 
router.route("/:id").get(getLeavePolicyById); 
router.route("/modifyLeavePolicy").post(updateLeavePolicy); 

module.exports = router;