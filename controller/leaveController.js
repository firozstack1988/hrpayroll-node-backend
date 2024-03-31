 
const dbpool= require("../config/db");
const moment = require("moment");
const responseData=require("../config/responseModel"); 
//import { format } from 'date-fns';

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
     
    var data=[d.employeeId,formattedFromDate,d.leaveReason,d.leaveType,d.numberOfDays,formattedToDate,responseData.LEAVE_STATUS_PENDING,d.employeeId,createdon];
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
          insertLeave(data,res); 
     }
     else
          return res.send({ status:"failure", message:"No data found in leave balance" }); 
    });  
}

const insertLeave=(data,res)=>{
    let sql="INSERT INTO leave_entry (employee_id,from_date,leave_reason,leave_type,number_of_days,to_date,leave_status,created_by,created_on)VALUES(?)";
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

module.exports={getLeave,createLeave,getLeaveById,getLeaveStatusByEmpId};