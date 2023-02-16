const router = require("express").Router();
const postPersonFunction = require("./functions/postPersonFunction.js");

router.use("/persons", require("./persons/index"));
app.post("/persons", authenticate, function (req, res) {
  return postPersonFunction(req, res, next);
});

app.put("/persons/:id", authenticate, function (req, res) {
  const id = req.params.id;
  const { name, motherId, fatherId } = req.body;

  const sql =
    "UPDATE persons SET name = ?, mother_id = ?, father_id = ? WHERE id = ?";
  const values = [name, motherId, fatherId, id];

  database.query(sql, values, function (error, results) {
    if (error) {
      return res.status(500).send("Error updating data in database");
    } else if (results.affectedRows === 0) {
      return res.status(404).send("Person not found");
    } else {
      return res.status(200).send("Person updated successfully");
    }
  });
});

app.delete("/persons/:id", authenticate, function (req, res) {
  const id = req.params.id;
  const sql = "DELETE FROM persons WHERE id = ?";
  const values = [id];

  database.query(sql, values, (error, results) => {
    if (error) {
      res.status(500).send("Error deleting data from database");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Data not found");
    } else {
      res.status(204).send();
    }
  });
});

router.get("*", function callback(req, res, next) {
  res.status(404);
  res.send({ message: "Not allowed!" });
});

module.exports = router;
