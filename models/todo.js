const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../util/db');

/** Represents a todo item */
class Todo extends Model { }

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'users', key: 'id'},
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'categories', key: 'id'},
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'todo',
});

module.exports = Todo;
