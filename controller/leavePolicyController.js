 
const dbpool= require("../config/db");
const moment = require("moment");
const responseData=require("../config/responseModel"); 

const getLeavePolicy=(req,res)=>{
    var holiData=[];
    let sql="select * from leave_policy";
    dbpool.query(sql,(err,result)=>{
        if(err)
            console.log(err);        
        else
        res.json(result);              
    });   
}

 

const createLeavePolicy=(req,res)=>{
    var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
    var d=req.body;
    var data=[d.sickLeave,d.casualLeave,d.earnedLeave,d.year,"",d.createdon,"",null];
    let sql="INSERT INTO leave_policy (sick_leave, casual_leave, earned_leave, year,created_by,created_on,modify_by,modify_on)VALUES(?)";
    dbpool.query(sql,[data],(err,result)=>{
        if(err)
            console.log(err);        
        else
            res.status(200).json(result); 
})
}

const updateLeavePolicy=(req,res)=>{
    try{
        var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
        var data=req.body;
        let sql="UPDATE leave_policy set sick_leave= ?,casual_leave= ?,earned_leave= ?,year= ? where id=?";
          dbpool.query(sql,[data.sickLeave,data.casualLeave,data.earnedLeave,data.year,data.id],(err,result)=>{
             if(err){
                 console.log(err);
                 return res.status(200).send(responseData.UPDATE_FAILURE);  
             }        
             else
                 return res.status(200).send(responseData.UPDATE_SUCCESS); 
          })
    }
    catch(err){
        console.log(err.message);
       return res.status(400).send({
       message:err.message,
       data:err
       });
      } 
}

const getLeavePolicyById=(req,res)=>{
    let sq="select * from leave_policy where id=?";
    dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
     return res.status(200).send(result); 
    });
     
}

module.exports={getLeavePolicy,createLeavePolicy,getLeavePolicyById,updateLeavePolicy};