const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL)

module.exports = { sequelize }