const express = require("express");
const router = express.Router();

const {getLeave,
      createLeave,
      getLeaveById,
      getLeaveStatusByEmpId}= require("../controller/leaveController");

router.route("/").get(getLeave);
router.route("/").post(createLeave);
router.route("/:id").get(getLeaveById);
router.route("/leaveStatus/:id").get(getLeaveStatusByEmpId);
 

module.exports=router;