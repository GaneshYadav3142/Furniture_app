const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController.js');
const auth = require('../middleware/authMiddleware.js');

router.post('/', auth, reviewsController.createReview);
router.get('/furniture/:id', reviewsController.getReviewsForFurniture);

module.exports = router;
