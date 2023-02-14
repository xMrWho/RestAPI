const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const MySQL = require('./MySQL.js');

const app = express();
const PORT = 3000;
const API_KEY = 'CDexzHMp#aA3xCJSD^56&Cu@nha';

const sqlConfigFile = path.join(__dirname, 'mySql.json');

const sqlConfigData = fs.readFileSync(sqlConfigFile);
const sqlConfig = JSON.parse(sqlConfigData);

const database = new MySQL(sqlConfig);
database.connect();

app.use(bodyParser.json());

// GET request to retrieve data from database
app.get('/persons', function (req, res) {
  // Your SELECT query here
  res
    .status(500)
    .send('U are not allowed to use this without our secret api key');
});

// POST request to add data to database
// POST request to handle different requests
app.post('/persons', function (req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    res.status(401).send('Unauthorized - Please control your API-Key');
    return;
  }

  const selectAllStatement = 'SELECT * FROM persons';
  const getStatement = 'SELECT * FROM persons WHERE id = ?';

  // Switch statement to handle different request cases
  switch (req.body.action) {
    case 'get_all_persons':
      // Your SELECT query here to retrieve all persons
      database.query(selectAllStatement, function (error, results) {
        if (error) {
          return res.status(500).send('Error retrieving data from database');
        } else {
          return res.status(200).json(results);
        }
      });
      break;

    case 'get_person': {
      const id = req.body.id;
      // Your SELECT query here to retrieve specified person
      const values = [id];
      database.query(getStatement, values, function (error, results) {
        if (error) {
          return res.status(500).send('Error retrieving data from database');
        } else if (results.length === 0) {
          return res.status(404).send('Person not found');
        } else {
          return res.status(200).json(results[0]);
        }
      });
      break;
    }

    default: {
      return res.status(400).send('Invalid request action');
    }
  }
});

app.put('/persons/:id', function (req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    res.status(401).send('Unauthorized');
    return;
  }

  const id = req.params.id;
  const { name, motherId, fatherId } = req.body;

  // Update person's name and parents' IDs
  const sql =
    'UPDATE persons SET name = ?, mother_id = ?, father_id = ? WHERE id = ?';
  const values = [name, motherId, fatherId, id];

  database.query(sql, values, function(error, results) {
    if (error) {
      return res.status(500).send('Error updating data in database');
    } 
    else if (results.affectedRows === 0) {
      return res.status(404).send('Person not found');
    } 
    else {
      return res.status(200).send('Person updated successfully');
    }
  });
});

// DELETE request to remove data from database
app.delete('/person/:id', function (req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    res.status(401).send('Unauthorized');
    return;
  }
  const id = req.params.id;
  // Your DELETE query here
  const sql = 'DELETE FROM your_table_name WHERE id = ?';
  const values = [id];
  database.query(sql, values, (error, results) => {
    if (error) {
      res.status(500).send('Error deleting data from database');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Data not found');
    } else {
      res.status(204).send();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
