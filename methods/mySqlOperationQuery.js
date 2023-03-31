module.exports = function mySqlOperationQuery(parameters) {
  const {
    database,
    collectionName,
    queryOperation,
    parametersToUse,
    errorMessage,
    successMessage,
  } = parameters;

  function resolveOnError(error) {
    return {
      error: errorMessage,
      msg: error.message,
      stack: error.stack,
    };
  }

  return new Promise(async function (resolve, reject) {
    try {
      if (!errorMessage) {
        resolve({
          error: new Error("errorMessage is required"),
        });
      }

      if (!database) {
        resolve({
          error: new Error("database is required"),
        });
      }

      if (!collectionName) {
        resolve({
          error: new Error("Collection name is required"),
        });
      }
      if (!queryOperation) {
        resolve({
          error: new Error("queryOperation is required"),
        });
      }
      if (!parametersToUse) {
        resolve({
          error: new Error("parametersToUse are required"),
        });
      }

      const isConnected = await database.checkConnection();
      if (!isConnected) {
        resolve({
          error: new Error("database is not connected"),
        });
      }
      const db = database.getConnection();
      if (!db) {
        resolve({
          error: new Error(
            "database is not connected or connection is errored"
          ),
        });
      }

      switch (queryOperation) {
        case "findOne": {
          if (parameters.id) {
            const resultFindOne = await db.query(
              "SELECT * FROM?? WHERE?? =?",
              [collectionName, "id", parameters.id],
              function (error, results, fields) {
                if (error) {
                  return resolveOnError(error);
                }
                if (results.length === 0) {
                  return {
                    error: new Error("id is required"),
                  };
                }
                return {
                  resultMessage: successMessage,
                  result: results[0],
                  fields: fields,
                };
              }
            );
            reject(resultFindOne);
          } else {
            resolve({
              error: new Error("id is required"),
            });
          }
        }
        case "findAll": {
          const resultFindAll = await db.query(
            "SELECT * FROM??",
            [collectionName],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultFindAll);
        }
        case "find":
        case "findWithParms": {
          const resultFindWithParms = await db.query(
            "SELECT * FROM?? WHERE??",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultFindWithParms);
        }
        //UNION SELECT
        case "union": {
          const resultUnion = await db.query(
            "SELECT * FROM?? UNION SELECT * FROM??",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );

          resolve(resultUnion);
        }

        case "unionAll": {
          const resultUnionAll = await db.query(
            "SELECT * FROM?? UNION ALL SELECT * FROM??",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultUnionAll);
        }

        //in
        case "in": {
          const resultIn = await db.query(
            "SELECT * FROM?? WHERE?? IN (?)",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultIn);
        }
        case "notIn": {
          const resultNotIn = await db.query(
            "SELECT * FROM?? WHERE?? NOT IN (?)",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultNotIn);
        }

        //EXCEPT SELECT
        case "except": {
          const resultExcept = await db.query(
            "SELECT * FROM?? WHERE?? NOT IN (?)",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultExcept);
        }
        case "exceptAll": {
          const resultExceptAll = await db.query(
            "SELECT * FROM?? WHERE?? NOT IN (?)",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );

          resolve(resultExceptAll);
        }

        //INTERSECT SELECT
        case "intersect": {
          const resultIntersect = await db.query(
            "SELECT * FROM?? WHERE?? IN (?)",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultIntersect);
        }

        case "intersectAll": {
          const resultIntersectAll = await db.query(
            "SELECT * FROM?? WHERE?? IN (?)",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultIntersectAll);
        }

        case "exists": {
          const resultExists = await db.query(
            "SELECT * FROM?? WHERE?? =?",
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
                return false;
              }
              return true;
            }
          );
          resolve(resultExists);
        }

        //BETWEEN
        case "between": {
          const resultBetween = await db.query(
            "SELECT * FROM?? WHERE?? BETWEEN? AND?",
            [
              collectionName,
              Object.keys(parametersToUse).map(function (key) {
                return key !== null;
              }),
              Object.values(parametersToUse).map(function (value) {
                return value !== null;
              }),
              Object.keys(parametersToUse).map(function (key) {
                return key !== null;
              }),
              Object.values(parametersToUse).map(function (value) {
                return value !== null;
              }),
            ],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultBetween);
        }
        //NOT BETWEEN
        case "notBetween": {
          const resultNotBetween = await db.query(
            "SELECT * FROM?? WHERE?? NOT BETWEEN? AND?",
            [
              collectionName,
              Object.keys(parametersToUse).map(function (key) {
                return key !== null;
              }),
              Object.values(parametersToUse).map(function (value) {
                return value !== null;
              }),
              Object.keys(parametersToUse).map(function (key) {
                return key !== null;
              }),
              Object.values(parametersToUse).map(function (value) {
                return value !== null;
              }),
            ],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultNotBetween);
        }
        //LIKE
        case "like": {
          const resultLike = await db.query(
            "SELECT * FROM?? WHERE?? LIKE?",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultLike);
        }
        //NOT LIKE
        case "notLike": {
          const resultNotLike = await db.query(
            "SELECT * FROM?? WHERE?? NOT LIKE?",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultNotLike);
        }

        case "delete": {
          const resultDelete = await db.query(
            "DELETE FROM?? WHERE?? =?",
            [
              collectionName,
              Object.keys(parameters).map(function (key) {
                return key !== null;
              }),
              Object.values(parameters).map(function (key) {
                return key !== null;
              }),
            ],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );

          if (resultDelete.error) {
            resolve(resultDelete);
          } else {
            resolve(resultDelete);
          }
        }
        case "update": {
          const resultUpdate = await db.query(
            "UPDATE?? SET?? =? WHERE?? =?",
            [
              collectionName,
              Object.keys(parametersToUse),
              Object.values(parametersToUse),
            ],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultUpdate);
        }
        case "insertMany":
        case "insert": {
          const resultInsert = await db.query(
            "INSERT INTO?? SET?",
            [collectionName, parametersToUse],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultInsert);
        }
        case "count": {
          const resultCount = await db.query(
            "SELECT COUNT(*) FROM??",
            [collectionName],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultCount);
        }
        case "countWithParms": {
          const resultCountWithParms = await db.query(
            "SELECT COUNT(*) FROM?? WHERE??",
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
                return resolveOnError(error);
              }
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultCountWithParms);
        }
        case "distinct": {
          const resultDistinct = await db.query(
            "SELECT DISTINCT?? FROM??",
            [
              Object.keys(parametersToUse).map(function (key) {
                return key !== null;
              }),
              collectionName,
              Object.values(parametersToUse).map(function (value) {
                return value !== null;
              }),
            ],
            function (error, results, fields) {
              if (error) {
                return resolveOnError(error);
              }
              r;
              return {
                resultMessage: successMessage,
                result: results,
                fields: fields,
              };
            }
          );
          resolve(resultDistinct);
        }

        default: {
          resolve({
            error: new Error("queryOperation is invalid"),
          });
        }
      }
    } catch (error) {
      resolve({
        error: "An Error occurred",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
