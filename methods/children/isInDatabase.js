module.exports = function isInDatabase(database, usedDatabase, parameters) {
  return new Promise(async function (resolve, reject) {
    switch (usedDatabase) {
      case "MongoDB": {
        resolve({ error: "Not implemented yet" });
        break;
      }
      case "MySQL": {
        break;
      }
      default: {
        resolve({ error: "Not implemented yet" });
        break;
      }
    }

    const children = await getChild(database, usedDatabase, parameters.rel_id);
    console.log("Children", children);

    //if (childExists && childExists.data && childExists.data.length > 0) {
    //resolve(true);
    //}

    resolve(false);
  });
};
