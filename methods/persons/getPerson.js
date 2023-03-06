module.exports = function getPerson(database, usedDatabase, personId) {
  const selectStatement = "SELECT * FROM persons WHERE id=" + personId;
  let operation;
  switch (usedDatabase) {
    case "MongoDB": {
      const db = database.getConnection();
      operation = db.collection("persons").find({_id: ObjectId(personId)});
      break;
    }
    case "MySQL": {
      operation = database.query(selectStatement);
      break;
    }
    default: {
      operation = database.query(selectStatement);
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
