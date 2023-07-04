module.exports = function deleteRelationship(database, usedDatabase, parameters) {
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
              queryOperation: "delete",
              parametersToUse: {
                id: personId,
              },
              errorMessage: "Error deleting the relationship",
              successMessage: "Operation was successful",
            };
  
            const response = await sqlOperationQuery(params);
            if (response?.result) {
              resolve({
                data: response,
              });
              break;
            } else {
              resolve({
                error: "Error retrieving data from database",
                msg: response?.message,
                stack: response?.stack,
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
          error: "Error retrieving data from database",
          msg: error.message,
          stack: error.stack,
        });
      }
    });
  };
  