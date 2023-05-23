// Add a new animal to the database
module.exports = function addAnimal(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          const db = database.getConnection();
          operation = db.collection("animals").insertOne(parameters);
          const response = await operation;

          if(response.error) { 
            resolve({
              error: "An error occurred while adding new animal",
              msg: response.error.message,
              stack: response.error.stack,
            });
           }

          resolve({
            data: response,
          });
        }
        case "MySQL": {
          const sqlStatement =
            "INSERT INTO animals (id, species_id, name, given_name, birthday, deathday) VALUES " +
            "(?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
              (id = uuid.v4()),
              parameters.species_id,
              parameters.name,
              parameters.given_name,
              parameters.birthday,
              parameters.deathday,
              parameters.info || null,
            ];

            const result = await database.getConnection.query(
              sql,
              values,
              function (error, results, fields) {
                if (error) {
                  console.error(`Failed to add new animal: ${error.message}`);
                  return error;
                }
                console.log(
                  `New animal added successfully with ID ${results.insertId}`
                );
  
                return results;
              }
            );
        }
        default: {
        }
      }
    } catch (error) {
      resolve({
        error: "An error occurred while adding new animal",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
