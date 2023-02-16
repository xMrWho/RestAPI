module.exports = function getPerson(database, personId) {
    const selectAllStatement = "SELECT * FROM persons";
    return new Promise(function (resolve, reject) {
      database.query(selectAllStatement, function (error, results) {
        if (error) {
          resolve({error: 'Error retrieving data from database', msg: error.message, stack: error.stack});
        } 
        else {
          resolve({data: results});
        }
      });
    });
  };
  