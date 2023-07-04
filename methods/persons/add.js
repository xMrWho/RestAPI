const uuid = require("uuid");
const { ObjectId } = require("mongodb");

const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");
const ifPersonExists = require("./exists");

// Add a new person to the database
module.exports = function addPerson(database, usedDatabase, parameters) {
  return new Promise(async function (resolve) {
    try {
      const generatedUUID = uuid.v4();
      const existsPerson = await ifPersonExists(
        database,
        usedDatabase,
        generatedUUID
      );

      if (existsPerson) {
        resolve({
          error: "This Person already exists!",
        });
      }

      const params = {
        database: database,
        collectionName: "persons",
        queryOperation: "insert",
        parametersToUse: {
          id: generatedUUID,
          gender: parameters?.gender,
          lastname: parameters?.lastname,
          middlename: parameters?.middlename,
          firstname: parameters?.firstname,
          gender: parameters?.gender || "Other",
          birthday: parameters?.birthday,
          deathday: parameters?.deathday,
          information: parameters?.information || "",
        },
        errorMessage: "Error inserting the new person",
        successMessage: "Operation was successful",
      };

      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          /**           const objectId = new ObjectId();
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
          */
          resolve({ error: "Not implemented yet" });
        }
        //WORKING
        case "MySQL": {
          const response = await sqlOperationQuery(params);

          if (response?.result) {
            response.result.generatedPersonId = generatedUUID;
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
