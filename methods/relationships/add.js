const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");
const ifRelationshipExists = require("./exists");

module.exports = function addRelationship(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    const partner1 = parameters?.person_id;
    const partner2 = parameters?.partner_id;
    const generatedUUID = uuid.v4();

    const params = {
      database: database,
      collectionName: "persons",
      queryOperation: "insert",
      parametersToUse: {
        id: generatedUUID,
        person_id: parameters?.person_id,
        partner_id: parameters?.partner_id || null,
        relationship_type: parameters?.relationship_type || "Other",
        information: parameters?.information || "",
      },
      errorMessage: "Error inserting the new relationship",
      successMessage: "Operation was successful",
    };

    try {
      switch (usedDatabase) {
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          const existsRelationship = await ifRelationshipExists(
            database,
            usedDatabase,
            {
              partner1: partner1,
              partner2: partner2,
              id: generatedUUID,
            }
          );

          if (existsRelationship) {
            resolve({
              error: "This relationship already exists!",
            });
          }

          const response = await sqlOperationQuery(params);
          resolve({
            data: response.result,
          });
          break;
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
