const mongoOperationQuery = require("../../PLANNED/DATABASE/mongoOperationQuery");
const sqlOperationQuery = require("../mySqlOperationQuery");
const ifRelationshipExists = require("./exists");


module.exports = function addRelationship(database, usedDatabase, parameters) {
    return new Promise(async function (resolve, reject) {
      const partner1 = parameters?.partner1; 
      const partner2 = parameters?.partner2; 
      const relationship_type = parameters?.relationship_type; 
      const information = parameters?.information;
      const generatedUUID = uuid.v4();

      const params = {
        database: database,
        collectionName: "persons",
        queryOperation: "insert",
        parametersToUse: {
          id: generatedUUID,
          person_id: parameters?.partner1,
          partner_id: parameters?.partner2 || null,
          relationship_type: parameters?.relationship_type || "Other",
          information: parameters?.information || "",
        },
        errorMessage: "Error inserting the new relationship",
        successMessage: "Operation was successful",
      };


      try {
        switch (usedDatabase) {
          case "MongoDB": {
            resolve({ error: "Not implemented yet" });
          }
          case "MySQL": {
            
            const existsRelationship = await ifRelationshipExists(
              database,
              usedDatabase,
              {
                partner1: partner1,
                partner2: partner2,
                id: generatedUUID
              }
            );
      
            if (existsRelationship) {
              resolve({
                error: "This relationship already exists!",
              });
            }



            
          }
          default: {
            resolve({ error: "Not implemented yet" });
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
  