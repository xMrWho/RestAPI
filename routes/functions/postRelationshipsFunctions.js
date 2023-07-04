/**
 * A description of the entire function.
 *
 * @param {object} options - the options for the function
 * @return {Promise} a promise that resolves to the result of the function
 */
module.exports = async function postRelationshipsFunctions(options) {
  const getRelationship = require("../../methods/relationships/get");
  const getRelationshipList = require("../../methods/relationships/getList");
  const getFromPerson = require("../../methods/relationships/getFromPerson");
  const addRelationship = require("../../methods/relationships/add");
  const deleteRelationship = require("../../methods/relationships/delete");
  const updateRelationship = require("../../methods/relationships/update");
  const existsRelationship = require("../../methods/relationships/exists");
  const { req, res, next, dbManager, usedDatabase } = options;
  try {
    switch (req.body.action) {
      // TODO: Implement the code for the methods/relationships folder
      case "get_all": {
        const getAllResponse = await getRelationshipList(
          dbManager,
          usedDatabase
        );
        return res.status(200).send(getAllResponse);
      }
      case "add": {
        if (!req.body.params) {
          return res
            .status(400)
            .send("Invalid request action missing Missing parameters: params");
        }
        const addResponse = await addRelationship(dbManager, usedDatabase, {
          ...req.body.params,
        });

        return res.status(200).send(addResponse);
      }
      case "delete": {
        const id = req?.body?.params?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.params.id");
        }
        // Call a method to update the person in the database
        const deleteResponse = await deleteRelationship(
          dbManager,
          usedDatabase,
          id
        );

        return res.status(200).send(deleteResponse);
      }
      case "exists": {
        const id = req?.body?.params?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.params.id");
        }

        const existsResponse = await existsRelationship(
          dbManager,
          usedDatabase,
          id
        );
        return res.status(200).send(existsResponse);
      }
      case "get": {
        if (!req.body.params) {
          return res
            .status(400)
            .send("Invalid request action missing Missing parameters: params");
        }
        const getResponse = await getRelationship(dbManager, usedDatabase, {
          ...req.body.params,
        });
        return res.status(200).send(getResponse);
      }
      case "get_from_person": {
        const personId = req?.body?.params?.personId;
        if (personId === undefined) {
          return res
            .status(400)
            .send(
              "Invalid request action missing parameter body.params.personId"
            );
        }
        const getFromPersonResponse = await getFromPerson(dbManager, usedDatabase, {
          ...req.body.params,
        });
        return res.status(200).send(getFromPersonResponse);
      }
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
        const updateResponse = await updateRelationship(
          dbManager,
          usedDatabase,
          {
            ...req.body.params,
          }
        );

        return res.status(200).send(updateResponse);
      }
    }
  } catch (err) {
    console.log("Catch case with error", err);
    // Handle any errors that occur during the request
    next(err);
  }
};
