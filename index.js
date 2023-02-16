const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

// const https = require('https');
// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

// const credentials = {key: privateKey, cert: certificate};

const MySQL = require('./MySQL.js');

const app = express();
const PORT = 3000;
const sqlConfigFile = path.join(__dirname, 'mySql.json');
const apiKeyFile = path.join(__dirname, 'api_key.txt');

const sqlConfig = JSON.parse(fs.readFileSync(sqlConfigFile));
const API_KEY = fs.readFileSync(apiKeyFile).toString();

const database = new MySQL(sqlConfig);
database.connect();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to attach database manager to request object
app.use(function(req, res, next) {

  req.database = database;
  next();
});

const authenticate = function (req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(401).send('Unauthorized - Please control your API-Key');
  }
  next();
};

const routes = require('./routes');
app.use(routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({'errors': {
    message: err.message,
    error: err
  }});
});

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

const server = httpServer.listen(3000, function callback() {
    console.log('Listening on port ' + server.address().port);
});
// httpsServer.listen(8443);