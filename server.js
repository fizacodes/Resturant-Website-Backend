
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectdb from './config/connectdb.js';

import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authroutes from './routes/authroutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();

const app = express();

// CONNECT DATABASE
await connectdb();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    'https://resturant-website-frontend-pearl.vercel.app'
  ],
  credentials: true
}));

// ROUTES
app.use('/api/auth', authroutes);
app.use('/api/menu', menuRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('API Working');
});

// EXPORT APP FOR VERCEL
export default app;

