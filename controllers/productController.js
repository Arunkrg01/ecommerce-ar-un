const AdminProduct = require('../models/AdminProduct');



module.exports.getTranding = async (req, res) => {
    try {
        const pipeline = [
            { $match: {} }, // You can add a match condition if needed
            { $sample: { size: 6 } },
        ];

        const randomProducts = await AdminProduct.aggregate(pipeline);

        res.status(200).json(randomProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.getFeatures = async (req, res) => {
    try {
        const pipeline = [
            { $match: {} }, // You can add a match condition if needed
            { $sample: { size: 6 } },
        ];

        const randomProducts = await AdminProduct.aggregate(pipeline);

        res.status(200).json(randomProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}






  module.exports.getProductById = async(req,res) =>{
        const productId = req.params.productId;
        try {
          const product = await AdminProduct.findById(productId);
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
      
          res.status(200).json(product);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
  }

  module.exports.getProductQuery = async (req, res) => {
    try {
      const {
        page = 1,
        price,
        color,
        category,
        sort = 'default',
      } = req.query;
      const perPage = 1000; // Set the default number of items per page
      const skip = (page - 1) * perPage;
  
      let query = {};
      if (price) {
        query.price = { $lte: parseFloat(price) };
      }
      if (color) {
        query.color = color;
      }
      if (category) {
        query.category = category;
      }
  
      let products;
  
      switch (sort) {
        case 'lowtohigh':
          products = await AdminProduct.find(query)
            .skip(skip)
            .limit(parseInt(perPage))
            .sort({ price: 1 });
          break;
        case 'hightolow':
          products = await AdminProduct.find(query)
            .skip(skip)
            .limit(parseInt(perPage))
            .sort({ price: -1 });
          break;
        default:
          products = await AdminProduct.find(query)
            .skip(skip)
            .limit(parseInt(perPage));
          break;
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }