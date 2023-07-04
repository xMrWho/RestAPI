const sqlOperationQuery = require("../mySqlOperationQuery");
require('../utils/arrayUtils');

/**
 * Retrieves relationship data from the specified database based on the given parameters.
 *
 * @param {string} database - The name of the database to retrieve data from.
 * @param {string} usedDatabase - The type of database being used (e.g. MongoDB, MySQL).
 * @param {Object} parameters - The parameters used to query the relationships.
 * @param {string} parameters.id - The ID of the relationship to retrieve (optional).
 * @param {string} parameters.partner01 - The ID of the first partner in the relationship (optional).
 * @param {string} parameters.partner02 - The ID of the second partner in the relationship (optional).
 * @return {Promise} A promise that resolves to the retrieved relationship data.
 */
module.exports = function getRelationship(database, usedDatabase, parameters) {
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
          if (parameters.id) {
            const params = {
              database: database,
              collectionName: "relationships",
              queryOperation: "findOne",
              parametersToUse: { id: parameters.id },
              errorMessage: "Error getting relationship with id " + parameters.id,
              successMessage: "Successfully got relationship",
            };

            const response = await sqlOperationQuery(params);
            resolve({
              data: response.result,
            });
          }
          if (parameters.partner01 && parameters.partner02) {
            const params01 = {
              database: database,
              collectionName: "relationships",
              queryOperation: "findWithParms",
              parametersToUse: { person_id: parameters.partner01, partner_id: parameters.partner02 },
              errorMessage:
                "Error getting relationship with partners " +
                parameters.partner01 +
                " & " +
                parameters.partner02,
              successMessage: "Successfully got relationship",
            };

            const params02 = {
              database: database,
              collectionName: "relationships",
              queryOperation: "findWithParms",
              parametersToUse: { person_id: parameters.partner02, partner_id: parameters.partner01 },
              errorMessage:
                "Error getting relationship with partners " +
                parameters.partner01 +
                " & " +
                parameters.partner02,
              successMessage: "Successfully got relationship",
            };

            const response01 = await sqlOperationQuery(params01);
            const response02 = await sqlOperationQuery(params02);
            //CONCAT HERE
            resolve({
              data: response01.result.concat(response02.result).unique(),
            });
            break;
          }
          else if(parameters.partner01 && !parameters.partner02) {
            const params = {
              database: database,
              collectionName: "relationships",
              queryOperation: "findWithParms",
              parametersToUse: { person_id: parameters.partner01},
              errorMessage:
                "Error getting relationship with partners " +
                parameters.partner01 +
                " & " +
                parameters.partner02,
              successMessage: "Successfully got relationship",
            };
            const response = await sqlOperationQuery(params);
            resolve({
              data: response.result,
            });
            break;
          }
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
        }
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
