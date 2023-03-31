const { MongoClient } = require("mongodb");
const Database = require("./Database");

class MongoDBDatabase extends Database {
  constructor(config) {
    super();
    const connectionString = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
    this.databaseUrl = connectionString;
    this.databaseName = config.databaseName;
    this.client = null;
    this.db = null;
  }

  /**
   * Opens a connection with the database.
   *
   * @returns {Promise<MongoClient>} A promise that resolves to the opened client.
   */
  connect() {
    const thisInstance = this;
    if (thisInstance.client) {
      return thisInstance.client;
    }

    return new Promise(async function (resolve, reject) {
      try {
        thisInstance.client = await MongoClient.connect(
          thisInstance.databaseUrl
        );
        thisInstance.db = thisInstance.client.db(thisInstance.databaseName);
        return thisInstance.client;
      } catch (err) {
        reject(err);
      }
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
      if (thisInstance.client && thisInstance.client.isConnected()) {
        resolve(true);
      }
      resolve(false);
    });
  }

  /**
   * Gets the connection with the database.
   *
   * @returns {Promise<Db>} A promise that resolves to the database object.
   */
  getConnection() {
    const thisInstance = this;
    return new Promise(function (resolve, reject) {
      try {
        if (thisInstance.db) {
          resolve(thisInstance.db);
        } else {
          thisInstance.connect().then(async function (client) {
            thisInstance.db = client.db(thisInstance.databaseName);
            resolve(thisInstance.db);
          });
        }
      } catch (error) {
        reject(err);
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
      if (thisInstance.client) {
        try {
          await thisInstance.client.close();
          thisInstance.client = null;
          thisInstance.db = null;
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  /**
   * Executes a query.
   *
   * @param {string} query - The query to execute.
   * @returns {Promise<Array>} A promise that resolves to the result set of the query.
   */
  query(queryString) {
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      try {
        const db = await thisInstance.getConnection();
        const result = await db
          .collection("collectionName")
          .find(queryString)
          .toArray();
        resolve(result);
      } catch (error) {
        reject(err);
      }
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
      try {
        const db = await thisInstance.getConnection();
        const result = await db
          .collection("collectionName")
          .updateMany(queryString);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Deletes one or more documents from the specified collection
   * that match the provided filter.
   *
   * @param {string} collectionName - The name of the collection.
   * @param {object} filter - The filter used to select the documents to delete.
   * @returns {Promise} - A promise that resolves with the result of the delete operation.
   */
  delete(collectionName, filter) {
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      try {
        const db = await thisInstance.getConnection();
        const collection = db.collection(collectionName);
        const res = await collection.deleteMany(filter);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Aggregates documents using the specified pipeline.
   *
   * @param {string} collectionName - The name of the collection.
   * @param {Array} pipeline - An array of pipeline stages.
   * @returns {Promise} - A promise that resolves with the result of the aggregate operation.
   */
  aggregate(collectionName, pipeline) {
    const thisInstance = this;
    return new Promise(async function (resolve, reject) {
      try {
        const db = await thisInstance.getConnection();
        const collection = db.collection(collectionName);
        const res = collection.aggregate(pipeline).toArray();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = MongoDBDatabase;
