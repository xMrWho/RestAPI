const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const MySQL = require('./MySQL');

const app = express();
const PORT = 3000;
const API_KEY = 'your-secret-api-key';

const sqlConfigFile = path.join(__dirname, 'mySql.json')

const sqlConfigData = fs.readFileSync(sqlConfigFile);
const sqlConfig = JSON.parse(sqlConfigData);

const mysql = new MySQL(sqlConfig);
mysql.connect();

app.use(bodyParser.json());

// GET request to retrieve data from database
app.get('/persons', (req, res) => {
  // Your SELECT query here
     res.status(500).send('U are not allowed to use this without our secret api key');

});

// POST request to add data to database
app.post('/persons', function(req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    res.status(401).send('Unauthorized');
    return;
  }
  if(req.body) {
    
  }



  const { name, value } = req.body;
  // Your INSERT query here
  const sql = 'INSERT INTO your_table_name (name, value) VALUES (?, ?)';
  const values = [name, value];
  mysql.query(sql, values, (error, results) => {
    if (error) {
      res.status(500).send('Error adding data to database');
    } else {
      res.status(201).json({ id: results.insertId });
    }
  });
});

// DELETE request to remove data from database
app.delete('/person/:id', function(req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    res.status(401).send('Unauthorized');
    return;
  }
  const id = req.params.id;
  // Your DELETE query here
  const sql = 'DELETE FROM your_table_name WHERE id = ?';
  const values = [id];
  mysql.query(sql, values, (error, results) => {
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
