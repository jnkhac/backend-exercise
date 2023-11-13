const jwt = require('jsonwebtoken');
const {SECRET} = require('./config.js');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({error: 'token invalid'});
    }
  } else {
    return res.status(401).json({error: 'token missing'});
  }
  next();
};

const bodyValidation = (rules) => async (req, res, next) => {
  try {
    await rules.validate(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({error: 'invalid body value(s)'});
  }
};

const paramsValidation = (rules) => async (req, res, next) => {
  try {
    await rules.validate(req.params);
    return next();
  } catch (error) {
    return res.status(400).json({error: 'invalid params value(s)'});
  }
};

module.exports = {
  tokenExtractor,
  bodyValidation,
  paramsValidation,
};
