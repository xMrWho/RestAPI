// This code initializes a MySQL database by creating multiple tables with their respective SQL statements.

// Define an array of objects, where each object represents a table to be created
const createTablesArray = [
  // personsTable
  {
    tableName: "persons",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS persons (" +
      " id CHAR(36) NOT NULL," +
      " gender ENUM('Male', 'Female', 'Other') NOT NULL," +
      " firstname VARCHAR(50) NOT NULL," +
      " middlename VARCHAR(50)," +
      " lastname VARCHAR(50) NOT NULL," +
      " birthday DATE," +
      " deathday DATE," +
      " information TEXT," +
      " PRIMARY KEY (id)) ENGINE = InnoDB;",
  },
  // relationshipsTable
  {
    tableName: "relationships",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS relationships (" +
      " id CHAR(36) NOT NULL," +
      " person_id CHAR(36) NOT NULL," +
      " partner_id CHAR(36) NOT NULL," +
      " relationship_type ENUM('Marriage', 'Dating', 'Engaged', 'Life partners', 'Other') NOT NULL," +
      " information TEXT," +
      " PRIMARY KEY (id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id)," +
      " FOREIGN KEY (partner_id) REFERENCES persons(id)) ENGINE = InnoDB;",
  },
  // childrenTable
  {
    tableName: "children",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS children (" +
      " rel_id VARCHAR(36)," +
      " person_id VARCHAR(36)," +
      " FOREIGN KEY (rel_id) REFERENCES relationships(id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id)) ENGINE = InnoDB;",
  },
  // ... other tables to be implemented later ...
];

// Export a function that initializes the MySQL database
module.exports = function initMySQLDb(database) {
  return new Promise(async function (resolve, reject) {
    // Loop through each table object in the createTablesArray
    for (const entry of createTablesArray) {
      // Execute the SQL statement to create the table
      const createStatement = await database.query(
        entry.sqlStatement,
        function (error, results) {
          if (error) {
            // If there is an error, return an object with error details
            return {
              error: "Error creating " + entry.tableName + " table",
              msg: error.message,
              stack: error.stack,
            };
          } else {
            // If successful, log a message and the results
            console.log("Table " + entry.tableName + " initialized");
            console.log(results);
            return true;
          }
        }
      );

      // If there was an error creating the table, resolve with the error object
      if (createStatement.error) {
        resolve(createStatement);
      }
    }

    // If all tables were created successfully, resolve with true
    resolve(true);
  });
};