const express= require("express");
const app=express();
const cors= require("cors");
const cookieParser = require('cookie-parser');
var corsOption={
    origin :"http://localhost:3000",
    method :["POST","GET","DELETE","PUT"],
    credentials:true
}
 app.use(cors(corsOption));
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 require("dotenv").config();
 const port=process.env.port;
 app.use(cookieParser());
  
 app.use("/api/users",require("./routes/userRoute"));
 app.use("/api/holiday",require("./routes/holidayRoute"));
 app.use("/api/branchConfig",require("./routes/branchConfigRoute"));
 app.use("/api/allowance",require("./routes/allowanceRoute"));
 app.use("/api/employee",require("./routes/employeeRoute"));
 app.use("/api/leavePolicy",require("./routes/leavePolicyRoute"));
 app.use("/api/leave",require("./routes/leaveRoute"));
 app.use("/api/salaryProcess",require("./routes/salaryProcessRoute"));


 
app.listen(port,()=>{ 
    console.log("server started on Port="+port);
})