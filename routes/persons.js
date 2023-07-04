const express = require("express");
const postPersonFunction = require("./functions/postPersonFunctions.js");

class PersonRouter {
  constructor(middleware) {
    this.router = express.Router();
    this.middleware = middleware;
  }

  /**
   * Retrieves the router.
   *
   * @return {Object} The router object.
   */
  getRouter() {
    return this.router;
  }

  /**
   * Sets up the routes for the application.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  setupRoutes() {
    const middleware = this.middleware;
    const dbManager = middleware.getDatabaseManager();
    const usedDatabase = middleware.getUsedDatabase();

    this.router.post("/persons", middleware.execute, function (req, res, next) {
      return postPersonFunction({
        req: req,
        res: res,
        next: next,
        dbManager: dbManager,
        usedDatabase: usedDatabase,
      });
    });
  }
}

module.exports = PersonRouter;
