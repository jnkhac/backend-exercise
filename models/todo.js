const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Todo extends Model { }

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'categorys', key: 'id' }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'todo'
})

module.exports = Todo