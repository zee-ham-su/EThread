const { validationResult } = require('express-validator');
const Cart = require('../models/cart');

const checkoutController = {
  processCheckout: async (req, res) => {
    try {
      // Validate the request data using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract data from the request body
      const { cartId } = req.body;
      console.log(cartId);

      // Find the cart by ID
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }


      cart.checkedOut = true;
      console.log(cart);


      // Save the updated cart
      await cart.save();

      return res.status(200).json({ success: true, message: 'Checkout successful' });
    } catch (error) {
      console.error('Error processing checkout:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};


module.exports = checkoutController;