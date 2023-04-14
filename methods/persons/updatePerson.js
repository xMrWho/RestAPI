const ObjectID = require("mongodb").ObjectID;

const mongoOperationQuery = require("../../methods/mongoOperationQuery");
const sqlOperationQuery = require("../../methods/mySqlOperationQuery");


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
              id: ObjectId(parameters.id),
            },
            { $set: { parameters } }
          );

          if (response.error) {
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

          const result = await database
            .getConnection()
            .query(
              "UPDATE people SET name = ?, middlename=?, firstname = ?, gender = ?, birthday = ?, deathday = ?, infos = ? WHERE id = ?",
              values,
              function (error, results) {
                if (error) {
                  console.error(`Failed to update person: ${error.message}`);
                  return error;
                }
                console.log(`updated person successfully`);
                return results;
              }
            );
          if (result) {
            resolve({
              data: result,
            });
          } else {
            resolve({
              error: "Error retrieving data from database",
              msg: result?.message,
              stack: result?.stack,
            });
          }
        }
        default: {
          resolve({ error: "Not implemented yet" });
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
