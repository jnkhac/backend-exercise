const yup = require('yup');

const categoryRules = yup.object({
  name: yup.string().required(),
});

module.exports = categoryRules;
