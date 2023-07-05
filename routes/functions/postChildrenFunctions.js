const getChild = require("../../methods/children/get");
const getChildList = require("../../methods/children/getList");
const addChild = require("../../methods/children/add");
const deleteChild = require("../../methods/children/delete");
const childExists = require("../../methods/children/exists");
const removeOne = require("../../methods/children/removeOneChild");
const getParents = require("../../methods/children/getParents");
const isInDatabase = require("../../methods/children/isInDatabase");

/**
 * A description of the entire function.
 *
 * @param {object} options - the options for the function
 * @return {Promise} a promise that resolves to the result of the function
 */
module.exports = async function postChildrenFunctions(options) {
  const { req, res, next, dbManager, usedDatabase } = options;
  try {
    switch (req.body.action) {
      case "is_in_database": {
        const person_id = req?.body?.params?.person_id;
        if (person_id === undefined) {
          return res.sendError(404, "Missing parameter person_id");
        }
        const isInDatabaseResponse = await isInDatabase(
          dbManager,
          usedDatabase,
          person_id
        );
        return res.status(200).send(isInDatabaseResponse);
      }
      case "add": {
        if (!req.body.params) {
          return res
            .status(400)
            .send("Invalid request action missing Missing parameters: params");
        }
        const addResponse = await addChild(dbManager, usedDatabase, {
          ...req.body.params,
        });

        return res.status(200).send(addResponse);
      }
      case "exists": {
        const rel_id = req?.body?.params?.rel_id;
        if (rel_id === undefined) {
          return res
            .status(400)
            .send(
              "Invalid request action missing parameter body.params.rel_id"
            );
        }

        const existsResponse = await childExists(
          dbManager,
          usedDatabase,
          ...req.body.params
        );
        return res.status(200).send(existsResponse);
      }
      case "remove_one": {
        const rel_id = req?.body?.params?.rel_id;
        const person_id = req?.body?.params?.person_id;
        if (rel_id === undefined && person_id === undefined) {
          return res.send(
            "Invalid request action missing parameter rel_id and person_id"
          );
        }

        const removeOneResponse = await removeOne(
          dbManager,
          usedDatabase,
          rel_id,
          {
            ...req.body.params,
          }
        );
        return res.status(200).send(removeOneResponse);
      }

      case "delete": {
        const id = req?.body?.params?.id;
        if (id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter body.params.id");
        }
        const deleteResponse = await deleteChild(dbManager, usedDatabase, id);

        return res.status(200).send(deleteResponse);
      }
      case "get_all": {
        const getAllResponse = await getChildList(dbManager, usedDatabase);
        return res.status(200).send(getAllResponse);
      }
      case "get": {
        if (!req.body.params.rel_id) {
          return res
            .status(400)
            .send(
              "Invalid request action missing Missing parameters: params.rel_id"
            );
        }
        const getResponse = await getChild(dbManager, usedDatabase, rel_id);
        return res.status(200).send(getResponse);
      }
      case "get_parents": {
        const person_id = req.body.params.person_id;
        if (person_id === undefined) {
          return res
            .status(400)
            .send("Invalid request action missing parameter person_id");
        }

        const getParentsResponse = await getParents(dbManager, usedDatabase, {
          ...req.body.params,
        });

        return res.status(200).send(getParentsResponse);
      }

      // TODO: Implement the code for the methods/children folder
      default: {
        return res.status(400).send("Invalid request action");
      }
    }
  } catch (err) {
    console.log("Catch case with error", err);
    next(err);
  }
};
