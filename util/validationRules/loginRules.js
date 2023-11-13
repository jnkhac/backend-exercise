const yup = require('yup');

const loginRules = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

module.exports = loginRules;
