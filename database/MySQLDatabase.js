const mysql = require("mysql");

/**
 * Class for interacting with a MySQL database using the mysql package.
 */
class MySQLDatabase {
  /**
   * Creates a new MySQLDatabase instance with the given configuration.
   *
   * @param {Object} config - Configuration options for the MySQL database.
   * @param {string} config.host - Hostname of the MySQL server.
   * @param {string} config.user - Username for the MySQL server.
   * @param {string} config.password - Password for the MySQL server.
   * @param {string} config.database - Name of the MySQL database to use.
   * @param {number} [config.port=3306] - Port number to use for the MySQL server.
   */
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  /**
   * Opens a connection to the MySQL database.
   *
   * @returns {Promise<mysql.Connection>} A Promise that resolves with the connection object when the connection is successfully opened.
   */
  connect() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      if (
        thisInstance.connection &&
        thisInstance.connection.state !== "disconnected"
      ) {
        return resolve(this.connection);
      }

      thisInstance.connection = mysql.createConnection(thisInstance.config);

      thisInstance.connection.connect(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(thisInstance.connection);
        }
      });
    });
  }

  /**
   * Checks if the connection to the MySQL database is open.
   *
   * @returns {Promise<boolean>} A Promise that resolves with true if the connection is open, or false otherwise.
   */
  checkConnection() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      if (
        thisInstance.connection &&
        thisInstance.connection.state !== "disconnected"
      ) {
        return resolve(true);
      }

      reject(false);
    });
  }

  /**
   * Gets the connection with the database.
   *
   * @returns {Promise<Connection>} A promise that resolves to the connection.
   */
  getConnection() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      resolve(thisInstance.connection);
    });
  }

  /**
   * Closes the connection to the MySQL database.
   *
   * @returns {Promise<boolean>} A Promise that resolves with true if the connection was successfully closed, or false otherwise.
   */
  disconnect() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      if (
        !thisInstance.connection ||
        thisInstance.connection.state === "disconnected"
      ) {
        return resolve(false);
      }

      thisInstance.connection.end(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Executes a query against the MySQL database and returns the result set.
   *
   * @param {string} query - The SQL query to execute.
   * @returns {Promise<Array>} A Promise that resolves with the result set of the query.
   */
  query(query) {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      thisInstance
        .checkConnection()
        .then(function (isConnected) {
          if (!isConnected) {
            reject(false);
          }
          thisInstance.connection.query(query, function (err, results, fields) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  /**
   * Updates records in the specified table that match the provided filter.
   *
   * @param {string} tableName - The name of the table.
   * @param {object} filter - The filter used to select the records to update.
   * @param {object} update - The update operation to apply to the selected records.
   * @returns {Promise} - A promise that resolves with the result of the update operation.
   */
  update(tableName, filter, update) {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      thisInstance.checkConnection().then(function (isConnected) {
        if (!isConnected) {
          reject(false);
        }
        const query = `UPDATE ${tableName} SET ? WHERE ?`;
        return thisInstance.connection.query(query, [update, filter]);
      });
    });
  }

  /**
   * Inserts a new record into the specified table.
   *
   * @param {string} tableName - The name of the table.
   * @param {object} data - The data to insert into the table.
   * @returns {Promise} - A promise that resolves with the result of the insert operation.
   */
  insert(tableName, data) {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      thisInstance
        .checkConnection()
        .then(function (isConnected) {
          if (!isConnected) {
            reject(false);
          }
          const query = `INSERT INTO ${tableName} SET ?`;
          return thisInstance.connection.query(query, data);
        })
        .then(function (result) {
          resolve(result);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  /**
   * Deletes records from the specified table that match the provided filter.
   *
   * @param {string} tableName - The name of the table.
   * @param {object} filter - The filter used to select the records to delete.
   * @returns {Promise} - A promise that resolves with the result of the delete operation.
   */
  delete(tableName, filter) {
    return this.connect().then(function (connection) {
      const query = `DELETE FROM ${tableName} WHERE ?`;
      return connection.query(query, filter);
    });
  }
}

module.exports = MySQLDatabase;
