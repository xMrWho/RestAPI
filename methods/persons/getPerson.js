module.exports = function getPerson(database, usedDatabase, personId) {
  const selectStatement = "SELECT * FROM persons WHERE id=" + personId;
  let operation;

  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          const db = database.getConnection();
          const result = await db
            .collection("persons")
            .find({ id: ObjectId(personId) });

          if (result.error) {
            resolve({
              error: "Error retrieving data from database",
              msg: result.message,
              stack: result.stack,
            });
          }
          
          resolve({
            data: result,
          });
          break;
        }
        case "MySQL": {
          operation = database.query(selectStatement);
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
      }
      const response = await operation;
      if (Array.isArray(response)) {
        resolve({
          data: response,
        });
      } else {
        resolve({
          error: "Error retrieving data from database",
          msg: response.message,
          stack: response.stack,
        });
      }
    } catch (error) {
      resolve({
        error: "An Error occurred",
        msg: response.message,
        stack: response.stack,
      });
    }
  });
};
