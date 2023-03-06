const createTablesArray = [
  // personsTable
  {
    tableName: "persons",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS persons (" +
      " id CHAR(36) NOT NULL," +
      " gender ENUM('Male', 'Female', 'Other') NOT NULL," +
      " firstname VARCHAR(50) NOT NULL," +
      " middlename VARCHAR(50)," +
      " lastname VARCHAR(50) NOT NULL," +
      " birthday DATE," +
      " deathday DATE," +
      " info TEXT," +
      " PRIMARY KEY (id)) ENGINE = InnoDB;",
  },
  {
    tableName: "relationships",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS relationships (" +
      " id CHAR(36) NOT NULL," +
      " person_id CHAR(36) NOT NULL," +
      " partner_id CHAR(36) NOT NULL," +
      " relationship_type ENUM('Marriage', 'Dating', 'Engaged', 'Life partners', 'Other') NOT NULL," +
      " information TEXT," +
      " PRIMARY KEY (id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id)," +
      " FOREIGN KEY (partner_id) REFERENCES persons(id)) ENGINE = InnoDB;",
  },
  {
    tableName: "children",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS children (" +
      " rel_id VARCHAR(36)," +
      " person_id VARCHAR(36)," +
      " FOREIGN KEY (rel_id) REFERENCES relationships(id)," +
      " FOREIGN KEY (p_id) REFERENCES persons(id)) ENGINE = InnoDB;",
  },
  {
    tableName: "hobbies",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS hobbies(" +
      " id CHAR(36) NOT NULL," +
      " name VARCHAR(50) NOT NULL," +
      " PRIMARY KEY(id)) ENGINE = InnoDB;",
  },
  {
    tableName: "person_hobbies",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS person_hobbies (" +
      " id CHAR(36) NOT NULL," +
      " person_id CHAR(36) NOT NULL," +
      " hobby_id INT NOT NULL," +
      " PRIMARY KEY (id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE," +
      " FOREIGN KEY (hobby_id) REFERENCES hobbies(id) ON DELETE CASCADE)) ENGINE = InnoDB;",
  },
  {
    tableName: "cars",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS cars (" +
      " id CHAR(36) NOT NULL," +
      " year_of_construction INT," +
      " manufacturer VARCHAR(50)," +
      " model VARCHAR(50)," +
      " engine VARCHAR(50)," +
      " power_hp INT," +
      " PRIMARY KEY (id)) ENGINE=InnoDB;",
  },
  {
    tableName: "person_cars",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS person_cars (" +
      " person_id CHAR(36) NOT NULL," +
      " car_id CHAR(36) NOT NULL," +
      " PRIMARY KEY (person_id, car_id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id)," +
      " FOREIGN KEY (car_id) REFERENCES cars(id)) ENGINE=InnoDB;",
  },
  {
    tableName: "jobs",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS jobs (" +
      " id CHAR(36) NOT NULL," +
      " name VARCHAR(50)," +
      " information TEXT," +
      " PRIMARY KEY (id)) ENGINE=InnoDB;",
  },
  {
    tableName: "person_jobs",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS persons_cars (" +
      " person_id CHAR(36) NOT NULL," +
      " job_id CHAR(36) NOT NULL," +
      " date_of_entry DATE," +
      " date_of_leave DATE," +
      " PRIMARY KEY (person_id, job_id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id)," +
      " FOREIGN KEY (job_id) REFERENCES jobs(id)) ENGINE=InnoDB;",
  },
  {
    tableName: "species",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS species (" +
      " id CHAR(36) NOT NULL," +
      " name VARCHAR(50) NOT NULL," +
      " PRIMARY KEY (id)) ENGINE=InnoDB;",
  },
  {
    tableName: "animals",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS animals (" +
      " id CHAR(36) NOT NULL," +
      " species_id INT UNSIGNED NOT NULL," +
      " name VARCHAR(50) NOT NULL," +
      " PRIMARY KEY (id)," +
      " FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE) ENGINE=InnoDB;",
  },
  {
    tableName: "pets",
    sqlStatement:
      "CREATE TABLE pets (" +
      " id CHAR(36) NOT NULL," +
      " person_id CHAR(36) NOT NULL," +
      " animal_id CHAR(36) NOT NULL," +
      " birthdate DATE," +
      " deathday DATE," +
      " PRIMARY KEY (id)," +
      " FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE," +
      " FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE) ENGINE=InnoDB;",
  },
];

module.exports = function initMySQLDb(database) {
  return new Promise(async function (resolve, reject) {
    for (const entry of createTablesArray) {
      const createStatement = await database.query(
        entry.sqlStatement,
        function (error, results) {
          if (error) {
            return {
              error: "Error creating " + entry.tableName + " table",
              msg: error.message,
              stack: error.stack,
            };
          } else {
            console.log("Table " + entry.tableName);
            console.log(results);
            return true;
          }
        }
      );

      if (createStatement.error) {
        resolve(createStatement);
      }
    }

    resolve(true);
  });
};
