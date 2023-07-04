/**
 * Checks if a person exists in the given database.
 *
 * @param {object} database - The database object.
 * @param {string} usedDatabase - The name of the used database.
 * @param {string} usedId - The ID of the person to check.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the person exists.
 */
module.exports = function ifPersonExists(database, usedDatabase, usedId) {
  const getPerson = require("./get");

  return new Promise(async function (resolve, reject) {
    const personExists = await getPerson(database, usedDatabase, usedId);

    if (personExists && personExists.data && personExists.data.length > 0) {
      resolve(true);
    }

    resolve(false);
  });
};
