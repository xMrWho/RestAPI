const sqlOperationQuery = require("../mySqlOperationQuery");
const ifRelationshipExists = require("./exists");

module.exports = function addRelationship(database, usedDatabase, parameters) {
/**
 * Adds a relationship to the database.
 *
 * @param {string} database - The name of the database.
 * @param {string} usedDatabase - The type of database being used (e.g., "MongoDB", "MySQL").
 * @param {object} parameters - The parameters for the relationship.
 * @param {string} parameters.person_id - The ID of the person.
 * @param {string} parameters.partner_id - The ID of the partner.
 * @param {string} parameters.relationship_type - The type of relationship (default: "Other").
 * @param {string} parameters.information - Additional information (default: "").
 * @return {Promise<Object>} A Promise that resolves to an object with the result of the operation.
 */
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
