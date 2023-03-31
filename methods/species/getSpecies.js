module.exports = function getSpecies(database, usedDatabase, parameters) {
    return new Promise(async function (resolve, reject) {
      try {
        switch (usedDatabase) {
          case "MongoDB": {
          }
          case "MySQL": {
          }
          default: {
          }
        }
      } catch (error) {
        resolve({
          error: "Error retrieving data from database",
          msg: error.message,
          stack: error.stack,
        });
      }
    });
  };
  
