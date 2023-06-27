//not tested

/** const ObjectID = require("mongodb").ObjectID;

module.exports = function mongoOperationQuery(parameters) {
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

      if (!successMessage) {
        resolve({
          error: new Error("successMessage is required"),
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

      const collection = db.collection(collectionName);
      if (!collection) {
        resolve({
          error: new Error(
            "collection is not connected or connection is errored"
          ),
        });
      }

      switch (queryOperation) {
        case "findOne": {
          if (parametersToUse.id) {
            const id = new ObjectID(parametersToUse.id);
            const resultFindOne = await collection.findOne({ _id: id });
            if (resultFindOne.error) {
              resolve(resolveOnError(resultFindOne.error));
            }
            resolve({
              resultMessage: successMessage,
              result: resultFindOne,
            });
          }
          resolve({
            error: new Error("id is required"),
          });
        }
        case "find": {
          const resultFind = await collection.find(parametersToUse);
          if (resultFind.error) {
            resolve(resolveOnError(resultFind.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultFind,
          });
        }
        case "delete": {
          if (parametersToUse.id) {
            const id = new ObjectID(parametersToUse.id);

            const resultDelete = await collection.deleteOne({ _id: id });

            if (resultDelete.error) {
              resolve(resolveOnError(resultDelete.error));
            } else {
              resolve({
                resultMessage: successMessage,
                result: resultDelete,
              });
            }
          }
          resolve({
            error: new Error("id is required"),
          });
        }
        case "update": {
          if (parametersToUse.id) {
            const id = new ObjectID(parametersToUse.id);
            delete parametersToUse.id;

            const resultUpdate = await collection.updateOne(
              { _id: id },
              { $set: parametersToUse }
            );
            resolve({
              resultMessage: successMessage,
              result: resultUpdate,
            });
          }
          resolve({
            error: new Error("id is required"),
          });
        }

        case "insert": {
          if (parametersToUse.id) {
            const id = new ObjectID(parametersToUse.id);
            delete parametersToUse.id;
            const resultInsert = await collection.insertOne(parametersToUse);
            resolve({
              resultMessage: successMessage,
              result: resultInsert,
            });
          }
          resolve({
            error: new Error("id is required"),
          });
        }

        case "aggregate": {
          const resultAggregate = await collection.aggregate(parametersToUse);
          if (resultAggregate.error) {
            resolve(resolveOnError(resultAggregate.error));
          }
          resolve({
            rejectMessage: successMessage,
            result: resultAggregate,
          });
        }

        case "count": {
          const resultCount = await collection.countDocuments(parametersToUse);
          if (resultCount.error) {
            resolve(resolveOnError(resultCount.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultCount,
          });
        }

        case "distinct": {
          const resultDistinct = await collection.distinct(parametersToUse);
          if (resultDistinct.error) {
            resolve(resolveOnError(resultDistinct.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultDistinct,
          });
        }

        case "distinctCount": {
          const resultDistinctCount = await collection.distinctCount(
            parametersToUse
          );
          if (resultDistinctCount.error) {
            resolve(resolveOnError(resultDistinctCount.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultDistinctCount,
          });
        }

        case "aggregateCount": {
          const resultAggregateCount = await collection.aggregateCount(
            parametersToUse
          );
          if (resultAggregateCount.error) {
            resolve(resolveOnError(resultAggregateCount.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultAggregateCount,
          });
        }

        case "aggregateWithCursor": {
          const resultAggregateWithCursor =
            await collection.aggregateWithCursor(parametersToUse);
          if (resultAggregateWithCursor.error) {
            resolve(resolveOnError(resultAggregateWithCursor.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultAggregateWithCursor,
          });
        }

        case "distinctWithCursor": {
          const resultDistinctWithCursor = await collection.distinctWithCursor(
            parametersToUse
          );
          if (resultDistinctWithCursor.error) {
            resolve(resolveOnError(resultDistinctWithCursor.error));
          }
          resolve({
            resultMessage: successMessage,
            result: resultDistinctWithCursor,
          });
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
 */