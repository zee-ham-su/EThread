const mongoose = require('mongoose');

/**
 * Represents a review schema.
 *
 * @typedef {Object} ReviewSchema
 * @property {mongoose.Schema.Types.ObjectId} product - The ID of the product being reviewed.
 * @property {Number} rating - The rating given to the product.
 * @property {String} comment - The comment provided for the review.
 * @property {Date} createdAt - The timestamp when the review was created.
 * @property {Date} updatedAt - The timestamp when the review was last updated.
 */
const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
