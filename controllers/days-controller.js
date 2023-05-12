const { Day } = require('../models')



// index

async function index(req, res, next) {
    try {
        res.status(200).json(await Day.find())

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

async function create(req, res, next) {
    try {
        req.body.date = new Date(req.body.date)

        res.status(201).json(await Day.create(req.body))
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}


async function update(req, res, next) {
    try {
        console.log(req.params.id)
        console.log(req.body)
        

        res.status(200).json(await Day.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

async function show(req, res, next){
    try {
        res.status(200).json(await Day.findById(req.params.id))
        
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