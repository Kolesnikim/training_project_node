const path = require('path');

const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// MIDDLEWARES
app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on this server!S`), 404);
});

app.use(errorController);

// START SERVER
module.exports = app;
