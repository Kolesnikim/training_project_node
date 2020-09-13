const path = require('path');

const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
app.use(express.json());

if (process.env.NODE_ENV === 'development ') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

// ROUTE HANDLERS

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER
module.exports = app;