const sqlOperationQuery = require("../mySqlOperationQuery");
const ifChildExists = require("./exists");

module.exports = function deleteChild(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    const childExists = await ifChildExists(
      database,
      usedDatabase,
      parameters?.rel_id,
      parameters?.person_id
    );

    if (childExists) {
      resolve({
        error: "This Child already exists in this relationship!",
      });
    }

    try {
      switch (usedDatabase) {
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          const sqlString = "DELETE FROM children WHERE rel_id='" + parameters?.rel_id + "'";
          const response = await database.query(sqlString);
          console.log("SQL Query Response:", response);
          if (response) {
            resolve({
              data: response,
            });
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: response?.message,
              stack: response?.stack,
            });
          }
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (error) {
      resolve({
        error: "An Error occurred while trying to delete the person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
