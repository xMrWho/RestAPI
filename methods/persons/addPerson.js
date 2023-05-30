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
          gender: parameters?.gender,
          lastname: parameters?.name,
          middlename: parameters?.middlename,
          firstname: parameters?.firstname,
          gender: parameters?.gender || "Other",
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
        //WORKING
        case "MySQL": {
          const existsPerson = await ifPersonExists(
            database,
            usedDatabase,
            generatedUUID
          );
          console.log("existsPerson?", existsPerson);

          if (existsPerson) {
            resolve({
              error: "This Person already exists!",
            });
          }

          let queryString = "INSERT INTO " + params.collectionName + " (";
          console.log("queryString", queryString);

          const keysToInsert = Object.keys(params.parametersToUse);
          const valuesToInsert = Object.values(params.parametersToUse);

          const questionMarksArray = [];
          console.log("keysToInsert.length", keysToInsert.length);

          for(let i = 0; i < keysToInsert.length; i++) {
            questionMarksArray[i] = "?";
          }




          console.log("keysToInsert", keysToInsert);
          console.log("valuesToInsert", valuesToInsert);
          console.log("questionMarksArray", questionMarksArray);

          queryString = queryString + keysToInsert.join(",") + ") VALUES (" + questionMarksArray.join(",") + ")";
          
          console.log("queryString", queryString);



          const insertResponse = await database.queryWithValues(
            queryString, valuesToInsert
          );

          //const response = await sqlOperationQuery(params);
          console.log("TELL ME WHYYYYYYYYY", insertResponse);

          if (insertResponse.insertId) {
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
