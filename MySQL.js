const mysql = require('mysql');

class MySQL {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
      }
      console.log('Connected to MySQL database as ID ' + this.connection.threadId);
    });
  }

  query(sql, values, callback) {
    this.connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error executing query: ' + error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  close() {
    this.connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL database connection: ' + err.stack);
        return;
      }
      console.log('Closed MySQL database connection');
    });
  }
}

module.exports = MySQL;
