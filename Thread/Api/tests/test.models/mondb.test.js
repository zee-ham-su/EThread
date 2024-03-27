import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import { connectDB } from "../../mondb";

describe("connectDB", () => {
  it("should connect to MongoDB successfully", async () => {
    // Mock the environment variable
    process.env.MONGODB_URI = "mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test";

    // Mock the mongoose.connect function
    mongoose.connect = jest.fn().mockResolvedValueOnce();

    // Mock the console.log function
    console.log = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
    expect(console.log).toHaveBeenCalledWith("MongoDB Connected!");
  });

  it("should handle error when connecting to MongoDB", async () => {
    // Mock the environment variable
    process.env.MONGODB_URI = "mongodb+srv://hamzasufian2014:DafBrscdZELfxbvc@cluster0.nmmyd8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test";

    // Mock the mongoose.connect function to throw an error
    mongoose.connect = jest.fn().mockRejectedValueOnce(new Error("Connection failed"));

    // Mock the console.error function
    console.error = jest.fn();

    // Mock the process.exit function
    process.exit = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
    expect(console.error).toHaveBeenCalledWith(
      "Error connecting to MongoDB: Connection failed"
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});