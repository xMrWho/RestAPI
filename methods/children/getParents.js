/**
 * Retrieves the parents of a given relationship from the specified database.
 *
 * @param {string} database - The name of the database.
 * @param {string} usedDatabase - The type of database used.
 * @param {string} rel_id - The ID of the relationship.
 * @return {Promise} A promise that resolves to an object containing the parents of the relationship, or an error object if an error occurs.
 */
module.exports = function getParents(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (usedDatabase) {
        case "MongoDB": {
          resolve({ error: "Not implemented yet" });
          break;
        }
        case "MySQL": {
          const sqlGetRelFromChild = "SELECT rel_id FROM " + database + ".relationship WHERE person_id = ?";
          const [rel_id] = await db.query(sqlGetRelFromChild, parameters);
          console.log("Database rel_id", rel_id);
          if (!rel_id) {
            resolve({ error: "No relationship found" });
            break;
          }
          const persons = await getPersonsInRelationship(rel_id);
          console.log("Persons", persons);

          resolve(persons);
          break;
        }
        default: {
          resolve({ error: "Not implemented yet" });
          break;
        }
      }
    } catch (err) {
      return resolve({
        error: "An Error occurred",
        msg: err.message,
        stack: err.stack,
      });
    }
  });
};


/**
 * Retrieves the persons involved in a specified relationship.
 *
 * @param {*} rel_id - The ID of the relationship.
 * @return {Promise<Array>} A promise that resolves to an array of persons involved in the relationship.
 */
async function getPersonsInRelationship(rel_id) {
  const getPersonsFromRelationShip = "SELECT * FROM relationships WHERE id = ?";

  return await db.query(getPersonsFromRelationShip, rel_id);
}
