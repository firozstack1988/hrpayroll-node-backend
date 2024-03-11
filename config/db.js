const mysql= require("mysql");
require("dotenv").config();

const dbpool=mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
});
 

module.exports= dbpool;