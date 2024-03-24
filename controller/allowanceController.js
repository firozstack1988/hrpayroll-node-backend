 
const { json } = require("sequelize");
const dbpool= require("../config/db");
const responseData=require("../config/responseModel"); 
const moment = require("moment");

const createAllowance=(req,res)=>{
   try{
    var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
    var year = new Date().getFullYear();
    var allowance=req.body;
    var allowanceData=[allowance.cityAllowance,allowance.createdby,createdon,allowance.houseRent,allowance.lunch,
    allowance.medical,"",null,allowance.providentFund,allowance.transport,year,allowance.creditAllowance];
    let sql1="select * from salary_allowance";
    dbpool.query(sql1,(err,recordset)=>{
    if(recordset.length > 0){
        modifyAllowance(req,res);
    }
    else{
        let sql="INSERT INTO salary_allowance (city_allowance,created_by,created_on,house_rent,lunch,medical,modify_by,modify_on,provident_fund,transport,year,credit_allowance)VALUES(?)";
        dbpool.query(sql,[allowanceData],(err,result)=>{
           if(err){
               console.log(err);
               return res.status(200).send(responseData.INSERT_FAILURE);  
           }        
           else
               return res.status(200).send(responseData.INSERT_SUCCESS); 
        })
    }
    });

   }
   catch(err){
       console.log(err.message);
      return res.status(400).send({
      message:err.message,
      data:err
      });
     }  
    }
   
    const modifyAllowance=(req,res)=>{
        try{
            var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
            var year = new Date().getFullYear();
            var allowance=req.body;
            var modifyData=[allowance.cityAllowance,allowance.houseRent,allowance.lunch,
                allowance.medical,allowance.createdby,createdon,allowance.providentFund,allowance.transport,year,allowance.creditAllowance];
              let sql="UPDATE salary_allowance set city_allowance= ?,house_rent= ?,lunch= ?,medical= ? ,modify_on= ?,provident_fund= ?,transport= ?,year= ?,credit_allowance= ?";
              console.log(modifyData);
              dbpool.query(sql,[allowance.cityAllowance,allowance.houseRent,allowance.lunch,allowance.medical,createdon,allowance.providentFund,allowance.transport,year,allowance.creditAllowance],(err,result)=>{
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
    const deleteRecord=()=>{
        try{
            let sql=" DELETE from salary_allowance";
            dbpool.query(sql,(err,result)=>{
               if(err)
                   console.log(err);
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

const getAllowanceById=(req,res)=>{
    let sq="select * from salary_allowance where id=?";
    dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
     return res.status(200).send(result); 
    });
     
}
const getAllowance=(req,res)=>{
    let sq="select * from salary_allowance";
    dbpool.query(sq,(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
     return res.status(200).send(result); 
    });
     
}

module.exports={
               getAllowance,
               createAllowance,
               getAllowanceById
                };