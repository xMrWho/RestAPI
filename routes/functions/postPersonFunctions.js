module.exports = async function postPersonFunctions(req, res, next) {
  const getPersonList = require("../../methods/persons/getPersonList.js");
  const getStatement = "SELECT * FROM persons WHERE id = ?";
  switch (req.body.action) {
    case "get_all_persons": {
      const personList = await getPersonList(database);
      return res.status(200).send(personList);
    }

    case "get_person": {
      const id = req?.body?.id;
      if(id === undefined) {
        return res.status(400).send("Invalid request action missing parameter body.id");
      }

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

    case "add_person": {
    }

    default: {
      return res.status(400).send("Invalid request action");
    }
  }
};
