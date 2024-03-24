const express = require("express");
const router = express.Router();

const {getAllowance,
      createAllowance,
      getAllowanceById}= require("../controller/allowanceController");

router.route("/").get(getAllowance);
router.route("/").post(createAllowance);
router.route("/:id").get(getAllowanceById);

module.exports=router;