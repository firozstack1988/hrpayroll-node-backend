 
const dbpool= require("../config/db");
const moment = require("moment");
const responseData=require("../config/responseModel"); 

const getLeave=(req,res)=>{
    var holiData=[];
    let sql="select * from leave_entry";
    dbpool.query(sql,(err,result)=>{
        if(err)
            console.log(err);        
        else
           res.json(result);              
    });   
  }

const createLeave=(req,res)=>{
    var d=req.body;
    var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
    const formattedFromDate = moment(d.fromDate).format('YYYY-MM-DD');  
    const formattedToDate =  moment(d.toDate).format('YYYY-MM-DD');
   
    let sq="select * from leave_balance where employee_id=?";
    dbpool.query(sq,[d.employeeId],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err }); 
     }
     if(result.length > 0){
        if(d.leaveType=='Sick Leave'){
            if(d.numberOfDays>result[0].sick_leave){
                return res.send({ status:"failure", message:"Sick leave are not available" }); 
             }
        }
        if(d.leaveType=='Casual Leave'){
            if(d.numberOfDays>result[0].casual_leave){
                return res.send({ status:"failure", message:"Casual leave are not available" }); 
             }
        }
        if(d.leaveType=='Earned Leave'){
            if(d.numberOfDays>result[0].earned_leave){
                return res.send({ status:"failure", message:"Earned leave are not available" }); 
             }
        } 
        var data=[d.employeeId,formattedFromDate,d.leaveReason,d.leaveType,d.numberOfDays,formattedToDate,responseData.LEAVE_STATUS_PENDING,d.employeeId,createdon,result[0].branch_code,"",null];
      
        insertLeave(data,res); 
     }
     else
          return res.send({ status:"failure", message:"No data found in leave balance" }); 
    });  
}

const insertLeave=(data,res)=>{
    let sql="INSERT INTO leave_entry (employee_id,from_date,leave_reason,leave_type,number_of_days,to_date,leave_status,created_by,created_on,branch_code,aproved_by,aproved_on)VALUES(?)";
    dbpool.query(sql,[data],(err,result)=>{
        if(err){
            console.log(err); 
            return res.send({ status:"failure", message:"Insert failure" });   
           }        
        else
           return res.send({ status:"success", message:"Record updated" });   
    });
}

const getLeaveById=(req,res)=>{
    let sq="select * from leave_entry where id=?";
    dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
     return res.status(200).send(result); 
    });    
}
 const getLeaveStatusByEmpId=(req,res)=>{
    let sq="select * from leave_entry where employee_id=?";
    dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.status(200).send(err); 
     }
       return res.status(200).send(result); 
    });
  }
  const getLeaveAprovedByAdmin=(req,res)=>{
    let sq="select * from employee where emp_id=?";
    dbpool.query(sq,[req.params.id],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err }); 
     }
       if(result.length > 0)
         getPendingLeaveList(result[0].branch_code,res);
       else
         return res.send({ status:"failure", message:"No data found for the employee id" }); 
    });
  }
  const getPendingLeaveList=(branchCode,res)=>{
    let sq="select l.employee_id,e.name,l.from_date,l.to_date,l.leave_reason,l.leave_type,l.number_of_days,l.leave_status,l.leave_type from leave_entry l inner join employee e on l.employee_id=e.emp_id where l.leave_status='PENDING' and e.isActive='1' and l.branch_code=? ";
    dbpool.query(sq,[branchCode],(err,result)=>{
     if(err){
         console.log(err);
         return res.send({ status:"failure", message:err }); 
     }
         return res.status(200).send(result); 
    });
  } 
  
  const createStatusUpdate=(req,res)=>{
    var leaveAppliedEmpId=req.body.leaveAppliedId;
    let brnSql="select branch_code from employee where emp_id=?"
    dbpool.query(brnSql,[leaveAppliedEmpId],(err,result)=>{
      if(err){
          console.log(err);
          return res.send({ status:"failure", message:"Query execution error" }); 
      }
      if(result.length > 0){
        var branchCode=result[0].branch_code;
        var year = new Date().getFullYear();
         preparedLeaveData(branchCode,year,req,res);
      }
      else
        return res.send({ status:"failure", message:"No data present for the employee id in employee table" });  
    });
  } 
  const preparedLeaveData=(branchCode,year,req,res)=>{
    let sql="select * from leave_balance where employee_id=? and year=? and branch_code=?";
    dbpool.query(sql,[req.body.leaveAppliedId,year,branchCode],(err,result)=>{
      if(err){
          console.log(err);
          return res.send({ status:"failure", message:"Query execution error" }); 
      }
      if(result.length > 0){
      var d=req.body;
      var fromDate1=moment(d.fromDate);
      var toDate1=moment(d.toDate);
      var totleave = toDate1.diff(fromDate1, "days")+1;
      var sickLeave='';
      var casualLeave='';
      var earnedLeave='';
      if(d.leaveType=='Sick-Leave'){
        if(result[0].sick_leave>totleave)
            sickLeave=result[0].sick_leave-totleave;
          else
            return res.send({ status:"failure", message:"Casual leave is less than applied total leave" });    
        }
        else
           sickLeave=result[0].sick_leave;
       
      if(d.leaveType=='Casual-Leave'){
        if(result[0].casual_leave>totleave)
          casualLeave=result[0].casual_leave-totleave;
          else
            return res.send({ status:"failure", message:"Casual leave is less than applied total leave" });    
        }
        else
           casualLeave=result[0].casual_leave;
       
      if(d.leaveType=='Earned-Leave'){
        if(result[0].earned_leave>totleave)
            earnedLeave=result[0].earned_leave-totleave;
          else
            return res.send({ status:"failure", message:"Earned leave is less than applied total leave" }); 
        }
        else 
           earnedLeave=result[0].earned_leave;
          
         updateLeaveStatus(req,res,sickLeave,casualLeave,earnedLeave,year,branchCode) 
    }
    else
         return res.send({ status:"failure", message:"No data present in leave balance for the given employee" }); 
    });
  }
  const updateLeaveStatus = (req,res,sickLeave,casualLeave,earnedLeave,year,branchCode) => {
    var d=req.body;
    var leaveAppliedEmpId=d.leaveAppliedId;
    var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
    dbpool.getConnection( (err, connection)=> {
        if (err) 
            return res.send({status:"failure", message:"Error occurred while getting the connection"});
           
            return connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return res.send({ status:"failure",message:"Error occurred while creating the transaction"});
            }
            return connection.query(
                'update leave_entry set leave_status=?,aproved_by=?,aproved_on=? where employee_id=? and from_date=? and to_date=?', [d.leaveStatus,d.employeeId,createdon,d.leaveAppliedId,d.fromDate,d.toDate], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.send({status:"failure",message:"Updating leave_enrty table failed"});
                        });
                    }
                    return connection.query(
                        'update leave_balance set sick_leave=?,casual_leave=?,earned_leave=? where employee_id=? and year=? and branch_code=? ', [sickLeave,casualLeave,earnedLeave,leaveAppliedEmpId,year,branchCode], (err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return res.send({status:"failure",message:"Updating to leave_balance table failed"});
                                });
                            }                                
                            return connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return res.send({status:"failure",message:"Commit failure"});
                                    });
                                }
                                 connection.release();
                                   return res.send({status:"success", message:"Record updated"});
                            });
                        });
                });
        });
    });  
} 

module.exports={getLeave,createLeave,getLeaveById,getLeaveStatusByEmpId,getLeaveAprovedByAdmin,createStatusUpdate};