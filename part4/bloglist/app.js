const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const initRouter = require('./controllers/init');
const bloglistRouter = require('./controllers/bloglist');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
 } = require('./utils/middleware');

const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('Failed to connect to DB'));

app.use(express.json());
app.use(tokenExtractor);
app.use('/api/init', initRouter);
app.use('/api/blogs', bloglistRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
