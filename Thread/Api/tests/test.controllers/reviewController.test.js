const Review = require('../../models/review');
const ReviewController = require('../../controllers/reviewController');

// Mock the Review model
jest.mock('../../models/review');

describe('ReviewController', () => {
  describe('createReview', () => {
    it('should create a new review', async () => {
      const mockReq = {
        body: {
          productId: 'mockProductId',
          rating: 4,
          comment: 'Great product!',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockSave = jest.fn().mockResolvedValueOnce({
        product: 'mockProductId',
        rating: 4,
        comment: 'Great product!',
      });
      Review.mockReturnValueOnce({
        save: mockSave,
      });

      await ReviewController.createReview(mockReq, mockRes);

      expect(mockSave).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        product: 'mockProductId',
        rating: 4,
        comment: 'Great product!',
      }));
    });

    it('should return 500 if an error occurs during review creation', async () => {
      const mockReq = {
        body: {
          productId: 'mockProductId',
          rating: 4,
          comment: 'Great product!',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Review.mockReturnValueOnce({
        save: jest.fn().mockRejectedValueOnce(new Error('Database error')),
      });

      await ReviewController.createReview(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });

  describe('getReviewsByProduct', () => {
    it('should return reviews for a specified product', async () => {
      const mockReq = {
        params: {
          productId: 'mockProductId',
        },
      };
      const mockRes = {
        json: jest.fn(),
      };
      const mockReviews = [
        { product: 'mockProductId', rating: 4, comment: 'Great product!' },
        { product: 'mockProductId', rating: 5, comment: 'Amazing product!' },
      ];
      Review.find.mockResolvedValueOnce(mockReviews);

      await ReviewController.getReviewsByProduct(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockReviews);
    });

    it('should return 500 if an error occurs while fetching reviews', async () => {
      const mockReq = {
        params: {
          productId: 'mockProductId',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Review.find.mockRejectedValueOnce(new Error('Database error'));

      await ReviewController.getReviewsByProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });
});
