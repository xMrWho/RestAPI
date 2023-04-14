const uuid = require("uuid");
const mongoOperationQuery = require("../../methods/mongoOperationQuery");
const sqlOperationQuery = require("../../methods/mySqlOperationQuery");

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
          const response = await db.collection("persons").insertOne(parameters);
          
          if(response.error) {
            console.error(`Failed to add new person: ${response.error}`);
            resolve({
              error: "Error retrieving data from database",
              msg: response.error.message,
              stack: response.error.stack,
            });
          }

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
            parameters.info || null,
          ];

          const result = await database.getConnection.query(
            sql,
            values,
            function (error, results, fields) {
              if (error) {
                console.error(`Failed to add new person: ${error.message}`);
                return {
                  error: "Failed to add new person",
                  msg: error.message,
                  stack: error.stack,
                };
              }
              console.log(
                `New person added successfully with ID ${results.insertId}`
              );
              return results;
            }
          );

          if (result.insertId) {
            resolve({
              data: result,
            });
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: response?.message,
              stack: response?.stack,
            });
          }
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
      }
    } catch (error) {
      resolve({
        error: "An Error occurred while adding a new person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
