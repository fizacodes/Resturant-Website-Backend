
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import connectdb from './config/connectdb.js';

import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authroutes from './routes/authroutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();

const app = express();

// connect DB ONCE (not per request)
connectdb();

app.use(express.json());
app.use(cookieParser());

// FIXED CORS (IMPORTANT for preflight)
app.use(cors({
  origin: 'https://resturant-website-frontend-pearl.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// routes
app.use('/api/auth', authroutes);
app.use('/api/menu', menuRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API Working');
});

// IMPORTANT: DO NOT use serverless-http
export default app;

