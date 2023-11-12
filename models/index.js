const Todo = require('./todo');
const User = require('./user');
const Category = require('./category');

User.hasMany(Todo);
Todo.belongsTo(User);

Category.hasMany(Todo);
Todo.belongsTo(Category);

module.exports = {
  Todo, User, Category,
};
