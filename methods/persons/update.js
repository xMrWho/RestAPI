const ObjectID = require("mongodb").ObjectID;

const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");

const ifPersonExists = require("./exists");

/**
 * Updates a person in the database.
 *
 * @param {object} database - The main database object.
 * @param {string} usedDatabase - The name of the database being used (e.g. "MongoDB", "MySQL").
 * @param {object} parameters - The parameters for updating the person.
 * @param {string} parameters.id - The ID of the person to update.
 * @param {string} [parameters.gender] - The gender of the person.
 * @param {string} [parameters.lastname] - The last name of the person.
 * @param {string} [parameters.middlename] - The middle name of the person.
 * @param {string} [parameters.firstname] - The first name of the person.
 * @param {string} [parameters.birthday] - The birthday of the person.
 * @param {string} [parameters.deathday] - The death day of the person.
 * @param {string} [parameters.information] - Additional information about the person.
 * @return {Promise} A promise that resolves to an object with the updated person data or an error message.
 */
module.exports = function updatePerson(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    if(!parameters.id) {
      resolve({
        error: "Parameter id is missing",
      });
    }


    try {
      const existsPerson = await ifPersonExists(
        database,
        usedDatabase,
        parameters?.id
      );

      if (!existsPerson) {
        resolve({
          error: "The person with the ID " + id + " does not exists!",
        });
      }

      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
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
              information: parameters?.information,
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
            break;
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: response?.message,
              stack: response?.stack,
            });
            break;
          }
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
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
