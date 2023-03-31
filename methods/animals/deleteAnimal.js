module.exports = function deleteAnimal(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          const db = database.getConnection();
          operation = db.collection("animals").deleteOne( { id: ObjectId(parameters.id) } )
          const response = await operation;
          resolve({
            data: response,
          });
        }
        case "MySQL": {
          const sqlStatement =
            "INSERT INTO animals (id, species_id, name, given_name, birthday, deathday, info) VALUES " +
            "(?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
              (id = uuid.v4()),
              parameters.name,
              parameters.middlename,
              parameters.firstname,
              parameters.gender,
              parameters.birthday,
              parameters.deathday,
              parameters.info || null,
            ];

            const result = await database.getConnection.query(
              sql,
              values,
              function (error, results, fields) {
                if (error) {
                  console.error(`Failed to add delete animal: ${error.message}`);
                  return error;
                }
                console.log(
                  `animal added successfully with ID ${results.insertId}`
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
  