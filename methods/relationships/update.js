const ifRelationshipExists = require("./exists");

module.exports = function updateRelationship(database, usedDatabase, parameters) {
    return new Promise(async function (resolve, reject) {
      if(!parameters.id) {
        resolve({
          error: "Parameter id is missing",
        });
      }


      const relationshipExists = await ifRelationshipExists(
        database,
        usedDatabase,
        parameters.id
      )

      if (!relationshipExists) {
        resolve({
          error: "The relationship with the ID " + id + " does not exists!",
        });
      }


      try {
        switch (usedDatabase) {
          case "MongoDB": {
            resolve({ error: "Not implemented yet" });
          }
          case "MySQL": {
            const params = {
              database: database,
              collectionName: "relationships",
              queryOperation: "update",
              parametersToUse: {
                id: parameters?.id,
                person_id: parameters?.partner01,
                partner_id: parameters?.partner02,
                relationship_type: parameters?.relationship_type,
                information: parameters?.information,
              },
              errorMessage: "Error updating the person",
              successMessage: "Operation was successful",
            };
  
            const response = await sqlOperationQuery(params);
            if (response?.result) {
              response.result.generatedPersonId = generatedUUID;
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
  