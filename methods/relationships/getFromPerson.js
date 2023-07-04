require('../utils/arrayUtils');

/**
 * Retrieves relationships from a person in the database.
 *
 * @param {Object} database - The database object.
 * @param {string} usedDatabase - The type of database used.
 * @param {Object} parameters - The parameters for the query.
 * @param {number} parameters.personId - The ID of the person.
 * @return {Promise} A promise that resolves to an object with the queried relationships.
 */
module.exports = function getRelationshipsFromPerson(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          //working
          if (parameters.personId) {
            const responsePersonId = await database.query("SELECT * FROM relationships WHERE person_id = " +
            parameters.personId);
            const responsePartnerId = await database.query("SELECT * FROM relationships WHERE partner_id = " +
            parameters.personId);
            console.log("SQL Query Response person_id:", responsePersonId);
            console.log("SQL Query Response partner_id:", responsePartnerId);
            const response = responsePersonId.concat(responsePartnerId).unique(); 

            resolve({
              data: response,
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
