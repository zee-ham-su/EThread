import { describe, beforeAll, afterAll, it, expect } from "vitest";
import { validationResult } from 'express-validator';
import Cart from '../../models/cart';
import checkoutController from '../../controllers/checkoutController';

describe('checkoutController', () => {
  // Connect to the MongoDB database before running tests
  beforeAll(async () => {
    // Add your database connection setup here
  });

  // Disconnect from the MongoDB database after running tests
  afterAll(async () => {
    // Add your database connection teardown here
  });

  describe('processCheckout', () => {
    it('should return 400 if request data is invalid', async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      validationResult.mockReturnValueOnce({
        isEmpty: () => false,
        array: () => ['Invalid data'],
      });

      await checkoutController.processCheckout(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: ['Invalid data'] });
    });

    it('should return 404 if cart is not found', async () => {
      const req = {
        body: {
          cartId: 'nonexistent-cart-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      validationResult.mockReturnValueOnce({
        isEmpty: () => true,
      });
      Cart.findById.mockResolvedValueOnce(null);

      await checkoutController.processCheckout(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cart not found' });
    });

    it('should update cart and return 200 if checkout is successful', async () => {
      const req = {
        body: {
          cartId: 'valid-cart-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      validationResult.mockReturnValueOnce({
        isEmpty: () => true,
      });
      const cart = {
        checkedOut: false,
        save: jest.fn(),
      };
      Cart.findById.mockResolvedValueOnce(cart);

      await checkoutController.processCheckout(req, res);

      expect(cart.checkedOut).toBe(true);
      expect(cart.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Checkout successful' });
    });

    it('should return 500 if an error occurs during checkout', async () => {
      const req = {
        body: {
          cartId: 'valid-cart-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      validationResult.mockReturnValueOnce({
        isEmpty: () => true,
      });
      Cart.findById.mockRejectedValueOnce(new Error('Database error'));

      await checkoutController.processCheckout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});