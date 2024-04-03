 
const dbpool= require("../config/db");
const moment = require("moment");
const responseData=require("../config/responseModel");  

const createSalary=(req,res)=>{
    var year=req.body.year;
    var currentMonth=req.body.month;
    let sq="SELECT * FROM  salary_process where year=? and month=? ";
    dbpool.query(sq,[year,currentMonth],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     if(result.length > 0)
         return res.send({ status:"failure", message:"Salary already generated for the given month and year" });  
     else
       getHolidayData(year,currentMonth,res);
 }); 
}
    const getHolidayData=(year,currentMonth,res)=>{
    let sq="SELECT number_of_holiday FROM holidays where year=? and month=? ";
    dbpool.query(sq,[year,currentMonth],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     if(result.length > 0){
         var monthlyHoliday=result[0].number_of_holiday; 
         getEmployeeList(year,currentMonth,monthlyHoliday,res); 
     }
     else
        return res.send({ status:"failure", message:"No data found in holidays setup table" });
    }); 
}
const getEmployeeList=(year,currentMonth,monthlyHoliday,res)=>{
    let sql="select * from employee where isActive='1' ";
    dbpool.query(sql,(err,result)=>{
        if(err){
            console.log(err); 
            return res.send({ status:"failure", message:err });  }         
        if(result.length > 0){
        for(let i=0;i<result.length;i++){
            var basicAmt=result[i].basic_amt;
            var branch=result[i].branch_code;
            var empId=result[i].emp_id;
            var name=result[i].name;
            getEmpSpentLeave(year,currentMonth,name,basicAmt,monthlyHoliday,branch,empId,res);
        }
        }
        else
           return res.send({ status:"failure", message:"No data found in employee table" }); 
    }); 
}

const getEmpSpentLeave=(year,currentMonth,name,basicAmt,monthlyHoliday,branch,empId,res)=>{
    let sq="select sum(number_of_days) as totalLeave from leave_entry where leave_status='APPROVED' and year=? and month=? and employee_id=? and branch_code=?";
    dbpool.query(sq,[year,currentMonth,empId,branch],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     if(result.length > 0){
         var totalSpentLeave=result[0].totalLeave; 
         getbranchLocation(year,currentMonth,name,basicAmt,monthlyHoliday,totalSpentLeave,branch,empId,res);
     }
    });   
}
 const getbranchLocation=(year,currentMonth,name,basicAmt,monthlyHoliday,totalSpentLeave,branch,empId,res)=>{
    let sq="SELECT branch_location,branch_name FROM hrpayroll.branch_config where branch_code=? ";
    dbpool.query(sq,[branch],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     if(result.length > 0){
         var branchLocation=result[0].branch_location; 
         getAllowance(year,currentMonth,name,basicAmt,monthlyHoliday,totalSpentLeave,branchLocation,branch,empId,res);  
     }
    });  
}

const getAllowance=(year,currentMonth,name,basicAmt,monthlyHoliday,totalSpentLeave,branchLocation,branch,empId,res)=>{
    var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
    let sq="select * from salary_allowance where year=?";
    dbpool.query(sq,[year],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     if(result.length > 0){
         let houseRent=(result[0].house_rent/100)*basicAmt; 
         let medical=(result[0].medical/100)*basicAmt;
         let transport=(result[0].transport/100)*basicAmt;
         let providentFund=(result[0].provident_fund/100)*basicAmt;
         let lunch=0;
         let cityAllowance=0;
         let totalWorkingDay=0;
         if(currentMonth=="February")
         totalWorkingDay=28-(monthlyHoliday+totalSpentLeave);

         if(currentMonth=="January" || currentMonth=="March" || currentMonth=="May" || currentMonth=="July" || currentMonth=="August" || currentMonth=="October" || currentMonth=="December")
            totalWorkingDay=31-(monthlyHoliday+totalSpentLeave);
         if(currentMonth=="April" || currentMonth=="June" || currentMonth=="September" || currentMonth=="November")
            totalWorkingDay=30-(monthlyHoliday+totalSpentLeave);
          lunch= result[0].lunch*totalWorkingDay;
        if(branchLocation=="City")
          cityAllowance=result[0].city_allowance;
         else 
          cityAllowance=0;
         let creditAllowance=result[0].credit_allowance; 
         let grossAmt=basicAmt+lunch+medical+transport+houseRent+cityAllowance+creditAllowance;
         
         var data=[basicAmt,cityAllowance,"",createdon,creditAllowance,empId,name,grossAmt,houseRent,lunch,medical,currentMonth,providentFund,transport,year];
          console.log("prepared data="+data);
         insertSalaryProcess(data,res);
        }
     else
     return res.send({ status:"failure", message:"No data found in salary allowance table" });

   });   
}
const insertSalaryProcess=(data,res)=>{
    let sq="INSERT INTO salary_process(basic_amt,city_allowance_amt,created_by,created_on,credit_allowance_amt,emp_id,emp_name,gross_salary,house_rent_amt,lunch_amt,medical_allowance_amt,month,provident_fund_amt,transport_allowance,year) VALUES(?) ";
    dbpool.query(sq,[data],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     else
        return res.send({ status:"success", message:"Salary generate done" });
    });   
}

const getMonthlySalary=(req,res)=>{
    var year = req.params.year;
    var currentMonth = req.params.month; 
    let sq="SELECT * FROM  salary_process where year=? and month=? ";
    dbpool.query(sq,[year,currentMonth],(err,result)=>{
     if(err){
        console.log(err);
        return res.send({ status:"failure", message:err });
     }
     if(result.length > 0)
        return res.status(200).json(result); 
     else
        return res.send({ status:"failure", message:"No data found for the given month and year" });
    });   
}

module.exports={createSalary,getMonthlySalary};