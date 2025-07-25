import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();


connectDB();

const app = express();
app.get('/', (req, res) => {
  res.send('API is running...');
});



app.use(express.json());


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    //  Secret used to sign the session ID cookie.
    
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),

    cookie: {
      httpOnly: true,
      //  Cookie cannot be accessed by JavaScript in the browser.
      //    Helps protect against XSS attacks.

      secure: process.env.NODE_ENV === 'production',
      //  In production, cookies will be sent only over HTTPS.
      //    In local development (NODE_ENV=development), HTTP works too.

      maxAge: 1000 * 60 * 60 * 24,
      //  Cookie  1 day.
    },
  }),
);



app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/payments', paymentRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
