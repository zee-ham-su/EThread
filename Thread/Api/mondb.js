const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
