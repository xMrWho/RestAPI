// Import the route handlers
const personsRoutes = require("./persons.js");
const relationshipRoutes = require("./relationships.js");

//PLANNED
//const animalsRoutes = require('./animals.js');
//const carsRoutes = require('./cars.js');
//const hobbiesRoutes = require('./hobbies.js');

// Routways.js
const express = require("express");

class Routways {
  constructor(middleware) {
    this.router = express.Router();
    this.middleware = middleware;
  }

  /**
   * Sets up the parent routes.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  setupChilrenRoutes() {
    const childrenMiddleware = this.middleware;
    const childrenRoutways = new parentRoutes(childrenMiddleware);
    childrenRoutways.setupRoutes();
    // TODO: Replace the current route setup with the new code
    this.router.use("/children", parentRoutways.getRouter());
  }

  /**
   * Sets up the relationship routes.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  setupRelationshipRoutes() {
    const relationshipMiddleware = this.middleware;
    const relationshipRoutways = new relationshipRoutes(relationshipMiddleware);
    relationshipRoutways.setupRoutes();
    this.router.use("/relationships", relationshipRoutways.getRouter());
  }

  /**
   * Set up the routes for the application.
   *
   * @param {} - No parameters
   * @return {} - No return value
   */
  setupRoutes() {
    setupParentRoutes();
    setupRelationshipRoutes();
    //PLANNED
    // this.router.use('/animals', this.middleware, animalsRoutes);
    // this.router.use('/cars', this.middleware, carsRoutes);
    // this.router.use('/hobbies', this.middleware, hobbiesRoutes);
    //this.router.use('/hobbies', this.middleware, hobbiesRoutes);

    this.router.get("/", function callback(req, res, next) {
      res.status(200);
      res.send({ message: "" });
    });

    this.router.get("*", function callback(req, res, next) {
      res.status(404);
      res.send({ message: "Not allowed!" });
    });
  }

  /**
   * Retrieves the router.
   *
   * @return {Object} The router object.
   */
  getRouter() {
    return this.router;
  }
}

module.exports = Routways;
