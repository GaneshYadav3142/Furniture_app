const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController.js');
const auth = require('../middleware/authMiddleware.js');

router.post('/', auth, ordersController.createOrder);
router.get('/:id', auth, ordersController.getOrderById);
router.get('/', auth, ordersController.getOrdersForUser);

module.exports = router;
