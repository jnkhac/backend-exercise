const router = require('express').Router();

const {Category} = require('../models');
const {bodyValidation} = require('../util/middleware');
const categoryRules = require('../util/validationRules/categoryRules');

router.post('/', bodyValidation(categoryRules), async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({error: 'category already exists'});
    }
    return res.status(400).end();
  }
});

module.exports = router;
