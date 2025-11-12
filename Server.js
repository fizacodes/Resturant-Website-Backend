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
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'https://resturant-website-frontend-px4c.vercel.app',
    credentials:true
}))
connectdb();

app.use('/api/auth',authroutes);
app.use('/api/menu',menuRoutes)
app.use('/api/category',categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})