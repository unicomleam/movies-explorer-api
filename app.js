require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, пожалуйста, повторите попытку позже',
});

const app = express();

mongoose.connect(DB_URL, {});

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://api.unicomleam.nomoredomainsicu.ru',
    'https://unicomleam.nomoredomainsrocks.ru',
  ],
  credentials: true,
}));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
