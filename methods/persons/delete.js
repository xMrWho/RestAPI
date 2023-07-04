const sqlOperationQuery = require("../mySqlOperationQuery");
const ifPersonExists = require("./exists");


/**
 * Deletes a person from the database.
 *
 * @param {Object} database - The main database object.
 * @param {string} usedDatabase - The type of database being used (either "MongoDB" or "MySQL").
 * @param {string} personId - The ID of the person to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion or rejects with an error.
 */
module.exports = function deletePerson(database, usedDatabase, personId) {
  // Return a new Promise to handle the asynchronous operation
  return new Promise(async function (resolve, reject) {
    // Check if the person exists in the database
    const existsPerson = await ifPersonExists(
      database,
      usedDatabase,
      personId
    );

    // If the person does not exist, resolve with an error message
    if (!existsPerson) {
      resolve({ error: "The person with the ID " + id + " does not exist!" });
    }

    try {
      // Handle different types of databases
      switch (usedDatabase) {
        case "MongoDB": {
          // Currently not implemented for MongoDB, so resolve with an error message
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          // Define parameters for the SQL operation
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "delete",
            parametersToUse: {
              id: personId,
            },
            errorMessage: "Error deleting the person",
            successMessage: "Operation was successful",
          };

          // Call the SQL operation query function and await the response
          const response = await sqlOperationQuery(params);

          // Check if the response was successful
          if (response?.result) {
            // If successful, resolve with the response data
            resolve({
              data: response,
            });
          } else {
            // If not successful, resolve with an error message and additional details
            resolve({
              error: "Error retrieving data from database",
              msg: response?.message,
              stack: response?.stack,
            });
          }
          break;
        }
        default: {
          // Currently not implemented for other databases, so resolve with an error message
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (error) {
      // If an error occurs during the deletion process, resolve with an error message and additional details
      resolve({
        error: "An Error occurred while trying to delete the person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
