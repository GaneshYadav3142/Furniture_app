const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController.js');
const auth = require('../middleware/authMiddleware.js');

router.get('/', furnitureController.getAll);
router.get('/:id', furnitureController.getById);
router.post('/', auth, furnitureController.create); // protected: admin or logged in
router.put('/:id', auth, furnitureController.update);

module.exports = router;
