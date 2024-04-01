 
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
            var leavData=[d.empId,result[0].year,result[0].sick_leave,result[0].casual_leave,result[0].earned_leave,d.branchCode];
            var currentMonth = moment().format("MMMM");
            var currentYear = new Date().getFullYear();
            var spentLeave='0';
            var monthlyLeaveData=[d.empId,currentYear,currentMonth,spentLeave,d.branchCode];
            addEmployee(data,res,leavData,monthlyLeaveData); 
           } 
          });
     }
    });
   }
   catch(err){
       console.log(err.message);
        return res.status(400).send({message:err.message,data:err });
     }  
    }

    const addEmployee = (data,res,leavData,monthlyLeaveData) => {
            dbpool.getConnection( (err, connection)=> {
                if (err) 
                    return res.send({status:"failure",message:"Error occurred while getting the connection"});
                
                    return connection.beginTransaction(err => {
                    if (err) {
                        connection.release();
                        return res.send({status:"failure",message:"Error occurred while creating the transaction"});
                    }
                    return connection.query(
                        'INSERT INTO employee (email_address,emp_designation,emp_id,emp_role,joining_date,mobile_no,name,dept_name,branch_code,basic_amt,isActive,supervisor,created_by,created_on,updated_by,updated_on)VALUES(?)', [data], (err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return res.send({status:"failure",message:"Inserting to employee table failed"});
                                });
                            }
                            return connection.query(
                                'INSERT INTO leave_balance (employee_id,year,sick_leave,casual_leave,earned_leave,branch_code)VALUES(?)', [leavData], (err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return res.send({status:"failure",message:"Inserting to leave_balance table failed"});
                                        });
                                    } 
                                    return connection.query(
                                        'INSERT INTO monthly_leave_bal (emp_id,year,month,spent_leave,branch_code)VALUES(?)', [monthlyLeaveData], (err) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return res.send({status:"failure",message:"Inserting to monthly_leave_bal table failed"});
                                                });
                                            }                                
                                    return connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return res.send({ status:"failure", message:"Commit failure" });
                                            });
                                        }
                                        connection.release();
                                         return res.send({status:"success",message:"Record updated"});
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
const getEmployeeByloginId=(req,res)=>{
    let sq="SELECT e.emp_id,e.branch_code,e.dept_name,e.email_address,e.emp_designation,e.mobile_no,e.name,u.user_role,e.joining_date FROM  users u inner join employee e on e.emp_id=u.login_user where e.isActive='1' and e.emp_id=?";
     dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
        return res.status(200).send(result); 
    });    
}
const getLeaveBalByEmpId=(req,res)=>{
    var year = new Date().getFullYear();
    let sq="select l.employee_id,l.sick_leave,l.casual_leave,l.earned_leave,l.year,e.emp_designation,e.name from leave_balance l inner join employee e on l.employee_id=e.emp_id  where l.employee_id=? and l.year=?";
    dbpool.query(sq,[req.params.id,year],(err,result)=>{
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
               updateEmployee,
               getEmployeeByloginId,
               getLeaveBalByEmpId
                };