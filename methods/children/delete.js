const ifChildExists = require("./exists");

/**
 * Deletes a child from the database.
 *
 * @param {Object} database - The database object.
 * @param {string} usedDatabase - The type of database being used (e.g., "MongoDB", "MySQL").
 * @param {Object} parameters - The parameters required for deleting the child.
 * @returns {Promise} A promise that resolves with the result of the delete operation.
 */
module.exports = function deleteChild(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    // Check if the child exists in the relationship
    const childExists = await ifChildExists(
      database,
      usedDatabase,
      parameters?.rel_id,
      parameters?.person_id
    );

    if (childExists) {
      // If the child exists, return an error
      resolve({
        error: "This Child already exists in this relationship!",
      });
      return; // Exit the function
    }

    try {
      switch (usedDatabase) {
        case "MongoDB": {
          // If MongoDB is used, return an error (not implemented yet)
          resolve({ error: "Not implemented yet" });
          return; // Exit the function
        }
        case "MySQL": {
          if (parameters.rel_id && !parameters?.person_id) {
            // If MySQL is used, delete the child from the database
            const sqlString =
              "DELETE FROM children WHERE rel_id='" + parameters?.rel_id + "'";
            const response = await database.query(sqlString);
            console.log("SQL Query Response:", response);
            if (response) {
              // If the delete operation is successful, return the response
              resolve({
                data: response,
              });
            } else {
              // If there is an error, return the error message and stack trace
              resolve({
                error: "Error retrieving data from database",
                msg: response?.message,
                stack: response?.stack,
              });
            }
          } else if (!parameters.rel_id && parameters?.person_id) {
            // If MySQL is used, delete the child from the database
            const sqlString =
              "DELETE FROM children WHERE person_id='" +
              parameters?.person_id +
              "'";
            const response = await database.query(sqlString);
            console.log("SQL Query Response:", response);
            if (response) {
              // If the delete operation is successful, return the response
              resolve({
                data: response,
              });
            } else {
              // If there is an error, return the error message and stack trace
              resolve({
                error: "Error retrieving data from database",
                msg: response?.message,
                stack: response?.stack,
              });
            }
          }
          return; // Exit the function
        }
        default: {
          // If an unsupported database is used, return an error
          resolve({ error: "Not implemented yet" });
          return; // Exit the function
        }
      }
    } catch (error) {
      // If there is an error during the delete operation, return the error message and stack trace
      resolve({
        error: "An Error occurred while trying to delete the person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
