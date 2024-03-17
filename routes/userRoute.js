const express=require("express");
const router=express.Router();
const {getUsers,
      createUsers,
      getUserById,
      userLogin,
      userLogout,
      userVerify}=require("../controller/userController");

router.route("/").get(getUsers);  
router.route("/").post(createUsers); 
router.route("/:id").get(getUserById);

router.route("/login").post(userLogin);
router.route("/loginVerify").get(userVerify);
router.route("/logout").post(userLogout);

module.exports = router;