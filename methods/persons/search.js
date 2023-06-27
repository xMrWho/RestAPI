//const mongoOperationQuery = require("../mongoOperationQuery");
//const sqlOperationQuery = require("../mySqlOperationQuery");
const getPerson = require("./get");

module.exports = function searchPerson(database, usedDatabase, parameter) {
  return new Promise(async function (resolve, reject) {
    if (
      (parameter.firstname != null || !parameter.firstname.isEmpty()) &&
      (parameter.lastname != null || parameter.lastname.isEmpty())
    ) {
    }
    if (
      (parameter.firstname == null || parameter.firstname.isEmpty()) &&
      (parameter.lastname != null || !parameter.lastname.isEmpty())
    ) {
    }
    if (
      (parameter.firstname != null || !parameter.firstname.isEmpty()) &&
      (parameter.lastname == null || parameter.lastname.isEmpty())
    ) {
      if (!/^[a-zA-Z]+$/.test(parameter.firstname)) {
        throw new Error("First name and last name must contain only letters");
      } else {
        resolve({
          error: "An Error occurred",
          msg: "Can not read data correctly",
        });
      }
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
            resolve({ error: "Not implemented yet" });
        }
        case "MySQL": {
          const sqlString = "SELECT * FROM person WHERE firstname LIKE '%" + firstname + "%'";
          const x = await database.query(sqlString);
          console.log("XXXX", x);
          
         // resolve({
           // data: response.result,
         // });

          resolve({ error: "Not implemented yet" });
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
      }
    }
  });
};
