// Import the required modules
const Database = require("./Database");
const mysql = require("mysql2");

/**
 * Represents a MySQL database.
 * @extends Database
 */
class MySQLDatabase extends Database {
  /**
   * Create a new instance of MySQLDatabase.
   * @param {Object} config - The configuration object for the MySQL connection.
   */
  constructor(config) {
    super(config);
  }

  /**
   * Connect to the MySQL database.
   * @returns {Promise} A promise that resolves to the connected MySQLDatabase instance.
   */
  connect() {
    const self = this;

    return new Promise(function (resolve, reject) {
      // Create a connection pool using the provided configuration
      self.pool = mysql.createPool(self.config);
      resolve(self);
    });
  }

  /**
   * Check if the MySQL database connection is active.
   * @returns {Promise} A promise that resolves to a boolean indicating the connection status.
   */
  checkConnection() {
    const self = this;

    return new Promise(function (resolve, reject) {
      // Check if the connection pool exists and is not closed
      resolve(self.pool && !self.pool._closed);
    });
  }

  /**
   * Get a connection from the MySQL connection pool.
   * @returns {Promise} A promise that resolves to a MySQL connection object.
   */
  getConnection() {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (self.pool && !self.pool._closed) {
        // Get a connection from the pool
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

  /**
   * Disconnect from the MySQL database.
   * @returns {Promise} A promise that resolves to a boolean indicating the disconnection status.
   */
  disconnect() {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (self.pool && !self.pool._closed) {
        // End the connection pool
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

  /**
   * Execute a query on the MySQL database.
   * @param {string} queryString - The SQL query string to execute.
   * @returns {Promise} A promise that resolves to the query results or an error.
   */
  query(queryString) {
    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .getConnection()
        .then(function (connection) {
          // Execute the query using the obtained connection
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

  /**
   * Execute a query on the MySQL database with parameterized values.
   * @param {string} queryString - The SQL query string to execute.
   * @param {Array} values - The parameterized values for the query.
   * @returns {Promise} A promise that resolves to the query results or an error.
   */
  queryWithValues(queryString, values) {
    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .getConnection()
        .then(function (connection) {
          // Execute the query with parameterized values using the obtained connection
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

  /**
   * Execute an update query on the MySQL database.
   * @param {string} queryString - The SQL update query string to execute.
   * @returns {Promise} A promise that resolves to the query results or an error.
   */
  update(queryString) {
    return this.query(queryString);
  }

  /**
   * Execute a delete query on the MySQL database.
   * @param {string} queryString - The SQL delete query string to execute.
   * @returns {Promise} A promise that resolves to the query results or an error.
   */
  delete(queryString) {
    return this.query(queryString);
  }
}

module.exports = MySQLDatabase;