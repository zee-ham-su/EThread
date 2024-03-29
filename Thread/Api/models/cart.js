const mongoose = require('mongoose');

/**
 * Represents the schema for a cart.
 * @typedef {Object} CartSchema
 * @property {Array} items - The items in the cart.
 * @property {Object} items.product - The product in the cart.
 * @property {string} items.product.type - The type of the product.
 * @property {string} items.product.ref - The reference to the 'Product' model.
 * @property {boolean} items.product.required - Indicates if the product is required.
 * @property {number} items.quantity - The quantity of the product in the cart.
 * @property {number} totalPrice - The total price of the cart.
 * @property {boolean} timestamps - Indicates if timestamps should be included.
 */
const cartSchema = new mongoose.Schema({
  items: [{ 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
  }],
   totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
