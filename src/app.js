import express from 'express';
import morgan from 'morgan';
import UserRoutes from './routes/userRoutes.js';
import ProductRoutes from './routes/productsRoutes.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import Member from './models/memberModel.js';

import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('docs'));

// Enable cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 minute
  max: 100,
  message: 'excediste el número maximo de intentos',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/products', ProductRoutes);
app.get('/members', async (req, res) => {
  const found = await Member.findAll();

  res.status(200).json({
    status: 'success',
    results: found.length,
    data: {
      members: found,
    },
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`La ruta ${req.originalUrl} no existe en este servidor`, 404));
});

app.use(globalErrorHandler);

export default app;
