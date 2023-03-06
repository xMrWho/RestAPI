// middleware.js
class APIMiddleware {
  constructor(settings) {
    this.databaseManager = settings.databaseManager;
    this.API_KEY = settings.API_KEY;
    this.usedDatabase = settings.usedDatabase;

    this.execute = this.execute.bind(this);
    this.getDatabaseManager = this.getDatabaseManager.bind(this);
    this.getUsedDatabase= this.getUsedDatabase.bind(this);
  }

  execute(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== this.API_KEY) {
      return res.status(401).send("Unauthorized - Please control your API-Key");
    }
    next();
  }

  getDatabaseManager() {
    return this.databaseManager;
  }

  getUsedDatabase() {
    return this.usedDatabase;
  }
}

module.exports = APIMiddleware;
