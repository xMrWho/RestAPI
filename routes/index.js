const express = require('express');
const router = express.Router();

// Import the route handlers
const personsRoutes = require('./persons.js');
const animalsRoutes = require('./animals.js');
const carsRoutes = require('./cars.js');
const hobbiesRoutes = require('./hobbies.js');

// Define the routes
router.use('/persons', personsRoutes);
router.use('/animals', animalsRoutes);
router.use('/cars', carsRoutes);
router.use('/hobbies', hobbiesRoutes);

// Export the router
module.exports = router;

router.get("*", function callback(req, res, next) {
  res.status(404);
  res.send({ message: "Not allowed!" });
});

module.exports = router;
