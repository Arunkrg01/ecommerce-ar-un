const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    default: [],
  },
  reviews: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: [String], // Make "size" an array of strings
    required: true,
  },
  color: {
    type: [String], // Make "color" an array of strings
    required: true,
  },
});

const AdminProduct = mongoose.model('AdminProduct', productSchema);

module.exports = AdminProduct;
