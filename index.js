// DEPENDENCIES
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const rateLimit = require("express-rate-limit");
// const https = require('https');

// REQUIREMENTS
const APIMiddleware = require("./routes/APIMiddleware");
const Routways = require("./routes/Routways");

const myDatebase = require("./database/initDatabase");
const CONSTANTS = require("./CONSTANTS");

// FILES

const apiKeyFile = path.join(__dirname, "api_key.txt");
// const privateKeyHttps  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificateHttps = fs.readFileSync('sslcert/server.crt', 'utf8');

// const credentials = {key: privateKey, cert: certificate};

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window: 15 minutes
  max: 100, // max requests: 100 per 15 minutes
  message:
    "Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut.",
});

/**
 *
 */
async function initServer() {
  const app = express();
  const PORT = 3000;

  const API_KEY = fs.readFileSync(apiKeyFile).toString();

  const databaseConfigFile = CONSTANTS.DATABASE.configFile;
  const databaseConfig = JSON.parse(fs.readFileSync(databaseConfigFile));

  this.database = await myDatebase(
    CONSTANTS.DATABASE.usedDatabase,
    databaseConfig
  );

  if (!this.database.checkConnection()) {
    throw new Error("Database Connection failed");
  }

  app.use(limiter);

  // Content Security Policy
  const cspOptions = {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  };

  app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", cspOptions.directives);
    next();
  });

  /**   app.use(
    cors({
      origin: "*",
    })
  ); */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const apiMiddleware = new APIMiddleware({
    databaseManager: this.database,
    usedDatabase: CONSTANTS.DATABASE.usedDatabase,
    API_KEY: API_KEY,
  });

  const routways = new Routways(apiMiddleware);
  routways.setupRoutes();

  app.use(routways.getRouter());

  /// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });

  const httpServer = http.createServer(app);
  // const httpsServer = https.createServer(credentials, app);

  const server = httpServer.listen(3000, function callback() {
    console.log("Listening on port " + server.address().port);
  });
  // httpsServer.listen(8443);
}

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
  if (options.cleanup) {
    console.log("clean");
  }
  if (exitCode || exitCode === 0) {
    console.log("PROCESS EXIT WITH EXIT CODE", exitCode);
  }

  if (options.exit) {
    if (this?.database?.connection?.threadId) {
      this?.database?.disconnect();
    }

    process.exit();
  }
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches 'kill pid' (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

initServer().catch(function (err) {
  console.error("ERROR WHILE STARTING SERVER ", err.message, err.stack);
  process.exit(0);
});
