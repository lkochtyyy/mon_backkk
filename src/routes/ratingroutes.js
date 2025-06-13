const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/ratingcontroller');

router.post('/', RatingController.addRating);

module.exports = router;
