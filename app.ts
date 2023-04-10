import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import models and routes
import { itemRoutes } from './src/routes/item';
import { orderRoutes } from './src/routes/order';
import populateDB from './populate-db';

// Initialize Express.js app
const app = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

const connectDB = async ()=> {
  await mongoose.connect("mongodb://127.0.0.1:27017/local");
  console.log('MongoDb Connected'); 
  populateDB();  
}

connectDB();

// Register routes
app.use('/items', itemRoutes);
app.use('/order', orderRoutes);

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
