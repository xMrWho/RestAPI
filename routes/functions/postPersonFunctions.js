module.exports = async function postPersonFunctions(options) {

const getPerson = require("../../methods/persons/get");
const getPersonList = require("../../methods/persons/getList");
const addPerson = require("../../methods/persons/add");
const getDescendantsFromPerson = require("../../methods/persons/getDescendants");
const searchPerson = require("../../methods/persons/search");
const updatePerson = require("../../methods/persons/update");


  const { req, res, next, dbManager, usedDatabase } = options;
  try {
    switch (req.body.action) {
      //WORKING
      case "get_all": {
        const getAllResponse = await getPersonList(dbManager, usedDatabase);
        return res.status(200).send(getAllResponse);
      }

      //WORKING
      case "get": {
        const id = req?.body?.params?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter: params.id");
        }

        const getResponse = await getPerson(dbManager, usedDatabase, id);
        return res.status(200).send(getResponse);
      }

      //WORKING
      case "add": {
        // Check if the required parameters are present in the request body
        if (!req.body.params) {
          return res
            .status(400)
            .send("Invalid request action missing Missing parameters: params");
        }

        if (!req.body.params.lastname) {
          return res
            .status(400)
            .send(
              "Invalid request action missing Missing parameters: params.lastname"
            );
        }

        if (!req.body.params.firstname) {
          return res
            .status(400)
            .send(
              "Invalid request action missing Missing parameters: params.firstname"
            );
        }

        // Call a method to add the person to the database
        const addResponse = await addPerson(dbManager, usedDatabase, {
          ...req.body.params,
        });

        return res.status(200).send(addResponse);
      }

      //working
      case "update": {
        const id = req?.body?.params?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.params.id");
        }

        // Check if at least one parameter is being updated
        const updatedParams = Object.keys(req.body.params).filter(function (
          param
        ) {
          return param !== "id";
        });

        if (updatedParams.length === 0) {
          return res.status(400).send("No parameters to update");
        }

        // Call a method to update the person in the database
        const updateResponse = await updatePerson(dbManager, usedDatabase, {
          ...req.body.params,
        });

        return res.status(200).send(updateResponse);
      }

      //working:
      case "delete": {
        const id = req?.body?.params?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.params.id");
        }
        // Call a method to update the person in the database
        const deleteResponse = await deletePerson(dbManager, usedDatabase, id);

        return res.status(200).send(deleteResponse);
      }
      //search: to be tested
      case "search": {
        if (!req.body.params) {
          return res
            .status(400)
            .send("Invalid request action missing Missing parameters: params");
        }


        if (!req.body.params.firstname && !req.body.params.lastname) {
          return res
            .status(400)
            .send(
              "Invalid request action missing Missing parameters: params.firstname or params.lastname"
            );
        }
        
        const searchResponse = await searchPerson(dbManager, usedDatabase, {
          ...req.body.params,
        });

        console.log("searchResponse",searchResponse)


        return res.status(200).send(searchResponse);

      }

      default: {
        return res.status(400).send("Invalid request action");
      }
    }
  } catch (err) {
    console.log("Catch case with error", err)
    // Handle any errors that occur during the request
    next(err);
  }
};
