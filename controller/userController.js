 
const dbpool= require("../config/db");
 
const getUsers=(req,res)=>{
    let sql="select * from branch_config";
    dbpool.query(sql,(err,result)=>{
        if(err)
            console.log(err);        
        else
            res.status(200).json(result); 
            console.log("aaaaaaaaaaaaaaaaaa="+empId);            
    });   
}
const createUsers=(req,res)=>{
    res.status(201).json("get all users");
}
const getUserById=(req,res)=>{
    let sq=" select * from employee where emp_id=?";
  
    let empId=req.params.id;
    dbpool.query(sq,empId,(err,result)=>{
     if(err){
        console.log(err);
     }
  
    });
    console.log("bbbbbbbbbbbbbbbbbb="+empId);
}

module.exports={getUsers,createUsers,getUserById};