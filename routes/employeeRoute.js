const express = require("express");
const router = express.Router();

const {getEmployee,
      createEmployee,
      getEmployeeById,
      updateEmployee}= require("../controller/employeeController");

router.route("/").get(getEmployee);
router.route("/").post(createEmployee);
router.route("/:id").get(getEmployeeById);
router.route("/modifyEmp").post(updateEmployee);

module.exports=router;