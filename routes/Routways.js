// Import the route handlers
const personsRoutes = require('./persons.js');
const animalsRoutes = require('./animals.js');
const carsRoutes = require('./cars.js');
const hobbiesRoutes = require('./hobbies.js');

// Routways.js
const express = require('express');

class Routways {
  constructor(middleware) {
    this.router = express.Router();
    this.middleware = middleware;
  }

  setupRoutes() {
    const apiMiddleware = this.middleware;

    const routwaysPerson = new personsRoutes(apiMiddleware);
    routwaysPerson.setupRoutes();
    this.router.use(routwaysPerson.getRouter());

    // this.router.use('/animals', this.middleware, animalsRoutes);
    // this.router.use('/cars', this.middleware, carsRoutes);
    // this.router.use('/hobbies', this.middleware, hobbiesRoutes);

    this.router.get('/', function callback(req, res, next) {
      res.status(200);
      res.send({ message: 'Hallo' });
    });

    this.router.get('*', function callback(req, res, next) {
      res.status(404);
      res.send({ message: 'Not allowed!' });
    });
  

  
  }

  getRouter() {
    return this.router;
  }
}

module.exports = Routways;
