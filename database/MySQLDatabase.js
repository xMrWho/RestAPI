const mysql = require("mysql2");
const Database = require("./Database");

/**
 * Class for interacting with a MySQL database using the mysql package.
 */
class MySQLDatabase extends Database {
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
    config.port = config.port || 3306;

    super(config);

    this.config = config;
    this.connection = null;

  }

  /**
   * Opens a connection with the database.
   *
   * @returns {Promise<Connection>} A promise that resolves to the opened connection.
   */
  connect() {
    const thisInstance = this;
    const pool = mysql.createPool(this.config);
    return new Promise(function (resolve, reject) {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err);
        } else {
          thisInstance.connection = connection;
          resolve({message: 'Database connected'});
        }
      });
    });
  }

  /**
   * Checks if a connection is open with the database.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the connection is open.
   */
  checkConnection() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      if (
        thisInstance.connection &&
        thisInstance.connection.authorized
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
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
      if (
        thisInstance.connection &&
        thisInstance.connection.authorized
      ) {
        resolve(thisInstance.connection);
      } else {
        reject(new Error("Connection is not open"));
      }
    });
  }

  /**
   * Closes the connection with the database.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the connection was successfully closed.
   */
  disconnect() {
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      const isConnected = thisInstance.checkConnection();
      if (!isConnected) {
        reject(new Error("Not connected!"));
      }

      if (
        thisInstance.connection &&
        thisInstance.connection.state === "authenticated"
      ) {
        thisInstance.connection.end(function (err) {
          if (err) {
            reject(err);
          } else {
            thisInstance.connection = null;
            resolve(true);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Executes a query against the MySQL database and returns the result set.
   *
   * @param {string} query - The SQL query to execute.
   * @returns {Promise<ResultSet>} A Promise that resolves with the result set of the query.
   */
  query(query) {
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      const isConnected = thisInstance.checkConnection();
      if (!isConnected) {
        reject(new Error("Not connected!"));
      }

      const connection = await thisInstance.getConnection();
      connection.query(query, function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve({
            results: results,
            fields: fields,
          });
        }
      });
    });
  }

  /**
   * Updates records in the specified table that match the provided filter.
   * @param {string} query - The query to execute.
   * @returns {Promise} - A promise that resolves with the result of the update operation.
   */
  update(queryString) {
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      const isConnected = thisInstance.checkConnection();
      if (!isConnected) {
        reject(new Error("Not connected!"));
      }

      const connection = await thisInstance.getConnection();

      connection.query(queryString, function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve({
            results: results,
            fields: fields,
          });
        }
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
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      const isConnected = thisInstance.checkConnection();
      if (!isConnected) {
        reject(new Error("Not connected!"));
      }

      thisInstance.connection
        .query(query, filter)
        .then(function (result) {
          resolve(result);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

module.exports = MySQLDatabase;
