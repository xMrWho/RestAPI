const getRelationship = require("./get");
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
