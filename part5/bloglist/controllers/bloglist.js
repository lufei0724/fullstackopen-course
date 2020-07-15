const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

bloglistRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', ['username', 'name']);
    res.json(blogs.map((blog) => blog.toJSON()));
  } catch (error) {
    next(error);
  }
});

/*
bloglistRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.find({ _id: id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});
*/

bloglistRouter.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const blogs = await Blog
      .find({ user: userId })
      .populate('user', ['username', 'name']);
    res.json(blogs.map((blog) => blog.toJSON()));
  } catch (error) {
    next(error);
  }
});

bloglistRouter.post('/', async (req, res, next) => {
  try {
    const { token } = req;
    const user = await User.findById(token.id);
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    await User.update(user, { blogs: user.blogs.concat(savedBlog.id) });
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

bloglistRouter.delete('/:id', async (req, res, next) => {
  try {
    const { token } = req;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (token.id !== blog.user.toString()) {
      throw new Error('cannot delete blog created by another user');
    }
    await Blog.deleteOne({ _id: id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

bloglistRouter.put('/:id', async (req, res, next) => {
  const { body } = req;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(req.params.id, blog, { new: true })
      .populate('user', ['username', 'name']);
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = bloglistRouter;
