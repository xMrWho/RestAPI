module.exports = function ifChildExists(database, usedDatabase, parameters) {
    const getChild = require("./get");
  
    return new Promise(async function (resolve, reject) {
      const children = await getChild(database, usedDatabase, parameters.rel_id);
      console.log("Children", children);


      //if (childExists && childExists.data && childExists.data.length > 0) {
        //resolve(true);
      //}
  
      resolve(false);
    });
  };
  