const express=require("express");
const router=express.Router();
const {getUsers,
      createUsers,
      getUserById,
      userLogin,
      userLogout,
      userVerify,
      userPassChange}=require("../controller/userController");

  
router.route("/").post(createUsers); 
router.route("/:id").get(getUserById);

router.route("/login").post(userLogin);
router.route("/loginVerify").get(userVerify);
router.route("/logout").post(userLogout);
router.route("/passChange").post(userPassChange);

module.exports = router;