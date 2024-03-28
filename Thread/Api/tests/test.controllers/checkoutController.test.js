const { validationResult } = require('express-validator');
const checkoutController = require('../../controllers/checkoutController');
const Cart = require('../../models/cart');

jest.mock('express-validator');

describe('checkoutController', () => {
  describe('processCheckout', () => {
    it('should return 400 if validation fails', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
      validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => [{ msg: 'Validation error' }] });

      await checkoutController.processCheckout(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Validation error' }] });
    });

    it('should return 404 if cart is not found', async () => {
      const req = { body: { cartId: 'nonexistentId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
      validationResult.mockReturnValueOnce({ isEmpty: () => true });

      Cart.findById = jest.fn().mockResolvedValueOnce(null);

      await checkoutController.processCheckout(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cart not found' });
    });

    it('should update cart and return 200 if checkout is successful', async () => {
      const req = { body: { cartId: 'existingId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
      validationResult.mockReturnValueOnce({ isEmpty: () => true });

      const existingCart = { _id: 'existingId', checkedOut: false, save: jest.fn() };
      Cart.findById = jest.fn().mockResolvedValueOnce(existingCart);

      await checkoutController.processCheckout(req, res);

      expect(existingCart.checkedOut).toBe(true);
      expect(existingCart.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Checkout successful' });
    });

    it('should return 500 if an internal server error occurs', async () => {
      const req = { body: { cartId: 'existingId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
      validationResult.mockReturnValueOnce({ isEmpty: () => true });

      Cart.findById = jest.fn().mockRejectedValueOnce(new Error('Internal server error'));

      await checkoutController.processCheckout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});
