/**
 * Retrieves the children from the specified database based on the used database type and the relationship ID.
 *
 * @param {string} database - The name of the database.
 * @param {string} usedDatabase - The type of database used (e.g., "MongoDB", "MySQL").
 * @param {number} rel_id - The relationship ID.
 * @return {Promise} A Promise that resolves to an object containing the retrieved data or an error object.
 */
module.exports = function getChildren(database, usedDatabase, rel_id) {
  return new Promise(function (resolve, reject) {
    switch (usedDatabase) {
      case "MongoDB": {
        resolve({ error: "Not implemented yet" });
        break;
      }
      case "MySQL": {
        const params = {
          database: database,
          collectionName: "children",
          queryOperation: "findWithParms",
          parametersToUse: { rel_id: rel_id },
          errorMessage: "Error getting child with rel_id " + rel_id,
          successMessage: "Successfully got person list",
        };
        sqlOperationQuery(params)
          .then(function (response) {
            resolve({ data: response.result });
          })
          .catch(function(error) {
            reject({
              error: "An Error occurred",
              msg: error.message,
              stack: error.stack,
            });
          });
        break;
      }
      default: {
        resolve({ error: "Not implemented yet" });
        break;
      }
    }
  });
};
