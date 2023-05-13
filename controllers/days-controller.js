const { Day } = require('../models')
const { handleValidateOwnership } = require('../middleware/auth')


// index

async function index(req, res, next) {
    try {
        res.status(200).json(await Day.find({owner: req.user._id}))

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

async function create(req, res, next) {
    try {
        req.body.date = new Date(req.body.date)
        req.body.owner = req.user._id

        res.status(201).json(await Day.create(req.body))
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}


async function update(req, res, next) {
    try {
        const foundDay = await Day.findById(req.params.id)
        //handle validate ownership
        handleValidateOwnership(req, foundDay)
        foundDay.flags = req.body.flags

        res.status(200).json(await foundDay.save())
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

async function show(req, res, next){
    try {
        const foundDay = await Day.findById(req.params.id)
         //handle validate ownership
        handleValidateOwnership(req, foundDay)

        res.status(200).json(foundDay)
        
    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
}


module.exports = {
    index,
    create,
    update,
    show
}