const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

module.exports = function getPerson(database, usedDatabase, personId) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          /**           const params = {
                      database: database,
                      collectionName: "persons",
                      queryOperation: "findOne",
                      parametersToUse: { id: personId },
                      errorMessage: "Error getting person with id " + personId,
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
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "findOne",
            parametersToUse: { id: personId },
            errorMessage: "Error getting person with id " + personId,
            successMessage: "Successfully got person list",
          };

          const response = await sqlOperationQuery(params);
          resolve({
            data: response.result,
          });
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
        break;
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
