const bcrypt = require('bcrypt');
const router = require('express').Router();

const {User} = require('../models');

router.post('/', async (req, res) => {
  try {
    const {password} = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({...req.body, password_hash: passwordHash});
    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({error: 'user already exists'});
    } else {
      return res.status(400).json({error: 'invalid parameters'});
    }
  }
});

module.exports = router;
