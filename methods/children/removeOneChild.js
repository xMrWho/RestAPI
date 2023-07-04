const ifChildExists = require("./exists");

/**
 * Removes a child from the specified relationship in the database.
 * @param {Object} database - The database connection object.
 * @param {string} usedDatabase - The type of database used (e.g. "MongoDB", "MySQL").
 * @param {Object} parameters - The parameters for removing the child.
 * @param {string} parameters.rel_id - The ID of the relationship.
 * @param {string} parameters.person_id - The ID of the person.
 * @returns {Promise} A promise that resolves with the result of the removal operation.
 */
module.exports = function removeChild(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    // Check if the child already exists in the relationship
    const childExists = await ifChildExists(
      database,
      usedDatabase,
      parameters?.rel_id,
      parameters?.person_id
    );

    if (!childExists) {
      resolve({
        error: "This Child does not exists in this relationship!",
      });
    }

    try {
      switch (usedDatabase) {
        case "MongoDB": {
          // Handle MongoDB database
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          // Construct the SQL query
          const sqlString = `DELETE FROM children WHERE rel_id='${parameters?.rel_id}' AND person_id='${parameters.person_id}'`;
          
          // Execute the SQL query
          const response = await database.query(sqlString);
          console.log("SQL Query Response:", response);
          
          // Check the response and resolve accordingly
          if (response) {
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
          }
          break;
        }
        default: {
          // Handle unsupported database types
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (error) {
      // Handle errors that occur during the removal operation
      resolve({
        error: "An Error occurred while trying to delete the person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
