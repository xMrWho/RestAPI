module.exports = function mySqlOperationQuery(parameters) {
  const {
    database,
    collectionName,
    queryOperation,
    parametersToUse,
    errorMessage,
    successMessage,
  } = parameters;

  function rejectOnError(error) {
    return {
      error: errorMessage,
      msg: error.message,
      stack: error.stack,
    };
  }

  return new Promise(async function (resolve, reject) {
    try {
      if (!errorMessage) {
        reject(new Error("errorMessage is required"));
        return;
      }

      if (!successMessage) {
        reject(new Error("successMessage is required"));
        return;
      }

      if (!database) {
        reject(new Error("database is required"));
        return;
      }

      if (!collectionName) {
        reject(new Error("Collection name is required"));
        return;
      }
      if (!queryOperation) {
        reject(new Error("queryOperation is required"));
        return;
      }
      if (!parametersToUse) {
        reject(new Error("parametersToUse are required"));
        return;
      }

      const isConnected = await database.checkConnection();
      console.log("Database is connected???", isConnected);
      if (!isConnected) {
        reject(new Error("database is not connected"));
        return;
      }
      const conn = database.getConnection();

      if (!conn) {
        reject(new Error("database is not connected or connection is errored"));
        return;
      }

      switch (queryOperation) {
        //not tested
        case "findOne": {
          if (parameters.id) {
            conn.query(
              "SELECT * FROM ?? WHERE ?? = ?",
              [collectionName, "id", parameters.id],
              function (error, results, fields) {
                if (error) {
                  console.log(error);
                  reject(rejectOnError(error));
                  return;
                }
                resolve({
                  resultMessage: successMessage,
                  result: results,
                  fields: fields,
                });
              }
            );
          } else {
            reject(new Error("id is required"));
          }
          break;
        }
        //working
        case "findAll": {
          console.log("DB TEST");
          const results = await database.query(
            "SELECT * FROM " + collectionName
          );

          console.log("DB TEST 2 ", results);
          resolve({
            resultMessage: successMessage,
            result: results,
            //fields: fields,
          });
        }
        //not tested
        case "find":
        case "findWithParms": {
          db.query(
            "SELECT * FROM ?? WHERE ??",
            [
              collectionName,
              Object.keys(parametersToUse).map(function (key) {
                return key !== null;
              }),
              Object.values(parametersToUse).map(function (value) {
                return value !== null;
              }),
            ],
            function (error, results, fields) {
              if (error) {
                reject(rejectOnError(error));
                return;
              }
              resolve({
                resultMessage: successMessage,
                result: results,
                fields: fields,
              });
            }
          );
          break;
        }
        // Remaining cases omitted for brevity

        default: {
          reject(new Error("Invalid query operation"));
          break;
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
