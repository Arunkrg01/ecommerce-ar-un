const Cart = require('../models/Cart');

// Create a new cart item
module.exports.createCartItem = async (req, res) => {
  try {
    const { user, product, quantity,color,size } = req.body;
    const cartItem = new Cart({ user, product, quantity,color,size });
    await cartItem.save();
    res.status(201).json({cartItem:cartItem,status:201});
  } catch (error) {
    res.status(400).json({ error: 'Unable to create the cart item' });
  }
};

// Read all cart items for a specific user
module.exports.getAllCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ user: userId }).populate(
        {
            path: 'product',
            select: 'name price photos',
        }
    );
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch cart items' });
  }
};

// Update a cart item by ID
module.exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the cart item' });
  }
};

// Delete a cart item by ID
module.exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findByIdAndRemove(id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item deleted successfully',status:204 });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the cart item' });
  }
};
