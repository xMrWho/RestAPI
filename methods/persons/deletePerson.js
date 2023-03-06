module.exports = function deletePerson(database, usedDatabase, personId) {
  return new Promise(function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {







          
        }
        case "MySQL": {

            //pets --> person_id
            //persons_cars --> person_id
            //person_hobbies --> person_id
            //children --> person_id
            //relationships --> person_id & partner_id
            //persons --> id

        }
        default: {
          resolve({ error: "Gar keinen Bock mehr" });
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
