import { describe, beforeAll, afterAll, it, expect } from "vitest";
const mongoose = require('mongoose');
const Review = require('../../models/review');
const ReviewController = require('../../controllers/reviewController');

describe('ReviewController', () => {
  // Connect to the MongoDB database before running tests
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect from the MongoDB database after running tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
      const req = {
        body: {
          productId: new mongoose.Types.ObjectId(),
          rating: 4,
          comment: 'This product is great!'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ReviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        product: req.body.productId,
        rating: req.body.rating,
        comment: req.body.comment
      }));
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        body: {
          productId: new mongoose.Types.ObjectId(),
          rating: 4,
          comment: 'This product is great!'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock an error during review save
      jest.spyOn(Review.prototype, 'save').mockRejectedValueOnce(new Error('Some error'));

      await ReviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });

  describe('getReviewsByProduct', () => {
    it('should get reviews for a product', async () => {
      const req = {
        params: {
          productId: new mongoose.Types.ObjectId()
        }
      };
      const res = {
        json: jest.fn()
      };

      await ReviewController.getReviewsByProduct(req, res);

      expect(res.json).toHaveBeenCalled();
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        params: {
          productId: new mongoose.Types.ObjectId()
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock an error during review find
      jest.spyOn(Review, 'find').mockRejectedValueOnce(new Error('Some error'));

      await ReviewController.getReviewsByProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });
});