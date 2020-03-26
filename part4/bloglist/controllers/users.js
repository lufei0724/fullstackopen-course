const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;
userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', ['url', 'title', 'author']);
    res.json(users.map((user) => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  const { body } = req;

  if (!body.username) {
    res.status(400).send({ error: 'Username is required' });
    return;
  }
  if (body.username.length < 3) {
    res.status(400).send({ error: 'Username must be at least 3 characters' });
    return;
  }
  const findUser = await User.find({ username: body.username });
  if (findUser.length > 0) {
    res.status(400).send({ error: 'Username is already existed' });
    return;
  }

  if (!body.password) {
    res.status(400).send({ error: 'Password is required' });
    return;
  }
  if (body.password.length < 3) {
    res.status(400).send({ error: 'Password must be at least 3 characters' });
    return;
  }

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      password: bcrypt.hashSync(body.password, salt),
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
