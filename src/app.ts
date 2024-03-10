import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './routes/authRoutes';
import productsRouter from './routes/products';
import cors from 'cors';

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
//Routes
app.use('/auth', authRouter);
app.use('/products', productsRouter);
//autenticacion
//user


export default app;