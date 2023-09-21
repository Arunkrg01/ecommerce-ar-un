const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')
const authController  = require('../controllers/authController')

router.get('/',authController.protect,authController.restrict(['user']),reviewController.getAllReview);
router.post('/',authController.protect,authController.restrict(['user']),reviewController.createReview);
router.get('/:productId',authController.protect,authController.restrict(['user']),reviewController.getReviewById);


module.exports = router;