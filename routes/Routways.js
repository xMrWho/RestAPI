// Import the route handlers
const personsRoutes = require("./persons.js");
const relationshipRoutes = require("./relationships.js");
const childrenRoutes = require("./children.js")

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
   * Set up the routes for the application.
   *
   * @param {} - No parameters
   * @return {} - No return value
   */
  setupRoutes() {
    const personsRoutways = new personsRoutes(this.middleware);
    personsRoutways.setupRoutes();
    this.router.use("/persons", personsRoutways.getRouter());

    const relationshipRoutways = new relationshipRoutes(this.middleware);
    relationshipRoutways.setupRoutes();
    this.router.use("/relationships", relationshipRoutways.getRouter());

    const childrenRoutways = new childrenRoutes(this.middleware);
    childrenRoutways.setupRoutes();
    // TODO: Replace the current route setup with the new code
    this.router.use("/children", childrenRoutways.getRouter());
    
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
