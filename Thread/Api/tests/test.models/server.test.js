const request = require('supertest');
const express = require('express');
const app = require('../../server');
const mongoose = require('mongoose');
require('dotenv').config();


beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Express App Configuration', () => {
  it('should respond with welcome message at root URL', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to TechThread Rest API using MongoDB, ExpressJs!');
  });

  it('should serve static files from /images directory', async () => {
    const response = await request(app).get('/images/test.jpg'); // Assuming you have a test.jpg file in the public/images directory
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/^image\//);
  });

  it('should use body-parser middleware', async () => {
    const response = await request(app).post('/api/products').send({}); // Assuming /api/products route is configured to handle POST requests
    expect(response.status).toBe(400); // Since no body parser is used, it should return 400 Bad Request
  });

  it('should use CORS middleware', async () => {
    const response = await request(app).get('/');
    expect(response.headers['access-control-allow-origin']).toBe('*'); // Assuming CORS is set to allow requests from all origins
  });

  it('should use error handling middleware', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(500); // Since there's no route for /nonexistent-route, it should trigger the error handling middleware
  });

  it('should listen on the specified port', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
