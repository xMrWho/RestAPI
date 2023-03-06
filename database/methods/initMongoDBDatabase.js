module.exports = function initMongoDb(database) {
  return new Promise(async function (resolve, reject) {
    const db = database.getConnection();

    try {
      await Promise.all([
        db.createCollection("persons"),
        db
          .collection("persons")
          .createIndexes([{ key: { id: 1 }, unique: true }]),

        db.createCollection("relationships"),
        db
          .collection("relationships")
          .createIndexes([
            { key: { id: 1 }, unique: true },
            { key: { person_id: 1 } },
            { key: { partner_id: 1 } },
          ]),

        db.createCollection("children"),
        db
          .collection("children")
          .createIndexes([{ key: { rel_id: 1 } }, { key: { p_id: 1 } }]),

        db.createCollection("hobbies"),
        db
          .collection("hobbies")
          .createIndexes([{ key: { id: 1 }, unique: true }]),

        db.createCollection("person_hobbies"),
        db
          .collection("person_hobbies")
          .createIndexes([{ key: { person_id: 1 } }, { key: { hobby_id: 1 } }]),

        db.createCollection("cars"),
        db.collection("cars").createIndexes([{ key: { id: 1 }, unique: true }]),

        db.createCollection("person_cars"),
        db
          .collection("persons_cars")
          .createIndexes([{ key: { person_id: 1 } }, { key: { car_id: 1 } }]),

        db.createCollection("species"),
        db
          .collection("species")
          .createIndexes([{ key: { id: 1 }, unique: true }]),

        db.createCollection("animals"),
        db
          .collection("animals")
          .createIndexes([
            { key: { id: 1 }, unique: true },
            { key: { species_id: 1 } },
          ]),

        db.createCollection("pets"),
        db
          .collection("pets")
          .createIndexes([
            { key: { id: 1 }, unique: true },
            { key: { person_id: 1 } },
            { key: { animal_id: 1 } },
          ]),
      ]);

      resolve(true);
    } catch (error) {
      throw new Error(
        `Error initializing MongoDB collections: ${error.message}`
      );
    }
  });
};
