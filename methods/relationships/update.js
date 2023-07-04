const ifRelationshipExists = require("./exists");

/**
 * Updates a relationship in the database.
 *
 * @param {object} database - the main database object
 * @param {string} usedDatabase - the type of database being used (e.g. "MongoDB", "MySQL")
 * @param {object} parameters - the parameters for the update operation
 * @param {string} parameters.id - the ID of the relationship to be updated
 * @param {string} parameters.partner01 - the ID of the first partner
 * @param {string} parameters.partner02 - the ID of the second partner
 * @param {string} parameters.relationship_type - the type of relationship
 * @param {string} parameters.information - additional information about the relationship
 * @return {Promise} a promise that resolves with the result of the update operation
 */
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
  