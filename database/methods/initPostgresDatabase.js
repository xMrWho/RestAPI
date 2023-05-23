//not tested

/** 
// Create table statements
const createTablesArray = [
  // personsTable
  {
    tableName: "persons",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS persons (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " gender TEXT NOT NULL," +
      " firstname VARCHAR(50) NOT NULL," +
      " middlename VARCHAR(50)," +
      " lastname VARCHAR(50) NOT NULL," +
      " birthday DATE," +
      " deathday DATE," +
      " info TEXT);",
  },
  {
    tableName: "relationships",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS relationships (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " person_id UUID NOT NULL REFERENCES persons(id)," +
      " partner_id UUID NOT NULL REFERENCES persons(id)," +
      " relationship_type TEXT NOT NULL," +
      " information TEXT);",
  },
  {
    tableName: "children",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS children (" +
      " rel_id UUID NOT NULL REFERENCES relationships(id) ON DELETE CASCADE," +
      " p_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE);",
  },
  {
    tableName: "hobbies",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS hobbies(" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " name VARCHAR(50) NOT NULL);",
  },
  {
    tableName: "person_hobbies",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS person_hobbies (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE," +
      " hobby_id UUID NOT NULL REFERENCES hobbies(id) ON DELETE CASCADE);",
  },
  {
    tableName: "cars",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS cars (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " year_of_construction INT," +
      " manufacturer VARCHAR(50)," +
      " model VARCHAR(50)," +
      " engine VARCHAR(50)," +
      " power_hp INT);",
  },
  {
    tableName: "person_cars",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS persons_cars (" +
      " person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE," +
      " car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE," +
      " PRIMARY KEY (person_id, car_id));",
  },
  {
    tableName: "jobs",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS jobs (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " name VARCHAR(50)," +
      " information TEXT," +
      " PRIMARY KEY (id)) ENGINE=InnoDB;",
  },
  {
    tableName: "person_jobs",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS person_jobs (" +
      " person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE," +
      " job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE," +
      " date_of_entry DATE," +
      " date_of_leave DATE," +
      " PRIMARY KEY (person_id, job_id));",
  },
  {
    tableName: "species",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS species (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " name VARCHAR(50) NOT NULL);",
  },
  {
    tableName: "animals",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS animals (" +
      " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
      " name VARCHAR(50) NOT NULL," +
      " given_name VARCHAR(50) NOT NULL," +
      " gender TEXT NOT NULL," +
      " birthdate DATE," +
      " deathday DATE," +
      " species_id UUID NOT NULL REFERENCES species(id) ON DELETE CASCADE," +
      " name VARCHAR(50) NOT NULL);",
  },
  {
    tableName: "pets",
    sqlStatement:
      "CREATE TABLE IF NOT EXISTS pets (" +
      "  id UUID PRIMARY KEY," +
      "  person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE," +
      "  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE);",
  },
];

module.exports = function initPostGresDb(database) {
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
*/