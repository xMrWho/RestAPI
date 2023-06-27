const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

module.exports = function getRelationship(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          const params = {
            database: database,
            collectionName: "relationships",
            queryOperation: "findOne",
            parametersToUse: { id: relationShipId },
            errorMessage: "Error getting relationship with id " + relationShipId,
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
          //working
          if(parameters.id) {
            const params = {
              database: database,
              collectionName: "relationships",
              queryOperation: "findOne",
              parametersToUse: { id: parameters.id },
              errorMessage: "Error getting relationship with id " + personId,
              successMessage: "Successfully got relationship",
            };
  
            const response = await sqlOperationQuery(params);
            resolve({
              data: response.result,
            });
          }
          if(parameters.partner01, parameters.partner02) {
            const params = {
              database: database,
              collectionName: "relationships",
              queryOperation: "findWithParms",
              parametersToUse: { partner01: parameters.partner01 },
              errorMessage: "Error getting relationship with id " + personId,
              successMessage: "Successfully got relationship",
            };
  
            const response = await sqlOperationQuery(params);
            resolve({
              data: response.result,
            });
          }


          
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
