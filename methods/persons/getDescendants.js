// const getPerson = require("./get");
const getRelationshipsFromPerson = require("../relationships/getFromPerson");
const getChildren = require("../children/get");


/**
 * Retrieves the descendants of a person from the given database.
 *
 * @param {Object} database - The database containing the person and relationship data.
 * @param {Object} usedDatabase - The database used for storing temporary data.
 * @param {string} personId - The ID of the person to retrieve descendants from.
 * @return {Promise} A promise that resolves with an array of descendants.
 */
module.exports = function getDescendantsFromPerson(database, usedDatabase, personId) {

    return new Promise(async function (resolve, reject) {
        const temp = [];
        const relations = await getRelationshipsFromPerson(database, usedDatabase, {personId: personId});
        console.log("relations", relations);
        for (const relation of relations) {
            console.log("relation", relation);
            const children = getChildren(database, usedDatabase, relation.id);
            for (const child of children) {
                temp.push(...await getDescendantsFromPerson(child.getUuid().toString()));
                temp.push(child);
            }
        }

        resolve(temp);
    });
}
