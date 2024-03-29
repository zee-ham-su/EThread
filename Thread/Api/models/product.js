const mongoose = require('mongoose');

/**
 * Represents a product in the system.
 *
 * @typedef {Object} Product
 * @property {string} name - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 * @property {string} image - The image URL of the product.
 * @property {number} quantity - The quantity of the product.
 * @property {Date} createdAt - The date and time when the product was created.
 * @property {Date} updatedAt - The date and time when the product was last updated.
 */
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String , required: true },
  quantity: { type: Number, default: 0 },
},
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
