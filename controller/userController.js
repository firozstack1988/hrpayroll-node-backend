 
const { json } = require("sequelize");
const dbpool= require("../config/db");
const bcrypt = require('bcryptjs');
const responseData=require("../config/responseModel"); 
const jwt = require('jsonwebtoken'); 
require("dotenv").config();
require('crypto').randomBytes(64).toString('hex');
const cookieParser = require('cookie-parser');

const secretKey = process.env.TOKEN_SECRET;

const userLogin=(req,res)=>{
    const userId=req.body.loginUser;
    const loginpass= req.body.password;
    let sql="select password,user_name,user_role from users where login_user=?";
    try{
        dbpool.query(sql,userId,(err,recordset)=>{
            if(recordset.length >0){
               bcrypt.compare(loginpass.toString(),recordset[0].password,(err,response)=>{
               if(err)
                    res.send("Password comparing error");
                if(response){
                    const name=recordset[0].user_name;
                    const token=jwt.sign({name},secretKey,{expiresIn:'30min'});
                    res.cookie('token',token);
                    res.send(responseData.success); 
                }  
               else
                    res.send(responseData.passMismatch);    
               });            
               }
               else{
                 res.send(responseData.userError); 
               }           
        });
   }
    catch(err){
        res.send(err);  
    }
}

const userVerify=(req,res,next)=>{
    const token=req.cookies.token;
    console.log("token value="+req.cookies.token);
    if(!token){
        return res.json("You are not authorized");
    }else{
        jwt.verify(cokieToken,secretKey,(err,decoded)=>{
          if(err){
           return res.json("Token is Expired");
          } 
          else{
            req.name=decoded.name;
            return res.json(responseData.success);
          } 
        })
    }
}

const userLogout=(req,res)=>{
    res.send(responseData.logout);
}

const getUsers=(userId)=>{
    let sql="select password,user_name,user_role from users where login_user=?";
    dbpool.query(sql,userId,(err,recordset)=>{
        if(err)
            console.log(err);        
        else{
          let  dbpass=recordset[0].password;
           return dbpass;
        }
    });  
}
const createUsers=(req,res)=>{
    var user=req.body;
    var hashPass= bcrypt.hashSync(user.password,10);
    var userData=["",null,user.loginUser,hashPass,"",null,user.userName,user.userRole,user.userType];
    let sql="INSERT INTO users (created_by,created_on,login_user,password,updated_by,updated_on,user_name,user_role,user_type)VALUES(?)";
    dbpool.query(sql,[userData],(err,result)=>{
        if(err)
            console.log(err);        
        else
            res.status(200).json(result); 
})
}
const getUserById=(req,res)=>{
    let sq="select password,user_name,user_role from users where login_user=?";
    let empId=req.params.id;
    dbpool.query(sq,empId,(err,result)=>{
     if(err){
        console.log(err);
     }
     res.status(200).json(result); 
    });
     
}

module.exports={getUsers,
               createUsers,
               getUserById,
               userLogin,
               userLogout,
               userVerify};