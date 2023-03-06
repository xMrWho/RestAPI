const ObjectID = require('mongodb').ObjectID;

module.exports = function updatePerson(database, usedDatabase, parameters) {
  const { firstname, middlename, lastname, gender, birthday, deathday, info } =
    parameters;

  const sql =
    "UPDATE persons SET firstname = ?, middlename = ?, lastname = ?, gender = ?, birthday = ?, deathday = ?, info = ? WHERE id = ?";

  return new Promise(async function (resolve, reject) {
    try {
      const isPersonEvenExisting = await getPerson(
        database,
        usedDatabase,
        parameters.id
      );

      if (isPersonEvenExisting.error) {
        resolve({ error: "This person does not exists" });
      }

      switch (usedDatabase) {
        case "MongoDB": {
          const db = database.getConnection();
          const response = await db.collection("persons").updateOne(
            {
              _id: ObjectId(parameters.id),
            },
            { $set: { parameters } }
          );

          resolve({
            data: response,
          });
        }

        case "MySQL": {

            const values = [
                parameters.name,
                parameters.middlename,
                parameters.firstname,
                parameters.gender,
                parameters.birthday,
                parameters.deathday,
                parameters.info,
                parameters.id || null,
              ];
    

            connection.query('UPDATE people SET name = ?, middlename=?, firstname = ?, gender = ?, birthday = ?, deathday = ?, infos = ? WHERE id = ?', values, function(err, results) {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              });


        }
        default: {
          resolve({ error: "Gar keinen Bock mehr" });
        }
      }
    } catch (error) {
      console.error(`Failed to update person with ID ${id}: ${error.message}`);
      throw error;
    }
  });
};
