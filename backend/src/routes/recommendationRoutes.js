const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController.js');
const auth = require('../middleware/authMiddleware.js');

router.get("/", auth, recommendationController.getRecommendations);


module.exports = router;
