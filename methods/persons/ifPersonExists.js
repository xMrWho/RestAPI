module.exports = function ifPersonExists(database, usedDatabase, usedId) {
  const getPerson = require("./getPerson");

  return new Promise(async function (resolve, reject) {
    const personExists = await getPerson(database, usedDatabase, usedId);

    if (personExists && personExists.data && personExists.data.length > 0) {
      resolve(true);
    }

    resolve(false);
  });
};
