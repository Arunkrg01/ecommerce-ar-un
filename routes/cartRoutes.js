const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authController  = require('../controllers/authController')

// Create a new cart item
router.post('/',authController.protect, authController.restrict(['user']),cartController.createCartItem);

// Read all cart items for a specific user
router.get('/:userId',authController.protect, authController.restrict(['user']),cartController.getAllCartItems);

// Update a cart item by ID
router.patch('/:id',authController.protect, authController.restrict(['user']),cartController.updateCartItem);

// Delete a cart item by ID
router.delete('/:id',authController.protect, authController.restrict(['user']),cartController.deleteCartItem);

module.exports = router;
