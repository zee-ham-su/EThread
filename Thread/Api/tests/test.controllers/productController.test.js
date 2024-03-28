import { describe, beforeAll, afterAll, it, expect } from "vitest";
const ProductController = require('../../controllers/productController');
const Product = require('../../models/product');

describe('ProductController', () => {
  // Connect to the MongoDB database before running tests
  beforeAll(async () => {
    // Add your database connection setup here
  });

  // Disconnect from the MongoDB database after running tests
  afterAll(async () => {
    // Add your database connection teardown here
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const req = {
        body: {
          name: 'Test Product',
          description: 'Test description',
          price: 9.99,
          quantity: 10,
        },
        file: {
          path: 'test/image.jpg',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Product created successfully', product: expect.any(Object) });
    });

    it('should return 500 if an error occurs during product creation', async () => {
      const req = {
        body: {
          name: 'Test Product',
          description: 'Test description',
          price: 9.99,
          quantity: 10,
        },
        file: {
          path: 'test/image.jpg',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.prototype.save.mockRejectedValueOnce(new Error('Database error'));

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const req = {
        params: {
          id: 'valid-product-id',
        },
        body: {
          name: 'Updated Product',
          description: 'Updated description',
          price: 19.99,
          quantity: 5,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValueOnce({
        save: jest.fn(),
      });

      await ProductController.updateProduct(req, res);

      expect(res.json).toHaveBeenCalledWith({ msg: 'Product updated successfully', product: expect.any(Object) });
    });

    it('should return 404 if product is not found', async () => {
      const req = {
        params: {
          id: 'nonexistent-product-id',
        },
        body: {
          name: 'Updated Product',
          description: 'Updated description',
          price: 19.99,
          quantity: 5,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValueOnce(null);

      await ProductController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Product not found' });
    });

    it('should return 500 if an error occurs during product update', async () => {
      const req = {
        params: {
          id: 'valid-product-id',
        },
        body: {
          name: 'Updated Product',
          description: 'Updated description',
          price: 19.99,
          quantity: 5,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockRejectedValueOnce(new Error('Database error'));

      await ProductController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
      };
      Product.find.mockResolvedValueOnce(['Product 1', 'Product 2']);

      await ProductController.getAllProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(['Product 1', 'Product 2']);
    });

    it('should return 500 if an error occurs while fetching products', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.find.mockRejectedValueOnce(new Error('Database error'));

      await ProductController.getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const req = {
        params: {
          id: 'valid-product-id',
        },
      };
      const res = {
        json: jest.fn(),
      };
      Product.findById.mockResolvedValueOnce('Product');

      await ProductController.getProductById(req, res);

      expect(res.json).toHaveBeenCalledWith('Product');
    });

    it('should return 404 if product is not found', async () => {
      const req = {
        params: {
          id: 'nonexistent-product-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValueOnce(null);

      await ProductController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Product not found' });
    });

    it('should return 500 if an error occurs while fetching product by ID', async () => {
      const req = {
        params: {
          id: 'valid-product-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockRejectedValueOnce(new Error('Database error'));

      await ProductController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID', async () => {
      const req = {
        params: {
          id: 'valid-product-id',
        },
      };
      const res = {
        json: jest.fn(),
      };
      Product.findById.mockResolvedValueOnce({
        deleteOne: jest.fn(),
      });

      await ProductController.deleteProduct(req, res);

      expect(res.json).toHaveBeenCalledWith({ msg: 'Product deleted successfully' });
    });

    it('should return 404 if product is not found', async () => {
      const req = {
        params: {
          id: 'nonexistent-product-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValueOnce(null);

      await ProductController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Product not found' });
    });

    it('should return 500 if an error occurs while deleting product by ID', async () => {
      const req = {
        params: {
          id: 'valid-product-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockRejectedValueOnce(new Error('Database error'));

      await ProductController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });
});