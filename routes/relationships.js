const express = require("express");
const postRelationshipsFunctions = require("./functions/postRelationshipsFunctions.js");

class RelationshipRouter {
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

    this.router.post("/relationships", middleware.execute, function (req, res, next) {
      return postRelationshipsFunctions({
        req: req,
        res: res,
        next: next,
        dbManager: dbManager,
        usedDatabase: usedDatabase,
      });
    });
  }
}

module.exports = RelationshipRouter;
