//const mongoOperationQuery = require("../mongoOperationQuery");
//const sqlOperationQuery = require("../mySqlOperationQuery");
const getPerson = require("./get");

module.exports = function getDescendantsFromPerson(database, usedDatabase, personId) {

    return new Promise(async function (resolve, reject) {
        const person = await getPerson(database, usedDatabase, usedId);
        resolve(null);
    
    
    
    });
    


    /** ArrayList<Person> temp = new ArrayList<Person>();

		Person current = getPerson(personId);

		ArrayList<Relationship> relations = relationShipMethods.getRelationships(current);

		for (Relationship r : relations) {
			ArrayList<Person> children = relationShipMethods.getChildren(r.getUuid().toString());
			for (Person child : children) {
				temp.addAll(getDescendantsFromPerson(child.getUuid().toString()));
				temp.add(child);
			}
		}
 */
	





}