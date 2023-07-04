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

  /**
   * Execute the function.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @return {undefined} This function does not return anything.
   */
  execute(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== this.API_KEY) {
      return res.status(401).send("Unauthorized - Please control your API-Key");
    }
    next();
  }

  /**
   * Get the database manager.
   *
   * @return {DatabaseManager} The database manager.
   */
  getDatabaseManager() {
    return this.databaseManager;
  }

  /**
   * Retrieves the used database.
   *
   * @return {type} The used database.
   */
  getUsedDatabase() {
    return this.usedDatabase;
  }
}

module.exports = APIMiddleware;
