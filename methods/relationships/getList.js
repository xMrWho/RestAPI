/**
 * Retrieves a list of relationships from the specified database.
 *
 * @param {string} database - The name of the database to retrieve relationships from.
 * @param {string} usedDatabase - The type of database being used ("MongoDB" or "MySQL").
 * @param {object} parameters - Additional parameters to be used in the retrieval process.
 * @return {Promise} A Promise that resolves to an object containing the retrieved relationships or an error message.
 */
module.exports = function getRelationshipList(database, usedDatabase, parameters) {
    return new Promise(async function (resolve, reject) {
      try {
        switch (usedDatabase) {
          case "MongoDB": {
            resolve({ error: "Not implemented yet" });
            break;
          }
          case "MySQL": {
            const params = {
              database: database,
              collectionName: "relationships",
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
          error: "Error retrieving data from database",
          msg: error.message,
          stack: error.stack,
        });
      }
    });
  };
  