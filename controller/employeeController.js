 
const { json } = require("sequelize");
const dbpool= require("../config/db");
const responseData=require("../config/responseModel"); 
const moment = require("moment");

const createEmployee=(req,res)=>{
   try{
    let sql2="select * from employee where emp_id=?";
    var empId=req.body.empId;
    dbpool.query(sql2,empId,(err,result)=>{
        if(result.length > 0)
            return res.status(200).send(responseData.DUPLICATE_EMPID);
       else
          insertData(req,res); 
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
    const insertData=(req,res)=>{
       try{
        var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
        var d=req.body;
        var data=[d.createdby,createdon,d.emailAddress,d.designation,
            d.empId,"",null,d.mobileNo,d.name,"",null,d.deptName,null,d.branchCode,d.basicAmt];
            let sql="INSERT INTO employee (created_by,created_on,email_address,emp_designation,emp_id,emp_role,joining_date,mobile_no,name,updated_by,updated_on,dept_name,designation,branch_code,basic_amt)VALUES(?)";
            dbpool.query(sql,[data],(err,result)=>{
               if(err){
                   console.log(err);
                   return res.status(200).send(responseData.INSERT_FAILURE);  
               }        
               else
                   return res.status(200).send(responseData.INSERT_SUCCESS); 
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

    const updateEmployee=(req,res)=>{
        try{
                updateData(req,res);
        }
        catch(err){
            console.log(err.message);
           return res.status(400).send({
           message:err.message,
           data:err
           });
          } 
    }
    const updateData=(req,res)=>{
        try{
            var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
            var year = new Date().getFullYear();
            var data=req.body;
             let sql="UPDATE employee set email_address= ?,emp_designation= ?,mobile_no= ?,name= ? ,dept_name= ?,branch_code= ?,basic_amt= ?,updated_by= ?,updated_on= ? where emp_id=?";
              dbpool.query(sql,[data.emailAddress,data.designation,data.mobileNo,data.name,data.deptName,data.branchCode,data.basicAmt,data.loginUser,createdon,data.empId],(err,result)=>{
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
    

const getEmployeeById=(req,res)=>{
    let sq="select * from employee where id=?";
    dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
     return res.status(200).send(result); 
    });
     
}
const getEmployee=(req,res)=>{
    let sq="select * from employee";
    dbpool.query(sq,(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
      return res.status(200).send(result); 
    });
     
}

module.exports={
               getEmployee,
               createEmployee,
               getEmployeeById,
               updateEmployee
                };