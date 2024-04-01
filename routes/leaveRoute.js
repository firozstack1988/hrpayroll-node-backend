const express = require("express");
const router = express.Router();

const {getLeave,
      createLeave,
      getLeaveById,
      getLeaveStatusByEmpId,
      getLeaveAprovedByAdmin,
      createStatusUpdate}= require("../controller/leaveController");

router.route("/").get(getLeave);
router.route("/").post(createLeave);
router.route("/:id").get(getLeaveById);
router.route("/leaveStatus/:id").get(getLeaveStatusByEmpId);
router.route("/leaveAproved/:id").get(getLeaveAprovedByAdmin);
router.route("/leaveAprovedData").post(createStatusUpdate);
 

module.exports=router;