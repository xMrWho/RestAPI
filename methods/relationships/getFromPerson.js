module.exports = function getRelationshipsFromPerson(database, usedDatabase, parameters) {
  Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        //not tested
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          //working
          if (parameters.personId) {
            const responsePersonId = await database.query("SELECT * FROM relationships WHERE person_id = " +
            parameters.personId);
            const responsePartnerId = await database.query("SELECT * FROM relationships WHERE partner_id = " +
            parameters.personId);
            console.log("SQL Query Response person_id:", responsePersonId);
            console.log("SQL Query Response partner_id:", responsePartnerId);
            const response = responsePersonId.concat(responsePartnerId).unique(); 

            resolve({
              data: response,
            });
            break;
          }
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
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
