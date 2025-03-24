const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Param middleware: only runs when the route has a certain parameter
router.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});

// Routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
