const AdminProduct = require('../models/AdminProduct')
const PurchasedItem = require('../models/Purchase'); 

module.exports.createAdminProduct = async(req,res) =>{
    try {
        const product = new AdminProduct(req.body);
        await product.save();
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json({ error: 'Unable to create the product' });
      }
}

module.exports.getAdminProduct = async (req, res) => {
    try {
      const products = await AdminProduct.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch products' });
    }
  }

module.exports.getAdminProductById = async (req, res) => {
    try {
      const product = await AdminProduct.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch the product' });
    }
  }  

 module.exports.updateAdminProduct = async (req, res) => {
    try {
      const product = await AdminProduct.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update the product' });
    }
  } 


  module.exports.deleteAdminProduct  = async (req, res) => {
    try {
      const product = await AdminProduct.findByIdAndRemove(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete the product' });
    }
  }

  module.exports.getAllPurchaseItems = async (req, res) => {
    try {
      const allPurchaseItems = await PurchasedItem.find()
  
      res.status(200).json({ allPurchaseItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports.productStatusUpdate = async (req, res) => {
    try {
      const { purchaseId } = req.params;
      const { deliveryStatus, paymentStatus } = req.body;
      const updatedPurchase = await PurchasedItem.findByIdAndUpdate(
        purchaseId,
        { deliveryStatus, paymentStatus },
        { new: true } 
      );
  
      if (!updatedPurchase) {
        return res.status(404).json({ error: 'Purchase not found' });
      }
  
      res.status(200).json({ message: 'Purchase status updated successfully', updatedPurchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }