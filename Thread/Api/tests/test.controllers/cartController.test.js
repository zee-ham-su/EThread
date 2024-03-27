const CartController = require('../../controllers/cartController');
const mongoose = require('mongoose');

// Set up MongoDB connection before running tests
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Cart Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    next = jest.fn();
  });

  describe('addToCart', () => {
    it('should add items to cart', async () => {
      req.body = {
        items: [{ product: 'mockProductId', quantity: 2 }],
      };

      await CartController.addToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ items: expect.any(Array) }));
    });
  });
});

// Close MongoDB connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
  });const CartController = require('../../controllers/cartController');
const mongoose = require('mongoose');
const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel');

// Set up MongoDB connection before running tests
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Cart Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    next = jest.fn();
  });

  describe('addToCart', () => {
    it('should add items to cart', async () => {
      req.body = {
        items: [{ productId: 'mockProductId', quantity: 2 }],
      };

      await CartController.addToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ items: expect.any(Array) }));
    });
  });

  describe('getAllCarts', () => {
    it('should retrieve all carts', async () => {
      await CartController.getAllCarts(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('updateCartItem', () => {
    it('should update a cart item', async () => {
      req.body = {
        cartId: 'mockCartId',
        itemId: 'mockItemId',
        quantity: 5,
      };

      await CartController.updateCartItem(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteCartItem', () => {
    it('should delete a cart item', async () => {
      req.params = {
        cartId: 'mockCartId',
        itemId: 'mockItemId',
      };

      await CartController.deleteCartItem(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteCart', () => {
    it('should delete a cart', async () => {
      req.params = {
        cartId: 'mockCartId',
      };

      await CartController.deleteCart(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

// Close MongoDB connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});