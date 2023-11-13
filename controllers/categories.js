const router = require('express').Router();

const {Category} = require('../models');

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    return res.status(400).json({error});
  }
});

module.exports = router;
