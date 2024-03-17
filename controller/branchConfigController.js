 
const dbpool= require("../config/db");
 
const getBranchConfig=(req,res)=>{
    var holiData=[];
    let sql="select * from branch_config";
    dbpool.query(sql,(err,result)=>{
        if(err)
            console.log(err);        
        else
        res.json(result);              
    });   
}

 

const createBranchConfig=(req,res)=>{
    var branch=req.body;
    var branchData=[branch.brnAddressName,branch.branchCode,branch.branchLocation,
        branch.branchName,branch.year,"",null,branch.district,branch.upozila];
    let sql="INSERT INTO branch_config (brn_address_name, branch_code, branch_location, branch_name, city,created_by,created_on,district,upozila)VALUES(?)";
    dbpool.query(sql,[branchData],(err,result)=>{
        if(err)
            console.log(err);        
        else
            res.status(200).json(result); 
})
}

module.exports={getBranchConfig,createBranchConfig};