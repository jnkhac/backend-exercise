const yup = require('yup');

const userRules = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().required(),
});

module.exports = userRules;
