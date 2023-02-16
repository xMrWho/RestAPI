const { MongoClient } = require("mongodb");

class MongoDBDatabase extends Database {
  constructor(databaseUrl, databaseName) {
    super();
    this.databaseUrl = databaseUrl;
    this.databaseName = databaseName;
    this.client = null;
    this.db = null;
  }

  /**
   * Opens a connection with the database.
   *
   * @returns {Promise<MongoClient>} A promise that resolves to the opened client.
   */
  async connect() {
    if (this.client) {
      return this.client;
    }

    try {
      this.client = await MongoClient.connect(this.databaseUrl);
      this.db = this.client.db(this.databaseName);
      return this.client;
    } catch (err) {
      throw new Error(`Error connecting to MongoDB: ${err.message}`);
    }
  }

  /**
   * Checks if a connection is open with the database.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the connection is open.
   */
  async checkConnection() {
    if (this.client && this.client.isConnected()) {
      return true;
    }
    return false;
  }

  /**
   * Gets the connection with the database.
   *
   * @returns {Promise<Db>} A promise that resolves to the database object.
   */
  async getConnection() {
    if (this.db) {
      return this.db;
    }

    try {
      await this.connect();
      return this.db;
    } catch (err) {
      throw new Error(`Error getting database connection: ${err.message}`);
    }
  }

  /**
   * Closes the connection with the database.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the connection was successfully closed.
   */
  async disconnect() {
    if (this.client) {
      try {
        await this.client.close();
        this.client = null;
        this.db = null;
        return true;
      } catch (err) {
        throw new Error(`Error closing database connection: ${err.message}`);
      }
    }
    return false;
  }

  /**
   * Executes a query.
   *
   * @param {string} query - The query to execute.
   * @returns {Promise<Array>} A promise that resolves to the result set of the query.
   */
  query(queryString) {
    return new Promise(async function (resolve, reject) {
      try {
        const db = await this.getConnection();
        const result = await db.collection('collectionName').find(queryString).toArray();
        resolve(result);
      } catch (err) {
        throw new Error(`Error executing query: ${err.message}`);
      }
    })

  }

  /**
   * Updates records in the specified table that match the provided filter.
   * @param {string} query - The query to execute.
   * @returns {Promise} - A promise that resolves with the result of the update operation.
   */
  update(queryString) {
    return new Promise(async function (resolve, reject) {
      try {
        const db = await this.getConnection();
        const result = await db.collection('collectionName').updateMany(queryString);
        resolve(result);
      } catch (err) {
        throw new Error(`Error updating records: ${err.message}`);
      }
    })
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
    return new Promise(async function (resolve, reject) {
      try {
        const db = await this.getConnection();
        const collection = db.collection(collectionName);
        const res = await collection.deleteMany(filter);
        resolve(res);
      } catch (err) {
        throw new Error(`Error updating records: ${err.message}`);
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
    return new Promise(async function (resolve, reject) {
      try {
        const db = await this.getConnection();
        const collection = db.collection(collectionName);
        const res = collection.aggregate(pipeline).toArray();
        resolve(res);
      }
      catch (err) {
        throw new Error(`Error aggegating records: ${err.message}`);
      }
    });
  }
}











/**
 * Class that simplifies connecting to a MongoDB database
 */
class MongoDBDatabase {
  /**
   * Creates a new MongoDBDatabase instance
   * @param {string} url - The URL of the MongoDB database
   * @param {Object} [options] - Additional options for the MongoClient constructor
   */
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.client = null;
    this.db = null;
  }

  /**
   * Opens a connection to the MongoDB database
   * @returns {Promise} - A Promise that resolves with the MongoClient instance when the connection is established
   */
  connect() {
    if (this.client) {
      return Promise.resolve(this.client);
    }

    return MongoClient.connect(this.url, this.options).then(function (client) {
      this.client = client;
      this.db = client.db();
      return this.client;
    });
  }

  /**
   * Checks if a connection is open with the database.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the connection is open.
   */
  checkConnection() {
    return new Promise(function (resolve, reject) {
      // Check if the connection is open
      // ...

      // If successful, resolve with the result
      // Otherwise, reject with the error
      // ...
      throw new Error("Method not implemented");
    });
  }

  /**
   * Closes the connection to the MongoDB database
   * @returns {Promise} - A Promise that resolves when the connection is closed
   */
  disconnect() {
    if (this.client) {
      return this.client.close();
    }
    return Promise.resolve();
  }

  /**
   * Executes a MongoDB command
   * @param {string} command - The MongoDB command to execute
   * @param {Object} [options] - Additional options for the command
   * @returns {Promise} - A Promise that resolves with the result of the command
   */
  executeCommand(command, options) {
    return this.connect().then(function () {
      this.db.command(command, options);
    });
  }

  /**
   * Executes a MongoDB query
   * @param {string} collectionName - The name of the collection to query
   * @param {Object} query - The MongoDB query object
   * @param {Object} [options] - Additional options for the query
   * @returns {Promise} - A Promise that resolves with the result of the query
   */
  query(collectionName, query, options) {
    return this.connect().then(function () {
      this.db.collection(collectionName).find(query, options).toArray();
    });
  }

  /**
   * Inserts a document into a MongoDB collection
   * @param {string} collectionName - The name of the collection to insert the document into
   * @param {Object} document - The document to insert
   * @param {Object} [options] - Additional options for the insert
   * @returns {Promise} - A Promise that resolves with the result of the insert
   */
  insert(collectionName, document, options) {
    return this.connect().then(function () {
      this.db.collection(collectionName).insertOne(document, options);
    });
  }

  /**
   * Updates documents in a MongoDB collection
   * @param {string} collectionName - The name of the collection to update documents in
   * @param {Object} filter - The filter object that matches the documents to update
   * @param {Object} update - The update object to apply to the matched documents
   * @param {Object} [options] - Additional options for the update
   * @returns {Promise} - A Promise that resolves with the result of the update
   */
  update(collectionName, filter, update, options) {
    return this.connect().then(function () {
      this.db.collection(collectionName).updateMany(filter, update, options);
    });
  }


}

module.exports = MongoDBDatabase;
