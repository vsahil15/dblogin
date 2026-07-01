import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authLoginRoutes from './routes/authLogin.routes.js';
import authRegisterRoutes from './routes/authRegister.routes.js';

const serverconnection = express();
serverconnection.use(express.json());
serverconnection.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : []),
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
};

serverconnection.use(cors(corsOptions));

serverconnection.use('/api/v1/auth', authLoginRoutes);
serverconnection.use('/api/v1/auth', authRegisterRoutes);

await connectDB();

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  serverconnection.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

export default serverconnection;
