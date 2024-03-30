 
const { json } = require("sequelize");
const dbpool= require("../config/db");
const bcrypt = require('bcryptjs');
const responseData=require("../config/responseModel"); 
const jwt = require('jsonwebtoken'); 
require("dotenv").config();
require('crypto').randomBytes(64).toString('hex');
const cookieParser = require('cookie-parser');
const {validator} = require('node-input-validator');
const { decrypt } = require("dotenv");
const moment = require("moment"); 

const secretKey = process.env.TOKEN_SECRET;
 
const userPassChange=(req,res)=>{
   try{
      userOldPass=req.body.oldPassword;
      if(req.body.newPassword!=req.body.confirmPassword){
         return res.send(responseData.NEWPASSWORD_CONFIRMPASSWORD);
      }
      userPassModify(req.body.userId,userOldPass,req.body.newPassword,res);
    }
    catch(err){
        return res.send({status:responseData.FAILURE,message:err}); 
    } 
 }
 function userPassModify(userId,userOldPass,newPass,res){
    try{
        let sql="select password,user_name,user_role from users where login_user=?";
        dbpool.query(sql,userId,(err,recordset)=>{
        if(recordset.length > 0){
         if(bcrypt.compareSync(userOldPass,recordset[0].password)){ 
           let sql="update users set password=? where login_user=?";
           dbpool.query(sql,[bcrypt.hashSync(newPass,10),userId],(err,recordset)=>{
            if(err)
               return res.send({status:responseData.FAILURE,message:responseData.PASSWORD_FAILURE_MSG});
            else
               return res.send({status:responseData.SUCCESS,message:responseData.PASSWORD_SUCCESS_MSG});
            });
         }
           else
              return res.send({status:responseData.FAILURE,message:responseData.PASSWORD_MISMATCH}); 
        }
        else
             return res.send({status:responseData.FAILURE,message:responseData.USER_ERROR});     
    }); 
    }
   catch(err){
            return res.send({status:responseData.FAILURE,message:err}); 
     }     
    }
    
 
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
                    res.send({
                        status:responseData.SUCCESS,message:"Login Success",content:recordset[0].user_role
                    }); 
                }  
               else
                   return res.send({status:responseData.FAILURE,message:responseData.PASSWORD_MISMATCH});    
               });            
               }
               else{
                  return res.send({status:responseData.FAILURE,message:"User not found"}); 
               }           
        });
   }
    catch(err){
        return res.send({status:responseData.FAILURE,message:err}); 
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
    res.send(responseData.LOGOUT);
}


const createUsers=(req,res)=>{
    var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
    var user=req.body;
    var hashPass= bcrypt.hashSync(user.password,10);
    var userData=[user.createdBy,createdon,user.loginUser,hashPass,"",null,user.userName,user.userRole,user.userType];
    let sq="select * from employee where emp_id=?";
    dbpool.query(sq,[req.body.loginUser],(err,result)=>{
     if(err){
        console.log(err);
          return res.send({ status:"failure", message:err });  
     }
     if(result.length > 0)
        insertIntoUser(userData,res); 
     else
          return res.send({ status:"failure", message:"Employee id not exists" }); 
    }); 
}

const insertIntoUser=(data,res)=>{
    let userSql="INSERT INTO users (created_by,created_on,login_user,password,updated_by,updated_on,user_name,user_role,user_type)VALUES(?)";
    dbpool.query(userSql,[data],(err,result)=>{
        if(err){
            console.log(err); 
            return res.send({ status:"failure", message:"Insert failure" });  
        }        
        else{
            return res.send({ status:"success", message:"Record updated" });     
        }     
});
}
const getUserById=(req,res)=>{
    let sq="select password,user_name,user_role,login_user,user_type from users where login_user=?";
    let empId=req.params.id;
    dbpool.query(sq,empId,(err,result)=>{
     if(err){
        console.log(err);
     }
     res.status(200).json(result); 
    });  
}

const getUserDetailById=(req,res)=>{
    let sq="select * from users where id=?";
    let empId=req.params.id;
    dbpool.query(sq,empId,(err,result)=>{
     if(err){
        console.log(err);
     }
     res.status(200).json(result); 
    });  
}

const updateUser=(req,res)=>{
    try{
        var createdon=moment().format("YYYY-MM-DD HH:mm:ss");
        var year = new Date().getFullYear();
        var data=req.body;
        console.log(data);
        let sql="UPDATE users set user_name= ?,user_role= ?,user_type= ? where id=?";
          dbpool.query(sql,[data.userName,data.userRole,data.userType,data.id],(err,result)=>{
             if(err){
                 console.log(err);
                  return res.send({ status:"failure", message:"update failure" });  
             }        
             else
                 return res.send({ status:"success", message:"Record updated" });
          })
    }
    catch(err){
        console.log(err.message);
         return res.send({ status:"failure", message:err});
      } 
}

const getUser=(req,res)=>{
    let sq="select * from users ";
    dbpool.query(sq,(err,result)=>{
     if(err){
        console.log(err);
     }
       res.status(200).json(result); 
    });  
}

module.exports={
               createUsers,
               getUserById,
               userLogin,
               userLogout,
               userVerify,
               userPassChange,
               updateUser,
               getUser,
               getUserDetailById};