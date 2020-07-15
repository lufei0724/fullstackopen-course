const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Blog = require('../models/blog');

const unknownEndpoint = (req, res) => {
  res.status(404).end();
};

const errorHandler = (err, res, req, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return req.status(400).send({ error: err.message });
};

const getTokenFrom = (req) => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (req, res, next) => {
  try {
    console.log('In token extractor ', req);
    const token = getTokenFrom(req);
    if (!token) {
      throw new Error('cannot get token');
    }
    const decoded = jwt.verify(token, config.SECRET);
    if (!decoded || !decoded.id) {
      throw new Error('invalid token');
    } else {
      req.token = decoded;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
