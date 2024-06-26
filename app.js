require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const stripeRouter = require('./routes/stripe');
const registrationRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stripe', stripeRouter);
app.use('/register', registrationRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

module.exports = app;
