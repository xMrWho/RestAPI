// Import the route handlers
const personsRoutes = require("./persons.js");
const relationshipRoutes = require('./relationships.js');

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

  setupParentRoutes() {
    const parentMiddleware = this.middleware;
    const parentRoutways = new parentRoutes(parentMiddleware);
    parentRoutways.setupRoutes();
    this.router.use('/parents', parentRoutways.getRouter());
  }
  
  setupRelationshipRoutes() {
    const relationshipMiddleware = this.middleware;
    const relationshipRoutways = new relationshipRoutes(relationshipMiddleware);
    relationshipRoutways.setupRoutes();
    this.router.use('/relationships', relationshipRoutways.getRouter());
  }

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

  getRouter() {
    return this.router;
  }
}

module.exports = Routways;
