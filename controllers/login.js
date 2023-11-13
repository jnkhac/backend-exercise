const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const {SECRET} = require('../util/config');
const {User} = require('../models');
const {bodyValidation} = require('../util/middleware');
const loginRules = require('../util/validationRules/loginRules');

router.post('/', bodyValidation(loginRules), async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  const passwordCorrect = user === null ?
        false :
        await bcrypt.compare(password, user.password_hash);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, SECRET);
  return res.send({
    id: user.id, name: user.name, username: user.username, token,
  });
});

module.exports = router;
