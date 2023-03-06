module.exports = function getPersonList(database, usedDatabase) {
  const selectAllStatement = "SELECT * FROM persons";
  let operation;
  switch (usedDatabase) {
    case "MongoDB": {
      const db = database.getConnection();
      operation = db.collection("persons").find({});
      break;
    }
    case "MySQL": {
      operation = database.query(selectAllStatement);
      break;
    }
    default: {
      operation = database.query(selectAllStatement);
      break;
    }
  }

  return new Promise(async function (resolve, reject) {
    const response = await operation;
    if (Array.isArray(response)) {
      resolve({
        data: response,
      });
    } else {
      resolve({
        error: "Error retrieving data from database",
        msg: response.message,
        stack: response.stack,
      });
    }
  });
};
