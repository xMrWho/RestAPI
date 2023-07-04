const getRelationship = require("./get");
/**
 * Determines if a relationship exists in the given database.
 *
 * @param {object} database - The main database.
 * @param {object} usedDatabase - The used database.
 * @param {object} params - The parameters for the relationship.
 * @param {string} params.id - The ID of the relationship.
 * @param {string} params.partner1 - The first partner in the relationship.
 * @param {string} params.partner2 - The second partner in the relationship.
 * @returns {boolean} - True if the relationship exists, false otherwise.
 */
module.exports = function exists(database, usedDatabase, params) {
  return new Promise(async function (resolve, reject) {
    if (params?.id && params?.partner1 && params?.partner2) {
      const relationshipExistsId = await getRelationship(
        database,
        usedDatabase,
        { id: params?.id }
      );
      const relationshipExistsPartners = await getRelationship(
        database,
        usedDatabase,
        { partner1: params?.partner1, partner2: params.partner2 }
      );

      if (
        relationshipExistsId &&
        relationshipExistsId.data &&
        relationshipExistsId.data.length > 0
      ) {
        resolve(true);
      } else if (
        relationshipExistsPartners &&
        relationshipExistsPartners.data &&
        relationshipExistsPartners.data.length > 0
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
    } else if (params?.id) {
      const relationshipExistsId = await getRelationship(
        database,
        usedDatabase,
        { id: params?.id }
      );
      if (
        relationshipExistsId &&
        relationshipExistsId.data &&
        relationshipExistsId.data.length > 0
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
    } else if (params?.partner1 && params?.partner2) {
      const relationshipExistsPartners = await getRelationship(
        database,
        usedDatabase,
        { partner1: params?.partner1, partner2: params.partner2 }
      );
      if (
        relationshipExistsPartners &&
        relationshipExistsPartners.data &&
        relationshipExistsPartners.data.length > 0
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
    }

    resolve(false);
  });
};
