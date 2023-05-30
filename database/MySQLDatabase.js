//const mysql = require("mysql2/promise");
const Database = require("./Database");

const mysql = require("mysql2");

class MySQLDatabase extends Database {
  constructor(config) {
    super(config);
  }

  connect() {
    const self = this;

    return new Promise(function (resolve, reject) {
      self.pool = mysql.createPool(self.config);
      resolve(self);
    });
  }

  checkConnection() {
    const self = this;

    return new Promise(function (resolve, reject) {
      resolve(self.pool && !self.pool._closed);
    });
  }

  getConnection() {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (self.pool && !self.pool._closed) {
        self.pool.getConnection(function (err, connection) {
          if (err) {
            resolve(err);
          } else {
            resolve(connection);
          }
        });
      } else {
        resolve(new Error("No connection available"));
      }
    });
  }

  disconnect() {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (self.pool && !self.pool._closed) {
        self.pool.end(function (err) {
          if (err) {
            reject(err);
          } else {
            self.pool = null;
            resolve(true);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  query(queryString) {
    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .getConnection()
        .then(function (connection) {
          connection.query(queryString, function (err, results) {
            connection.release(); // Release the connection back to the pool
            if (err) {
              resolve(err);
            } else {
              resolve(results);
            }
          });
        })
        .catch(function (err) {
          resolve(err);
        });
    });
  }

  queryWithValues(queryString, values) {
    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .getConnection()
        .then(function (connection) {
          connection.query(queryString, values, function (err, results) {
            connection.release(); // Release the connection back to the pool
            if (err) {
              resolve(err);
            } else {
              resolve(results);
            }
          });
        })
        .catch(function (err) {
          resolve(err);
        });
    });
  }

  update(queryString) {
    return this.query(queryString);
  }

  delete(queryString) {
    return this.query(queryString);
  }
}

module.exports = MySQLDatabase;
