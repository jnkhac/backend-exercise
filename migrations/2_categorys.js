const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
    up: async ({ context: QueryInterface }) => {
        await QueryInterface.createTable('categorys', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true
            }
        })
    },
    down: async ({ context: QueryInterface }) => {
        await QueryInterface.dropTable('categorys')
    }
}