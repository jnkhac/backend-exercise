const {DataTypes} = require('sequelize');

module.exports = {
  up: async ({context: QueryInterface}) => {
    await QueryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async ({context: QueryInterface}) => {
    await QueryInterface.dropTable('users');
  },
};
