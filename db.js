const mysql= require("mysql");
require("dotenv").config();
var Promise = require("bluebird");

const dbpool=mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    connectionLimit: 10,
});

exports.transaction = function(connection, body, done) {

    connection.getConnection(function(err, conn) {
  
      conn.beginTransaction(function(err) {
        if (err) return done(err);
  
        body(function(err) {
          if (err) return conn.rollback(function() {
            done(err);
          });
  
          conn.commit(function(err) {
            if (err) return conn.rollback(function() {
              done(err);
            });
  
            done();
          });
        });
      });
    });
  };
 
dbpool.query = Promise.promisify(dbpool.query);
module.exports= dbpool;