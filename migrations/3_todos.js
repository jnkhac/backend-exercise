const {DataTypes} = require('sequelize');

module.exports = {
  up: async ({context: QueryInterface}) => {
    await QueryInterface.createTable('todos', {
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'categories', key: 'id'},
      },
    });
  },
  down: async ({context: QueryInterface}) => {
    await QueryInterface.dropTable('todos');
  },
};
