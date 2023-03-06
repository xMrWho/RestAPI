module.exports = function initDatabase(databaseToUse, databaseConfig) {
  const usedDatabaseClass = require("./" + databaseToUse + "Database");
  const initDatabaseFunction = require("./methods/init" +
    databaseToUse +
    "Database");

  if (
    (usedDatabaseClass === "MongoDB" || usedDatabaseClass === "MySQL",
    usedDatabaseClass === "Postgres")
  ) {
    const db = new usedDatabaseClass(databaseConfig);
    return db.connect().then(async function () {
      await initDatabaseFunction(db);
      return db;
    });
  } else {
    throw new Error("Method not implemented");
  }
};
