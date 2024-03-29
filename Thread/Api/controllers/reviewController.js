const Review = require('../models/review');

const ReviewController = {
  async createReview(req, res) {
    try {
      const { productId, rating, comment } = req.body;
      
      // Check if rating is within the range of 1 to 5
      if (rating < 1 || rating > 5) {
          return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }

      // Create a new review
      const review = new Review({
        product: productId,
        rating,
        comment
      });

      await review.save();

      return res.status(201).json(review);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

  // Get all reviews for a specific product
  async getReviewsByProduct(req, res) {
    try {
      const productId = req.params.productId;

      // Find all reviews for the specified product
      const reviews = await Review.find({ product: productId });

      return res.json(reviews);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
};

module.exports = ReviewController;
