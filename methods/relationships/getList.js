module.exports = function getRelationshipList(database, usedDatabase, parameters) {
    return new Promise(async function (resolve, reject) {
      try {
        switch (usedDatabase) {
          case "MongoDB": {
            resolve({ error: "Not implemented yet" });
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
          }
          default: {
            resolve({ error: "Not implemented yet" });
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
  