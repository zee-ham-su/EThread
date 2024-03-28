import { describe, it, expect } from 'vitest';
import connectDB from '../mondb'; // Directory of mongodb.js

describe('connectDB function', () => {
  it('should connect to MongoDB successfully', async () => {
    // Mock process.env.MONGODB_URI
    process.env.MONGODB_URI = 'mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    // Mock console.log
    const originalConsoleLog = console.log;
    let consoleOutput = '';
    console.log = (output) => (consoleOutput += output);

    // Call the connectDB function
    await connectDB();

    // Restore console.log
    console.log = originalConsoleLog;

    // Expect MongoDB to be connected
    expect(consoleOutput).toContain('MongoDB Connected!');
  });

  it('should handle errors when connecting to MongoDB', async () => {
    // Mock process.env.MONGODB_URI
    process.env.MONGODB_URI = 'invalid_uri';

    // Mock console.error
    const originalConsoleError = console.error;
    let consoleErrorOutput = '';
    console.error = (output) => (consoleErrorOutput += output);

    try {
      // Call the connectDB function
      await connectDB();
    } catch (error) {
      // Restore console.error
      console.error = originalConsoleError;

      // Expect an error message to be logged
      expect(consoleErrorOutput).toContain('Error connecting to MongoDB:');
    }
  });
});