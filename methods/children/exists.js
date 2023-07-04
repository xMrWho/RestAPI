
/**
 * Check if child exists in a relationship
 * @param {Database} database - The database
 * @param {UsedDatabase} usedDatabase - The used database
 * @param {Parameters} parameters - The parameters
 * @returns {Promise<boolean>} - Returns true if child exists
 */
module.exports =  function ifChildExists(database, usedDatabase, parameters) {
  // Import the `getChild` function from the same directory
  const getChild = require("./get");

  return new Promise(async function (resolve, reject) {
     // Get the child from the database based on `parameters.rel_id`
  const children = await getChild(database, usedDatabase, parameters.rel_id);
  console.log("Children", children);
  // If the child exists, return true
  // if (children.length > 0) {
  //   resolve(true);
  // } ;

  // Since the code inside the if statement is commented out,
  // it is not doing anything. Therefore, we can remove it.

  // Return false by default
  resolve(false);

  
  });

 
};
