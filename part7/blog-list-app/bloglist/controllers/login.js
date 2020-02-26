const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json('error: cannot find the user');
      return;
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(401).json('error: password doesnot match');
      return;
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET);
    res.json({ token, username: userForToken.username, id: userForToken.id });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
