import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import connectdb from '../config/connectdb.js';
import menuRoutes from '../routes/menuRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';
import authroutes from '../routes/authroutes.js';
import reservationRoutes from '../routes/reservationRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://resturant-website-frontend-pearl.vercel.app',
    credentials: true,
  })
);

app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectdb();
    }
    next();
  } catch (error) {
    console.error('DB connection failed:', error);
    next(error);
  }
});

app.use('/api/auth', authroutes);
app.use('/api/menu', menuRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  } else {
    next(err);
  }
});

export default serverless(app);
