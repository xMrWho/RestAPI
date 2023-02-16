const Logger = require('../tools').Logger;

module.exports = function getPersonList(database) {
  const selectAllStatement = "SELECT * FROM persons";
  return new Promise(function (resolve, reject) {
    database.query(selectAllStatement, function (error, results) {
      if (error) {
        console.log("### ERROR", error);
        Logger.log('TEST 1234');
        resolve({error: 'Error retrieving data from database'});
      } 
      else {
        resolve({data: results});
      }
    });
  });
};
