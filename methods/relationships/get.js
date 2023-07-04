const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

module.exports = function getRelationship(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          /**           const params = {
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
          }); */
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
