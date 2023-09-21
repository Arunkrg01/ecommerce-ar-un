const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Import the Cart model
const PurchasedItem = require('../models/Purchase'); 

module.exports.purchase =  async (req, res) => {
    const userId = req.user.id; 
    try {
      // Find cart items for the user
      const cartItems = await Cart.find({ user: userId }).populate('product');
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
      const purchaseItems = [];
      const removedCartItems = [];
      // Create purchase records and calculate total price
      cartItems.forEach((cartItem) => {
        const totalPrice = cartItem.quantity * cartItem.product.price;
        purchaseItems.push({
          user: userId,
          product: cartItem.product._id,
          quantity: cartItem.quantity,
          totalPrice,
          paymentMode: req.body.paymentMode, 
        });
        removedCartItems.push(cartItem._id);
      });
      // Create purchase records in the database
      await PurchasedItem.insertMany(purchaseItems);
      // Remove purchased items from the cart
      await Cart.deleteMany({ _id: { $in: removedCartItems } });
      res.status(200).json({ message: 'Purchase successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports.getPurchaseItemOfUser =  async (req, res) => {
    const userId = req.user.id; // Assuming you have the user ID from authentication
    try {
      // Find all purchase records for the user
      const purchaseHistory = await PurchasedItem.find({ user: userId }).populate('product');
  
      res.status(200).json({ purchaseHistory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }