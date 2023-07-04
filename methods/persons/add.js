const uuid = require("uuid");
const sqlOperationQuery = require("../mySqlOperationQuery");
const ifPersonExists = require("./exists");

// Refactored function to add a new person to the database
module.exports = async function addPerson(database, usedDatabase, parameters) {
  try {
    // Generate a unique identifier for the person
    const generatedUUID = uuid.v4();

    // Check if the person already exists in the database
    const existsPerson = await ifPersonExists(
      database,
      usedDatabase,
      generatedUUID
    );

    if (existsPerson) {
      // If the person already exists, return an error message
      return {
        error: "This Person already exists!",
      };
    }

    // Set up the parameters for the database operation
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
      // Handle the case of MongoDB
      case "MongoDB": {
        // Return a not implemented error message
        return { error: "Not implemented yet" };
      }

      // Handle the case of MySQL
      case "MySQL": {
        // Perform the SQL operation query with the provided parameters
        const response = await sqlOperationQuery(params);

        if (response?.result) {
          // If the query is successful, add the generated person ID to the response data
          response.result.generatedPersonId = generatedUUID;
          return {
            data: response,
          };
        } else {
          // If there is an error, return an error message with additional information
          return {
            error: "Error retrieving data from database",
            msg: response?.message,
            stack: response?.stack,
          };
        }
      }

      // Handle all other cases
      default: {
        // Return a not implemented error message
        return { error: "Not implemented yet" };
      }
    }
  } catch (error) {
    // If an error occurs during the process, return an error message with additional information
    return {
      error: "An Error occurred while adding a new person",
      msg: error.message,
      stack: error.stack,
    };
  }
};
