const router = require('express').Router();
const {Op} = require('sequelize');

const {
  tokenExtractor,
  bodyValidation,
  paramsValidation,
} = require('../util/middleware');
const {Todo, User} = require('../models');
const {
  todoCreateRules,
  todoDeleteRules,
  todoPutRules,
} = require('../util/validationRules/todoRules');

router.get('/', async (req, res) => {
  const where = {};
  if (req.query.category) {
    where.categoryId = req.query.category;
  }
  if (req.query.desc) {
    where.desc = {
      [Op.substring]: req.query.desc,
    };
  }
  const todos = await Todo.findAll({where});
  res.json(todos);
});

router.post('/', tokenExtractor, bodyValidation(todoCreateRules), async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const todo = await Todo.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(todo);
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({error: 'invalid categoryId'});
    } else {
      return res.status(400).end();
    }
  }
});

const findTodoByPkAndValidateUser = async (id, userId) => {
  const todo = await Todo.findByPk(id);
  if (!todo || todo.userId !== userId) {
    return null;
  }
  return todo;
};

router.delete('/:id', tokenExtractor, paramsValidation(todoDeleteRules), async (req, res) => {
  const todo = await findTodoByPkAndValidateUser(req.params.id, req.decodedToken.id);
  if (todo) {
    await todo.destroy();
    return res.status(204).end();
  }
  return res.status(404).end();
});

router.put('/:id', tokenExtractor, paramsValidation(todoPutRules), async (req, res) => {
  const todo = await findTodoByPkAndValidateUser(req.params.id, req.decodedToken.id);
  if (todo) {
    todo.title = req.body.title || todo.title;
    todo.desc = req.body.desc || todo.desc;
    todo.categoryId = req.body.categoryId || todo.categoryId;
    await todo.save();
    res.json(todo);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
