const { Day } = require('../models')
const { handleValidateOwnership } = require('../middleware/auth')


async function create(req, res, next){
    try {
        const foundDay = await Day.findById(req.params.id)
        //handle validate ownership
        handleValidateOwnership(req, foundDay)

        foundDay.entries.push(req.body)


        res.status(200).json(await foundDay.save())
        
    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
}

async function destroy (req, res, next){
    try {
        const foundDay = await Day.findOne({
            'entries._id': req.params.id
        })
         //handle validate ownership
        handleValidateOwnership(req, foundDay)

        foundDay.entries.remove(req.params.id)
        
        res.status(200).json(await foundDay.save())
        
    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
}

module.exports = {
    create,
    destroy
}