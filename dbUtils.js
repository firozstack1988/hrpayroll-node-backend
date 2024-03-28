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