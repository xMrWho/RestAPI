const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

module.exports = function getChildren(database, usedDatabase, rel_id) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
        }
        case "MySQL": {
          //working
          const params = {
            database: database,
            collectionName: "children",
            queryOperation: "findWithParms",
            parametersToUse: { rel_id: rel_id},
            errorMessage: "Error getting child with rel_id " + rel_id,
            successMessage: "Successfully got person list",
          };

          const response = await sqlOperationQuery(params);
          resolve({
            data: response.result,
          });
        }
        default: {
          resolve({ error: "Not implemented yet" });
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
