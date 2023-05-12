const express = require('express')
const router = express.Router()
const daysCtrl = require('../controllers/days-controller')



//index
router.get('/', daysCtrl.index)

//create
router.post('/', daysCtrl.create)


// show
router.get('/:id', daysCtrl.show)


// update
router.put('/:id', daysCtrl.update)

module.exports = router