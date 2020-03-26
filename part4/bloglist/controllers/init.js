const initRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

initRouter.get('/', async (req, res, next) => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();
    await res.status(200).json('Database has been cleaned');
  } catch (error) {
    next(error);
  }
});

module.exports = initRouter;
