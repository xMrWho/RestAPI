const ObjectID = require("mongodb").ObjectID;

const mongoOperationQuery = require("../../methods/mongoOperationQuery");
const sqlOperationQuery = require("../../methods/mySqlOperationQuery");

const getPerson = require("./getPerson");

module.exports = function updatePerson(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      const isPersonEvenExisting = await getPerson(
        database,
        usedDatabase,
        parameters.id
      );

      if(!isPersonEvenExisting?.data && !isPersonEvenExisting?.data.length > 0) {
        resolve({ error: "The person with the ID " + id + " does not exists!"});
      }

      if (isPersonEvenExisting.error) {
        resolve({ error: "This person does not exists" });
      }

      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          const db = database.getConnection();
          const response = await db.collection("persons").updateOne(
            {
              id: ObjectId(parameters.id),
            },
            { $set: { parameters } }
          );

          if (response.error) {
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

        //working
        case "MySQL": {
          const params = {
            database: database,
            collectionName: "persons",
            queryOperation: "update",
            parametersToUse: {
              id: parameters?.id,
              gender: parameters?.gender,
              lastname: parameters?.lastname,
              middlename: parameters?.middlename,
              firstname: parameters?.firstname,
              gender: parameters?.gender,
              birthday: parameters?.birthday,
              deathday: parameters?.deathday,
              info: parameters?.info,
            },
            errorMessage: "Error updating the person",
            successMessage: "Operation was successful",
          };

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

          if (result) {
            resolve({
              data: result,
            });
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: result?.message,
              stack: result?.stack,
            });
          }
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
      }
    } catch (error) {
      console.error(
        `Failed to update person with ID ${parameters.id}: ${error.message}`
      );
      resolve({
        error: `Failed to update person with ID ${parameters.id}: ${error.message}`,
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
