const express=require("express");
const router=express.Router();
const {getUsers,
      createUsers,
      getUserById}=require("../controller/userController");

router.route("/").get(getUsers); 
router.route("/").post(createUsers); 
router.route("/:id").get(getUserById); 

module.exports = router;