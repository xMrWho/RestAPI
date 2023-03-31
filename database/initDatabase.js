module.exports = function initDatabase(databaseToUse, databaseConfig) {
  const usedDatabaseClass = require("./" + databaseToUse + "Database");
  const initDatabaseFunction = require("./methods/init" +
    databaseToUse +
    "Database");
  if (databaseToUse === "MySQL" || databaseToUse === "MongoDB" || databaseToUse === "Postgres") {
    const db = new usedDatabaseClass(databaseConfig);
    return db.connect().then(async function (response) {
      console.log('res', response);
      await initDatabaseFunction(db);
      return db;
    });
  } else {
    throw new Error("Method not implemented " + databaseToUse);
  }
};
