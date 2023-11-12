const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Todo, User } = require('../models')

router.get('/', async (req, res) => {
    const where = {}
    if (req.query.category) {
        where.categoryId = req.query.category
    }
    if (req.query.desc) {
        where.desc = {
            [Op.substring]: req.query.desc
        }
    }
    const todos = await Todo.findAll({
        where
    })
    res.json(todos)
})

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const todo = await Todo.create({ ...req.body, userId: user.id, date: new Date() })
        res.json(todo)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const todo = await Todo.findByPk(req.params.id, {
        include: [{
            where: {
                model: User,
                where: {
                    id: user.id
                }
            }
        }]
    })
    if (todo) {
        await todo.destroy()
    }
    res.status(204).end()
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const todo = await Todo.findByPk(req.params.id, {
        include: [{
            where: {
                model: User,
                where: {
                    id: user.id
                }
            }
        }]
    })
    if (todo) {
        todo.title = req.body.title
        todo.description = req.body.description
        await todo.save()
        res.json(todo)
    } else {
        res.status(404).end()
    }
})

module.exports = router