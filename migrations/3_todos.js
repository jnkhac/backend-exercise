const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
    up: async ({ context: QueryInterface }) => {
        await QueryInterface.createTable('todos', {
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
        })
    },
    down: async ({ context: QueryInterface }) => {
        await QueryInterface.dropTable('todos')
    }
}