module.exports = async function postPersonFunctions(options) {
  const { req, res, next, dbManager, usedDatabase } = options;

  const getPersonList = require("../../methods/persons/getPersonList.js");
  const getPerson = require("../../methods/persons/getPerson.js");
  const addPerson = require("../../methods/persons/addPerson.js");
  const updatePerson = require("../../methods/persons/updatePerson.js");

  try {
    switch (req.body.action) {
      case "get_all_persons": {
        const personList = await getPersonList(dbManager, usedDatabase);
        return res.status(200).send(personList);
      }

      case "get_person": {
        const id = req?.body?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.id");
        }

        const person_res = await getPerson(dbManager, usedDatabase, id);
        return res.status(200).send(person_res);
      }

      case "add_person": {
        // Check if the required parameters are present in the request body
        const requiredParams = ["name", "firstname", "birthday", "gender", ""];
        const missingParams = requiredParams.filter(
          (param) => req?.body?.[param] === undefined
        );
        if (missingParams.length > 0) {
          return res.status(400).send(`Missing parameters: ${missingParams.join(", ")}`);
        }

        // Call a method to add the person to the database

        const addedPerson = await addPerson(dbManager, usedDatabase, {
          ...req.body
          // You could also include any other optional parameters here if desired
        });

        return res.status(200).send(addedPerson);
      }

      case "update_person": {
        const id = req?.body?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.id");
        }

        // Check if at least one parameter is being updated
        const updatedParams = Object.keys(req.body).filter(function (param) {
          return param !== "id";
        });

        if (updatedParams.length === 0) {
          return res.status(400).send("No parameters to update");
        }

        // Call a method to update the person in the database
        const updatedPerson = await updatePerson(dbManager, usedDatabase, {
          id,
          ...req.body,
        });

        return res.status(200).send(updatedPerson);
      }

      default: {
      return res.status(400).send("Invalid request action");
    }
  }}
  catch (err) {
  // Handle any errors that occur during the request
  next(err);
}
};
