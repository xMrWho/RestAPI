const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const MySQL = require('./MySQL.js');

const app = express();
const PORT = 3000;
const API_KEY = 'CDexzHMp#aA3xCJSD^56&Cu@nha';
const sqlConfigFile = path.join(__dirname, 'mySql.json');

const sqlConfig = JSON.parse(fs.readFileSync(sqlConfigFile));
const database = new MySQL(sqlConfig);
database.connect();


app.use(bodyParser.json());

const authenticate = function (req, res, next) {
  const apiKey = req.headers['x-api-key'];
  console.log('NEW REQUEST WITH API_KEY', apiKey);

  if (apiKey !== API_KEY) {
    return res.status(401).send('Unauthorized - Please control your API-Key');
  }
  next();
};

app.get('*', function callback(req, res, next) {
  res.status(404);
  res.send({ message: 'Not allowed!' });
});

app.post('/persons', authenticate, function (req, res) {
  const selectAllStatement = 'SELECT * FROM persons';
  const getStatement = 'SELECT * FROM persons WHERE id = ?';

  switch (req.body.action) {
    case 'get_all_persons':
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

app.put('/persons/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const { name, motherId, fatherId } = req.body;

  const sql =
    'UPDATE persons SET name = ?, mother_id = ?, father_id = ? WHERE id = ?';
  const values = [name, motherId, fatherId, id];

  database.query(sql, values, function (error, results) {
    if (error) {
      return res.status(500).send('Error updating data in database');
    } else if (results.affectedRows === 0) {
      return res.status(404).send('Person not found');
    } else {
      return res.status(200).send('Person updated successfully');
    }
  });
});

app.delete('/persons/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM persons WHERE id = ?';
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

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
