const express = require("express");
const router = express.Router();

const {getLeave,
      createLeave,
      getLeaveById,
      updateLeave}= require("../controller/leaveController");

router.route("/").get(getLeave);
router.route("/").post(createLeave);
router.route("/:id").get(getLeaveById);
 

module.exports=router;