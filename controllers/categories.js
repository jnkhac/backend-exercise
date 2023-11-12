const router = require('express').Router()

const { Category } = require('../models')

router.get('/', async (req, res) => {
    const categories = await Category.findAll()
    res.json(categories)
})

router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.json(category)
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router