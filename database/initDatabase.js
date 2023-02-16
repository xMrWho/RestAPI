module.exports = function initDatabase(databaseToUse, databaseConfig) {
  const usedDatabaseClass = require("./" + databaseToUse + "Database");
  if (usedDatabaseClass !== "MongoDB") {
    const db = new usedDatabaseClass(databaseConfig);
    return db;
  }
  throw new Error("Method not implemented");
};
