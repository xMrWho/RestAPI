const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

/**
 * Retrieves a person from the specified database using the provided person ID.
 *
 * @param {string} database - The name of the database to retrieve the person from.
 * @param {string} usedDatabase - The type of database being used (e.g., "MongoDB", "MySQL").
 * @param {string} personId - The ID of the person to retrieve.
 * @return {Promise} A Promise that resolves with the person data or an error object.
 */
module.exports = function getPerson(database, usedDatabase, personId) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          //working
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "findOne",
            parametersToUse: { id: personId },
            errorMessage: "Error getting person with id " + personId,
            successMessage: "Successfully got person list",
          };

          const response = await sqlOperationQuery(params);
          resolve({
            data: response.result,
          });
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
        break;
      }
    } catch (error) {
      resolve({
        error: "An Error occurred",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
