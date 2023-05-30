const express = require("express");
const postPersonFunction = require("./functions/postPersonFunctions.js");

class PersonRouter {
  constructor(middleware) {
    this.router = express.Router();
    this.middleware = middleware;
  }

  getRouter() {
    return this.router;
  }

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
