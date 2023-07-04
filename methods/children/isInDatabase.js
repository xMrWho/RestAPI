/**
 * Determines if the given parameters are in the specified database.
 *
 * @param {object} database - The database object.
 * @param {string} usedDatabase - The name of the used database.
 * @param {array} parameters - The parameters to check in the database.
 * @return {Promise} A promise that resolves with a boolean indicating if the parameters are in the database.
 */
module.exports = function isInDatabase(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    switch (usedDatabase) {
      case "MongoDB": {
        resolve({ error: "Not implemented yet" });
        break;
      }
      case "MySQL": {
        const sql = "SELECT * FROM children WHERE person_id = ?";
        const result = await database.query(sql, parameters.person_id);
        console.log("isInDatabase", result);
        if (result.length > 0) {
          resolve(true);
        }

        break;
      }
      default: {
        resolve({ error: "Not implemented yet" });
        break;
      }
    }

    resolve(false);
  });
};
