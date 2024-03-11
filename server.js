const express= require("express");
const app=express();
const cors= require("cors");
var corsOption={
    origin :"http://localhost:3000"
}
 app.use(cors(corsOption));
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 require("dotenv").config();
const port=process.env.port;
  
 app.use("/api/users",require("./routes/userRoute"));
 app.use("/api/holiday",require("./routes/holidayRoute"));

 
app.listen(port,()=>{ 
    console.log("server started on Port="+port);
})