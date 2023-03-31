const ObjectID = require('mongodb').ObjectID,

module.exports = function deletePerson(database, usedDatabase, personId) {
  return new Promise(function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
        }
        case "MySQL": {
          //pets --> person_id
          //persons_cars --> person_id
          //person_hobbies --> person_id
          //children --> person_id
          //relationships --> person_id & partner_id
          //persons --> id
          resolve({ error: "Not implemented yet" });
        }
        default: {
          resolve({ error: "Not implemented yet" });
        }
      }
    } catch (error) {
      resolve({
        error: "An Error occurred while trying to delete the person",
        msg: error.message,
        stack: error.stack,
      });
    }
  });
};
