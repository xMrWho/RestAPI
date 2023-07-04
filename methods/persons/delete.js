const sqlOperationQuery = require("../mySqlOperationQuery");
const ifPersonExists = require("./exists");


module.exports = function deletePerson(database, usedDatabase, personId) {
  return new Promise(async function (resolve, reject) {

    const existsPerson = await ifPersonExists(
      database,
      usedDatabase,
      personId
    );

    if(!existsPerson) {
      resolve({ error: "The person with the ID " + id + " does not exists!"});
    }

    try {
      switch (usedDatabase) {
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "delete",
            parametersToUse: {
              id: personId,
            },
            errorMessage: "Error deleting the person",
            successMessage: "Operation was successful",
          };

          const response = await sqlOperationQuery(params);
          if (response?.result) {
            resolve({
              data: response,
            });
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: response?.message,
              stack: response?.stack,
            });
          }
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (error) {
      resolve({
        error: "An Error occurred while trying to delete the person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
