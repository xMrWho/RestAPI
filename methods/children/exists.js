module.exports = function ifChildExists(database, usedDatabase, personId) {
    const getChild = require("./get");
  
    return new Promise(async function (resolve, reject) {
      const childExists = await getChild(database, usedDatabase, personId);
  
      if (childExists && childExists.data && childExists.data.length > 0) {
        resolve(true);
      }
  
      resolve(false);
    });
  };
  