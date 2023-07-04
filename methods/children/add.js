// Import required modules
const sqlOperationQuery = require("../mySqlOperationQuery");
const ifChildExists = require("./exists");

/**
 * Add a child to the specified database and collection.
 * 
 * @param {string} database - The name of the database.
 * @param {string} usedDatabase - The type of database being used (e.g., "MongoDB", "MySQL").
 * @param {object} parameters - The parameters required to add the child.
 * @returns {Promise} A promise that resolves with the result of the operation or an error message.
 */
module.exports = function addChild(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    // Check if the child already exists in the relationship
    const childExists = await ifChildExists(
      database,
      usedDatabase,
      parameters.rel_id
    );

    if (childExists) {
      // If the child already exists, return an error message
      resolve({
        error: "This Child already exists in this relationship!",
      });
    }

    try {
      switch (usedDatabase) {
        case "MongoDB": {
          // If MongoDB is used, return a message indicating that it is not implemented yet
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          // If MySQL is used, perform the insert operation
          const params = {
            database: database,
            collectionName: "children",
            queryOperation: "insert",
            parametersToUse: {
              rel_id: parameters?.rel_id,
              person_id: parameters?.person_id,
            },
            errorMessage: "Error inserting the new person",
            successMessage: "Operation was successful",
          };

          const response = await sqlOperationQuery(params);
          resolve({
            data: response.result,
          });
          break;
        }
        default: {
          // If an unsupported database is used, return a message indicating that it is not implemented yet
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (error) {
      // If an error occurs, return an error message with the error details
      resolve({
        error: "An Error occurred",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};