const express = require('express');
const Review = require('../models/Review')
const User = require('../models/Users');

module.exports.createReview = async (req, res) => {
    try {
      const { user, product, rating, reviewText } = req.body;
  
      // Create a new review document
      const newReview = new Review({
        user,
        product,
        rating,
        reviewText,
      });
  
      // Save the new review
      await newReview.save();
  
      res.status(201).json({ message: 'Review created successfully', review: newReview ,status:201});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports.getAllReview = async (req, res) => {
    try {
      // Find all reviews
      const reviews = await Review.find();
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports.getReviewById = async (req, res) => {
    try {
      const productId = req.params.productId;
      
      // Find reviews that match the product ID and populate user info
      const reviews = await Review.find({ product: productId }).populate({
        path: 'user',
        select: 'name profilePicture',
      });
      
      
      if (!reviews) {
        return res.status(404).json({ error: 'Reviews not found for this product' });
      }
      
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  };
  