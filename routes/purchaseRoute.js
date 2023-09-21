const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authController  = require('../controllers/authController')


router.post('/',authController.protect,authController.restrict(['user']),purchaseController.purchase);
router.get('/',authController.protect,authController.restrict(['user']),purchaseController.getPurchaseItemOfUser);

module.exports = router;