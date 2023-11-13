const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../util/db');

/** Represents a Category */
class Category extends Model { }

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'category',
});

module.exports = Category;
