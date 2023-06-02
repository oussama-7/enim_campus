import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
// import booksRoute from './routes/books.js';
// import chaptersRoute from './routes/chapters.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import bodyParser from 'body-parser';
import uploadRouter from './routes/uploadRoutes.js';

import {
  resetPassword,
  resetPasswordVerification,
} from './controllers/auth.js';

const app = express();
app.set('view engine', 'ejs');
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongoDB.');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoBD disconnected!');
});
//middlewares

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get('/resetPassword/:id/:token', resetPassword);
app.post('/resetPassword/:id/:token', resetPasswordVerification);

app.listen(8800, () => {
  connect();
  console.log('Connected to backend.');
});
