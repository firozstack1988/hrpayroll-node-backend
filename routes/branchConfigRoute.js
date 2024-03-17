const express=require("express");
const router=express.Router();
const {getBranchConfig,
      createBranchConfig
       }=require("../controller/branchConfigController");

router.route("/").get(getBranchConfig); 
router.route("/").post(createBranchConfig); 
 

module.exports = router;