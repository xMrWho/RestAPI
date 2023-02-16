module.exports = async function postPersonFunctions(req, res, next) {
  const getPersonList = require("../../persons/getPersonList.js");

  const database = req.database;
  const getStatement = "SELECT * FROM persons WHERE id = ?";

  switch (req.body.action) {
    case "get_all_persons":
      const personList = await getPersonList(database);
      console.log('HERE', personList);
      return res.status(200).send(personList);
      break;
    case "get_person": {
      const id = req.body.id;
      const values = [id];
      database.query(getStatement, values, function (error, results) {
        if (error) {
          return res.status(500).send("Error retrieving data from database");
        } else if (results.length === 0) {
          return res.status(404).send("Person not found");
        } else {
          return res.status(200).json(results[0]);
        }
      });
      break;
    }
    default: {
      return res.status(400).send("Invalid request action");
    }
  }


  
  const options = {
    Settings: settings,
    databaseFunctions: databaseFunctions,
  };

  const listOfPersons = await getPersonList(options);
  if (listOfPersons && listOfPersons.error) {
    const err = new Error(listOfPersons.error);
    err.status = 404;
    next(err);
  } else {
    res.send({
      data: listOfPersons.result,
    });
  }
};
