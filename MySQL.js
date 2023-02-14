const mysql = require('mysql');

class MySQL {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    const connection = this.connection;
    console.log('connection', connection)


    this.connection = connection.connect(function (err) {
      if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        throw(err);
        process.exit(5);
      }
      else {
        console.log('connection2', connection)


        console.log(
          'Connected to MySQL database as ID ' + this.connection
        );
      }
      
    });
  }

  query(sql, values, callback) {
    this.connection.query(sql, values, function (error, results, fields) {
      if (error) {
        console.error('Error executing query: ' + error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  close() {
    this.connection.end(function (err) {
      if (err) {
        console.error('Error closing MySQL database connection: ' + err.stack);
        return;
      }
      console.log('Closed MySQL database connection');
    });
  }
}

module.exports = MySQL;
