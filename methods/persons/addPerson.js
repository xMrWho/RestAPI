const uuid = require("uuid");
const { ObjectId } = require("mongodb");

const mongoOperationQuery = require("../../methods/mongoOperationQuery");
const sqlOperationQuery = require("../../methods/mySqlOperationQuery");
const ifPersonExists = require("./ifPersonExists");

// Add a new person to the database
module.exports = function addPerson(database, usedDatabase, parameters) {
  return new Promise(async function (resolve) {
    try {
      const generatedUUID = uuid.v4();
      console.log("Generated id: ", generatedUUID);

      const params = {
        database: database,
        collectionName: "persons",
        queryOperation: "insert",
        parametersToUse: {
          id: generatedUUID,
          name: parameters?.name,
          middlename: parameters?.middlename,
          firstname: parameters?.firstname,
          gender: parameters?.gender,
          birthday: parameters?.birthday,
          deathday: parameters?.deathday,
          info: parameters?.info,
        },
        errorMessage: "Error inserting the new person",
        successMessage: "Operation was successful",
      };

      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          const objectId = new ObjectId();
          const existsPerson = await ifPersonExists(
            database,
            usedDatabase,
            objectId
          );
          console.log("existsPerson?", existsPerson);

          parameters.parametersToUse.id = objectId;
          const response = await mongoOperationQuery(params);
          //const response = await db.collection("persons").insertOne(parameters);

          if (response.error) {
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
          const existsPerson = await ifPersonExists(
            database,
            usedDatabase,
            generatedUUID
          );
          console.log("existsPerson?", existsPerson);
          const response = await sqlOperationQuery(params);
          console.log("TELL ME WHYYYYYYYYY", response);

          /**           
           * const result = await database.getConnection.query(
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
 */
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
