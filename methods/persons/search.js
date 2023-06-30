module.exports = async function searchPerson(
  database,
  usedDatabase,
  parameter
) {
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
        return {
          error: "An Error occurred",
          msg: "First- and/or lastname cannot contain any numbers",
        };
      } else {
        switch (usedDatabase) {
          // Add the implementation for each supported database
          case "MongoDB": {
            return { error: "Not implemented yet MONGO" };
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
              return { data: response };
            } else {
              return {
                error: "Error retrieving data from the database",
                msg: response.message,
                stack: response.stack,
              };
            }
          }
          default: {
            return { error: "Not implemented yet DEFAULT" };
          }
        }
      }
    } else if (
      (firstname == null || firstname === "") &&
      lastname != null &&
      lastname !== ""
    ) {
      if (!/^[a-zA-Z]+$/.test(lastname)) {
        return {
          error: "An Error occurred",
          msg: "First- and/or lastname cannot contain any numbers",
        };
      } else {
        switch (usedDatabase) {
          case "MongoDB": {
            return { error: "Not implemented yet MONGO" };
          }
          case "MySQL": {
            const sqlString =
              "SELECT * FROM persons WHERE lastname LIKE '%" + lastname + "%'";
            const response = await database.query(sqlString);
            console.log("SQL Query Response:", response);

            if (Array.isArray(response)) {
              console.log("RESPONSE !!!");
              return { data: response };
            } else {
              return {
                error: "Error retrieving data from the database",
                msg: response.message,
                stack: response.stack,
              };
            }
          }
          default: {
            return { error: "Not implemented yet MONGO" };
          }
        }
      }
    } else if (
      firstname != null &&
      firstname !== "" &&
      (lastname == null || lastname === "")
    ) {
      if (!/^[a-zA-Z]+$/.test(firstname)) {
        return {
          error: "An Error occurred",
          msg: "First- and/or lastname cannot contain any numbers",
        };
      } else {
        switch (usedDatabase) {
          // Add the implementation for each supported database
          case "MongoDB": {
            return { error: "Not implemented yet MONGO" };
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
              return { data: response };
            } else {
              return {
                error: "Error retrieving data from the database",
                msg: response.message,
                stack: response.stack,
              };
            }
          }
          default: {
            return { error: "Not implemented yet DEFAULT" };
          }
        }
      }
    } else {
      return { error: "Invalid request" };
    }
  } catch (error) {
    console.error("Error occurred in searchPerson:", error);
    return { error: "Something went wrong" };
  }
};
