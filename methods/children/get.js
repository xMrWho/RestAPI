const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

module.exports = function getChild(database, usedDatabase, personId) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
        }
        case "MySQL": {
          //not tested
          const sqlString = "SELECT * FROM children WHERE person_id =" + personId; 
          const response = await database.query(sqlString);
            console.log("SQL Query Response:", response);
          resolve({
            data: response,
          });
        }
        default: {
          resolve({ error: "Not implemented yet" });
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
