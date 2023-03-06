const uuid = require("uuid");
const { options } = require("../../routes/animals");
// Add a new person to the database
module.exports = function addPerson(database, usedDatabase, parameters) {
  const sqlStatement =
    "INSERT INTO persons (id, firstname, middlename, lastname, gender, birthday, deathday, info) VALUES " +
    "(?, ?, ?, ?, ?, ?, ?, ?)";

  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          const db = database.getConnection();
          operation = db.collection("persons").insertOne(parameters);
          const response = await operation;
          resolve({
            data: response,
          });
        }
        case "MySQL": {
          // You could also generate a random UUID here instead of null if desired
          const values = [
            (id = uuid.v4()),
            parameters.name,
            parameters.middlename,
            parameters.firstname,
            parameters.gender,
            parameters.birthday,
            parameters.deathday,
            data || null,
          ];

          const result = await database.getConnection.query(
            sql,
            values,
            function (error, results, fields) {
              if (error) {
                console.error(`Failed to add new person: ${error.message}`);
                return error;
              }
              console.log(
                `New person added successfully with ID ${results.insertId}`
              );

              return results;
            }
          );

          if (result.insertId) {
            resolve({
              data: response,
            });
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: response.message,
              stack: response.stack,
            });
          }
        }
        default: {
          operation = database.query(selectStatement);
          break;
        }
      }
    } catch (error) {
      resolve({
        error: "Error retrieving data from database",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
