// NOT TESTED

/** 
const { Client } = require("pg");
const Database = require('./Database');


/**
 * A class representing a connection to a Postgres database.
 * @extends Database
 */
/** 
class PostgresDatabase extends Database {
  /**
   * Creates a new PostgresDatabase instance.
   *
   * @param {string} host - The database host.
   * @param {string} port - The database port.
   * @param {string} database - The name of the database to connect to.
   * @param {string} user - The username for the database connection.
   * @param {string} password - The password for the database connection.
   */
  /** 
  constructor(host, port, database, user, password) {
    super();
    this.host = host;
    this.port = port;
    this.database = database;
    this.user = user;
    this.password = password;
  }

  /**
   * Opens a connection with the Postgres database.
   *
   * @returns {Promise<Connection>} A promise that resolves to the opened connection.
   */
  /** 
  connect() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      // Create a new client instance

      const client = new Client({
        host: thisInstance.host,
        port: thisInstance.port,
        database: thisInstance.database,
        user: thisInstance.user,
        password: thisInstance.password,
      });

      // Connect to the database
      client.connect(function (err) {
        if (err) {
          reject(err);
        } else {
          thisInstance.connection = client;
          resolve(thisInstance.connection);
        }
      });
    });
  }

  /**
   * Gets the connection with the database.
   *
   * @returns {Promise<Connection>} A promise that resolves to the connection.
   */
  /** 
  getConnection() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      if (thisInstance.connection) {
        resolve(thisInstance.connection);
      } else {
        reject(null);
      }
    });
  }

  /**
   * Closes the connection with the Postgres database.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the connection was successfully closed.
   */
  /** 
  disconnect() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      // Close the connection
      if (thisInstance.connection) {
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
   * Executes a query against the Postgres database.
   *
   * @param {string} query - The query to execute.
   * @returns {Promise<ResultSet>} A promise that resolves to the result set of the query.
   */
  /** 
  query(queryString) {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      // Execute the query
      thisInstance.connection.query(queryString, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  }
  /**
   * Updates records in the specified table that match the provided filter.
   * @param {string} query - The query to execute.
   * @param {Array} [params] - Optional parameters to use with the query.
   * @returns {Promise} - A promise that resolves with the result of the update operation.
   */
  /** 
  update(queryString, params) {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      thisInstance.getConnection()
        .then(function (connection) {
          connection.query(queryString, params, function (error, result) {
            connection.release();
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  /**
   * Deletes records from the specified table that match the provided filter.
   * @param {string} query - The query to execute.
   * @param {Array} [params] - Optional parameters to use with the query.
   * @returns {Promise} - A promise that resolves with the result of the delete operation.
   */
  /** 
  delete(queryString, params) {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      thisInstance
        .getConnection()
        .then(function (connection) {
          connection.query(queryString, params, function (error, result) {
            connection.release();
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}

module.exports = PostgresDatabase;
 */