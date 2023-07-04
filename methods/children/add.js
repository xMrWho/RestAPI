const sqlOperationQuery = require("../mySqlOperationQuery");
const ifChildExists = require("./exists");

module.exports = function addChild(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {

    const childExists = await ifChildExists(
      database,
      usedDatabase,
      parameters.rel_id
    );

    if (childExists) {
      resolve({
        error: "This Child already exists in this relationship!",
      });
    }

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
            queryOperation: "insert",
            parametersToUse: {
              rel_id: parameters?.rel_id,
              gender: parameters?.gender,
              lastname: parameters?.lastname,
              middlename: parameters?.middlename,
              firstname: parameters?.firstname,
              gender: parameters?.gender || "Other",
              birthday: parameters?.birthday,
              deathday: parameters?.deathday,
              information: parameters?.information || "",
            },
            errorMessage: "Error inserting the new person",
            successMessage: "Operation was successful",
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
