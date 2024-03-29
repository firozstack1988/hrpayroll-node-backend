 
const { json } = require("sequelize");
const dbpool= require("../config/db");
 require("../config/dbUtils");
const responseData=require("../config/responseModel"); 
const moment = require("moment");


const createEmployee=(req,res)=>{
   try{
    dbpool.query("select * from employee where emp_id=?",req.body.empId,(err,result)=>{
        if(result.length > 0)
            return res.status(200).send(responseData.DUPLICATE_EMPID);
             else{
               dbpool.query("select * from leave_policy",(err,result)=>{
                if(err)
                 return res.status(200).send("No data found for leave policy");
                  else{
            var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
            var joiningDate=moment().format("YYYY-MM-DD");
            var d=req.body;
            var data=[d.emailAddress,d.designation, d.empId,"",joiningDate,d.mobileNo,d.name,
                d.deptName,d.branchCode,d.basicAmt,"1",d.supervision,"",null,d.createdby,createdon];
            var leavData=[d.empId,result[0].year,result[0].sick_leave,result[0].casual_leave,result[0].earned_leave];
            addEmployee(data,res,leavData); 
           } 
          });
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

    const addEmployee = (data,res,leavData) => {
            dbpool.getConnection( (err, connection)=> {
                if (err) 
                    return res.send({
                    status:"failure",
                    message:"Error occurred while getting the connection"
                    });
                
                    return connection.beginTransaction(err => {
                    if (err) {
                        connection.release();
                        return res.send({
                            status:"failure",
                            message:"Error occurred while creating the transaction"
                            });
                    }
                    return connection.query(
                        'INSERT INTO employee (email_address,emp_designation,emp_id,emp_role,joining_date,mobile_no,name,dept_name,branch_code,basic_amt,isActive,supervisor,created_by,created_on,updated_by,updated_on)VALUES(?)', [data], (err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return res.send({
                                        status:"failure",
                                        message:"Inserting to employee table failed"
                                        });
                                });
                            }
                            return connection.query(
                                'INSERT INTO leave_balance (employee_id,year,sick_leave,casual_leave,earned_leave)VALUES(?)', [leavData], (err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return res.send({
                                                status:"failure",
                                                message:"Inserting to leave_balance table failed"
                                                });
                                        });
                                    }                                
                                    return connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return res.send({
                                                    status:"failure",
                                                    message:"Commit failure"
                                                    });
                                            });
                                        }
                                        connection.release();
                                         return res.send({
                                            status:"success",
                                            message:"Record updated"
                                            });
                                    });
                                });
                        });
                });
            });  
    }

    const insertData=async(data,res,leavData,next)=>{
        await  dbpool.beginTransaction();
      try{
      const sql='INSERT INTO employee (email_address,emp_designation,emp_id,emp_role,joining_date,mobile_no,name,dept_name,branch_code,basic_amt,isActive,supervisor,created_by,created_on,updated_by,updated_on)VALUES(?)';
      dbpool.query(sql,[data]).then((result)=>{
        return insertLeavBal(leavData);
      }).then(async detail=>{
        await dbpool.commit();
        return res.status(200).send(responseData.INSERT_SUCCESS); 
      }).catch(async err=>{
        await dbpool.rollback();
        next(err);
      })
    }
      catch(err){
        dbpool.rollback();
        next(err);
      }     
    }  

     const insertLeavBal=(leavData,res)=>{
            let sql="INSERT INTO leave_balance (employee_id,year,sick_leave,casual_leave,earned_leave)VALUES(?)";
            dbpool.query(sql,[leavData],(err,result)=>{
               if(err)
                   return res.status(200).send(responseData.INSERT_FAILURE);    
               else
                   return res.status(200).send(responseData.INSERT_SUCCESS); 
            });
        
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