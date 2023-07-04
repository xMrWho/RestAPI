/**
 * Deletes a relationship from the specified database.
 *
 * @param {any} database - The database to delete the relationship from.
 * @param {string} usedDatabase - The type of database being used.
 * @param {any} parameters - Additional parameters for the operation.
 * @return {Promise<any>} A promise that resolves to the result of the operation.
 */
module.exports = async function deleteRelationship(database, usedDatabase, parameters) {
  try {
    switch (usedDatabase) {
      case "MongoDB": {
        // If MongoDB is being used, return a promise that resolves to an error message indicating that it is not implemented yet.
        return { error: "Not implemented yet" };
      }
      case "MySQL": {
        const params = {
          database: database,
          collectionName: "relationships",
          queryOperation: "delete",
          parametersToUse: {
            id: personId,
          },
          errorMessage: "Error deleting the relationship",
          successMessage: "Operation was successful",
        };

        // Call the `sqlOperationQuery` function and await its response.
        const response = await sqlOperationQuery(params);

        if (response?.result) {
          // If the response has a valid result, return a promise that resolves to an object containing the response data.
          return {
            data: response,
          };
        } else {
          // If the response does not have a valid result, return a promise that resolves to an object containing an error message and additional information.
          return {
            error: "Error retrieving data from database",
            msg: response?.message,
            stack: response?.stack,
          };
        }
      }
      default: {
        // If an unsupported database is being used, return a promise that resolves to an error message indicating that it is not implemented yet.
        return { error: "Not implemented yet" };
      }
    }
  } catch (error) {
    // If an error occurs during the execution of the function, return a promise that resolves to an object containing an error message and additional information about the error.
    return {
      error: "Error retrieving data from database",
      msg: error.message,
      stack: error.stack,
    };
  }
};
  