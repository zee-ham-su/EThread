const { ProductController } = require('../../controllers/productController');
const Product = require('../../models/product');
const multer = require('multer');

jest.mock('../../models/product'); // Mock the Product model

jest.mock('multer', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('ProductController', () => {
  describe('createProduct', () => {
    it('should return 400 if multer error occurs', async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
      // Mock multer
      multer.mockReturnValueOnce({
        single: jest.fn().mockImplementation((fieldName, callback) => callback(new Error('Multer error')))
      });

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Error uploading file' });
    });

    it('should return 500 if other error occurs during upload', async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };
      // Mock multer
      multer.mockReturnValueOnce({
        single: jest.fn().mockImplementation((fieldName, callback) => callback(new Error('Other error')))
      });

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });

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

      // Mock Product.save
      const mockProductSave = jest.fn().mockResolvedValueOnce('Mocked product');
      Product.mockImplementationOnce(() => ({
        save: mockProductSave
      }));

      await ProductController.createProduct(req, res);

      expect(mockProductSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Product created successfully', product: 'Mocked product' });
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

      // Mock Product.save to throw an error
      const mockProductSave = jest.fn().mockRejectedValueOnce(new Error('Database error'));
      Product.mockImplementationOnce(() => ({
        save: mockProductSave
      }));

      await ProductController.createProduct(req, res);

      expect(mockProductSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });
});
