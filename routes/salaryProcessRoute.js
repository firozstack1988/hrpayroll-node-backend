const express = require("express");
const router = express.Router();

const {createSalary,getMonthlySalary}= require("../controller/salaryProcessController");

router.route("/").post(createSalary);
router.route("/:year/:month").get(getMonthlySalary);

module.exports=router;