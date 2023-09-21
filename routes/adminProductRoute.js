const { Router } = require('express')
const adminProductController  = require('../controllers/adminProductController')
const authController  = require('../controllers/authController')

const router  = Router()

router.get('/purchase',authController.protect,authController.restrict(['admin']),adminProductController.getAllPurchaseItems)
router.patch('/purchase/:purchaseId',authController.protect,authController.restrict(['admin']),adminProductController.productStatusUpdate)

router.get('/',authController.protect,authController.restrict(['admin']),adminProductController.getAdminProduct)
router.post('/',authController.protect,authController.restrict(['admin']),adminProductController.createAdminProduct)
router.get('/:id',authController.protect,authController.restrict(['admin']),adminProductController.getAdminProductById)
router.patch('/:id',authController.protect,authController.restrict(['admin']),adminProductController.updateAdminProduct)
router.delete('/:id',authController.protect,authController.restrict(['admin']),adminProductController.deleteAdminProduct)




module.exports = router