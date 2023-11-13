const yup = require('yup');

const todoCreateRules = yup.object({
  title: yup.string().required(),
  desc: yup.string().optional(),
  categoryId: yup.number().min(1).required(),
});

const todoDeleteRules = yup.object({
  id: yup.number().min(1).required(),
});

const todoPutRules = yup.object({
  id: yup.number().min(1).required(),
});

module.exports = {
  todoCreateRules,
  todoDeleteRules,
  todoPutRules,
};
