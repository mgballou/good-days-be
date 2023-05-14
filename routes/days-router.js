const express = require('express')
const router = express.Router()
const daysCtrl = require('../controllers/days-controller')
const {requireToken} = require('../middleware/auth')



//index
router.get('/', requireToken, daysCtrl.index)

//create
router.post('/', requireToken, daysCtrl.create)


// show
router.get('/:id', requireToken, daysCtrl.show)


// update
router.put('/:id', requireToken, daysCtrl.update)

module.exports = router