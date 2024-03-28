import { describe, it, expect } from 'vitest';
const { ProductController } = require('../../controllers/productController');
const Product = require('../../models/product');
const multer = require('multer');

describe('ProductController', () => {
  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const req = {
        body: {
          name: 'Test Product',
          description: 'Test Description',
          price: 10,
          quantity: 5
        },
        file: {
          path: 'test/image/path.jpg'
        }
      };
      const res = {
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.responseData = data;
        }
      };

      await ProductController.createProduct(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.responseData).toMatchObject({ msg: 'Product created successfully', product: expect.any(Object) });
    });

    it('should handle errors during product creation', async () => {
      const req = {
        body: {
          name: 'Test Product',
          description: 'Test Description',
          price: 10,
          quantity: 5
        },
        file: {
          path: 'test/image/path.jpg'
        }
      };
      const res = {
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.responseData = data;
        }
      };

      // Mocking an error during product creation
      Product.prototype.save = async function () {
        throw new Error('Test Error');
      };

      await ProductController.createProduct(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.responseData).toMatchObject({ msg: 'Internal server error' });
    });
  });

  // You can similarly write tests for other functions in ProductController
});