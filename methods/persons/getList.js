const sqlOperationQuery = require("../mySqlOperationQuery");

module.exports = function getPersonList(database, usedDatabase) {
/**
 * Retrieves a list of persons from the specified database.
 *
 * @param {Object} database - The database object.
 * @param {string} usedDatabase - The name of the used database.
 * @return {Promise} A promise that resolves to an object containing the list of persons or an error message.
 */
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          /**           
           * const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "find",
            parametersToUse: {},
            errorMessage: "Error getting person list",
            successMessage: "Successfully got person list",
          };

          const response = await mongoOperationQuery(params);
          if (response.error) {
            resolve(response);
          }

          resolve({
            data: response,
          }); */

          resolve({ error: "Not implemented yet" });
          break;
        }
        //working
        case "MySQL": {
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "findAll",
            parametersToUse: {},
            errorMessage: "Error getting person list",
            successMessage: "Operation was successful"
          };
          const response = await sqlOperationQuery(params);

          if (Array.isArray(response.result)) {
            resolve({
              data: response.result,
            });
          }
          resolve({
            error: "Error retrieving data from database",
            msg: response.message,
            stack: response.stack,
          });
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (error) {
      resolve({
        error: "An Error occurred while getting the person list from database",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
