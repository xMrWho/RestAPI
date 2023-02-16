module.exports = function getPersonList(database) {
  const selectAllStatement = "SELECT * FROM persons";

  return new Promise(async function (resolve, reject) {
    const response = await database.query(selectAllStatement);
    if (Array.isArray(response)) {
      resolve({
        data: response
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
