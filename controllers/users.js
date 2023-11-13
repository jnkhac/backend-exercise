const bcrypt = require('bcrypt');
const router = require('express').Router();

const {User} = require('../models');
const {bodyValidation} = require('../util/middleware');
const userRules = require('../util/validationRules/userRules');

router.post('/', bodyValidation(userRules), async (req, res) => {
  try {
    const {password} = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({...req.body, password_hash: passwordHash});
    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({error: 'username already exists'});
    } else {
      return res.status(400).end();
    }
  }
});

module.exports = router;
