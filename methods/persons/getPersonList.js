const mongoOperationQuery = require("../mongoOperationQuery");
const sqlOperationQuery = require("../sqlOperationQuery");

module.exports = function getPersonList(database, usedDatabase) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          const params = {
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
          });
        }
        case "MySQL": {
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "findAll",
            parametersToUse: {},
            errorMessage: "Error getting person list",
          };
          const response = await sqlOperationQuery(params);
          if (Array.isArray(response)) {
            resolve({
              data: response,
            });
          }
          resolve({
            error: "Error retrieving data from database",
            msg: response.message,
            stack: response.stack,
          });
        }
        default: {
          resolve({ error: "Not implemented yet" });
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
