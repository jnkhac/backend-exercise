const {DataTypes} = require('sequelize');

module.exports = {
  up: async ({context: QueryInterface}) => {
    await QueryInterface.createTable('categories', {
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
    });
  },
  down: async ({context: QueryInterface}) => {
    await QueryInterface.dropTable('categories');
  },
};
