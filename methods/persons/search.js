module.exports = function searchPerson(database, usedDatabase, parameter) {
  return new Promise(async function (resolve, reject) {
    try {
      const firstname = parameter?.firstname;
      const lastname = parameter?.lastname;
      console.log("firstname:", firstname);
      console.log("lastname:", lastname);

      if (
        firstname != null &&
        firstname !== "" &&
        lastname != null &&
        lastname !== ""
      ) {
        if (!/^[a-zA-Z]+$/.test(lastname) && !/^[a-zA-Z]+$/.test(firstname)) {
          resolve({
            error: "An Error occurred",
            msg: "First- and/or lastname cannot contain any numbers",
          });
        } else {
          switch (usedDatabase) {
            // Add the implementation for each supported database
            case "MongoDB": {
              resolve({ error: "Not implemented yet MONGO" });
            }
            case "MySQL": {
              const sqlString =
                "SELECT * FROM person WHERE firstname LIKE '%" +
                firstname +
                "%' AND lastname LIKE '%" +
                lastname +
                "%'";
              const response = await database.query(sqlString);
              console.log("SQL Query Response:", response);

              if (Array.isArray(response)) {
                console.log("RESPONSE !!!");
                resolve({data: response });
              } else {
                resolve ({
                  error: "Error retrieving data from the database",
                  msg: response.message,
                  stack: response.stack,
                });
              }
            }
            default: {
              resolve({ error: "Not implemented yet DEFAULT" });
            }
          }
        }
      } else if (
        (firstname == null || firstname === "") &&
        lastname != null &&
        lastname !== ""
      ) {
        if (!/^[a-zA-Z]+$/.test(lastname)) {
          resolve({
            error: "An Error occurred",
            msg: "First- and/or lastname cannot contain any numbers",
          });
        } else {
          switch (usedDatabase) {
            case "MongoDB": {
              resolve( { error: "Not implemented yet MONGO" });
              break;
            }
            case "MySQL": {
              const sqlString =
                "SELECT * FROM persons WHERE lastname LIKE '%" +
                lastname +
                "%'";
              const response = await database.query(sqlString);
              console.log("SQL Query Response:", response);

              if (Array.isArray(response)) {
                console.log("RESPONSE !!!");
                resolve({ data: response });
              } else {
                resolve({
                  error: "Error retrieving data from the database",
                  msg: response.message,
                  stack: response.stack,
                });
              }
              break;
            }
            default: {
              resolve({ error: "Not implemented yet" });
              break;
            }
          }
        }
      } else if (
        firstname != null &&
        firstname !== "" &&
        (lastname == null || lastname === "")
      ) {
        if (!/^[a-zA-Z]+$/.test(firstname)) {
          resolve({
            error: "An Error occurred",
            msg: "First- and/or lastname cannot contain any numbers",
          });
        } else {
          switch (usedDatabase) {
            // Add the implementation for each supported database
            case "MongoDB": {
              resolve({ error: "Not implemented yet MONGO" });
              break;
            }
            case "MySQL": {
              const sqlString =
                "SELECT * FROM persons WHERE firstname LIKE '%" +
                firstname +
                "%'";
              const response = await database.query(sqlString);
              console.log("SQL Query Response:", response);

              if (Array.isArray(response)) {
                console.log("RESPONSE !!!");
                resolve({ data: response });
              } else {
                resolve({
                  error: "Error retrieving data from the database",
                  msg: response.message,
                  stack: response.stack,
                });
                break;
              }
            }
            default: {
              resolve({ error: "Not implemented yet DEFAULT" });
              break;
            }
          }
        }
      } else {
        resolve({ error: "Invalid request" });
      }
    } catch (error) {
      console.error("Error occurred in searchPerson:", error);
      resolve({ error: "Something went wrong" });
    }
  });
};
