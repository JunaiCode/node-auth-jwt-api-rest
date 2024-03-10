import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './routes/authRoutes';
import productsRouter from './routes/products';

const app = express();

app.use(express.json());

//Routes
app.use('/auth', authRouter);
app.use('/products', productsRouter);
//autenticacion
//user


export default app;