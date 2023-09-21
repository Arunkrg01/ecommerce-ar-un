const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.get('/trending', productController.getTranding);
router.get('/features', productController.getFeatures);


router.use(authController.protect);
router.get('/details/:productId', authController.restrict(['user']), productController.getProductById);
router.get('/', authController.restrict(['user']), productController.getProductQuery);


module.exports = router;
