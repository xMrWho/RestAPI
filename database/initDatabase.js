/**
 * Initializes the database based on the specified database type and configuration.
 * 
 * @param {string} databaseToUse - The type of database to use (e.g., MySQL, MongoDB, Postgres).
 * @param {object} databaseConfig - The configuration object for the database.
 * @returns {Promise} A promise that resolves to the initialized database object.
 * @throws {Error} If the specified database type is not implemented.
 */
module.exports = function initDatabase(databaseToUse, databaseConfig) {
  // Require the appropriate database class based on the specified database type
  const usedDatabaseClass = require("./" + databaseToUse + "Database");
  
  // Require the appropriate initialization function based on the specified database type
  const initDatabaseFunction = require("./methods/init" + databaseToUse + "Database");
  
  // Check if the specified database type is one of the supported types (MySQL, MongoDB, Postgres)
  if (databaseToUse === "MySQL" || databaseToUse === "MongoDB" || databaseToUse === "Postgres") {
    // Create a new instance of the database class with the provided configuration
    const db = new usedDatabaseClass(databaseConfig);
    
    // Check if the database connection is already established
    if (db.checkConnection() == true) {
      console.log("Connected already");
      
      // Initialize the database using the appropriate initialization function
      return initDatabaseFunction(db).then(function() {
        return db;
      });
    }
    
    // Connect to the database and initialize it asynchronously
    return db.connect().then(async function (response) {
      await initDatabaseFunction(db);
      return db;
    });
  } else {
    // Throw an error if the specified database type is not implemented
    throw new Error("Method not implemented " + databaseToUse);
  }
};