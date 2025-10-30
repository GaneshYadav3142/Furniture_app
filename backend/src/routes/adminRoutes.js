const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

// Add new furniture
router.post('/furniture', adminController.addFurniture);

// Fetch all furniture
router.get('/furniture', adminController.getAllFurniture);

// Update furniture by ID
router.put('/furniture/:id', adminController.updateFurniture);

module.exports = router;
