const express = require("express");
const router = express.Router();

const {getEmployee,
      createEmployee,
      getEmployeeById,
      updateEmployee,
      getEmployeeByloginId}= require("../controller/employeeController");

router.route("/").get(getEmployee);
router.route("/").post(createEmployee);
router.route("/:id").get(getEmployeeById);
router.route("/empDetail/:id").get(getEmployeeByloginId);
router.route("/modifyEmp").post(updateEmployee);

module.exports=router;