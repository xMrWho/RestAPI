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
      if (!isConnected) {
        reject(new Error("database is not connected"));
        return;
      }
      const connection = database.getConnection();
      if (!connection) {
        reject(new Error("database is not connected or connection is errored"));
        return;
      }

      switch (queryOperation) {
        //working
        case "findOne": {
          if (parametersToUse.id) {
            const resultsFindOne = await database.queryWithValues(
              "SELECT * FROM ?? WHERE ?? = ?",
              [collectionName, "id", parameters.id]
            );
            resolve({
              resultMessage: successMessage,
              result: resultsFindOne,
            });
          } else {
            reject(new Error("id is required"));
          }
          break;
        }
        //working
        case "findAll": {
          const resultsFindAll = await database.query(
            "SELECT * FROM " + collectionName
          );

          resolve({
            resultMessage: successMessage,
            result: resultsFindAll,
          });
        }
        //not tested
        case "find":
        case "findWithParms": {
          //const sqlStatementFindWithParams = "SELECT * FROM ?? WHERE ??";
          //await connection.query()
          const resultFind = await database.queryWithValues(
            "SELECT * FROM ?? WHERE ??",
            [
              collectionName,
              Object.keys(parametersToUse),
              Object.values(parametersToUse),
            ]
          );

          resolve({
            resultMessage: successMessage,
            result: resultFind,
          });

          /**  const resultFind = await database.query(
            "SELECT * FROM ?? WHERE ??",
            [
              collectionName,
              Object.keys(parametersToUse),
              Object.values(parametersToUse),
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
          ); */
        }

        case "insert": {
          const resultInsert = await database.queryWithValues(
            "INSERT INTO ?? SET ?",
            [
              collectionName,
              Object.keys(parametersToUse),
              Object.values(parametersToUse),
            ]
          );
          
          console.log("resultInsert", resultInsert);
          resolve({
            resultMessage: successMessage,
            result: resultInsert,
          });

          /** const results = await database.query(
            "INSERT INTO ?? SET ?",
            [collectionName, parametersToUse],
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
          console.log("results", results);

          resolve({
            resultMessage: successMessage,
            result: results,
            //fields: fields,
          });
          
          */
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
