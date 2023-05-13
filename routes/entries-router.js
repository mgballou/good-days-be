const express = require('express')
const router = express.Router()

const entriesCtrl = require("../controllers/entries-controller")
const {requireToken} = require('../middleware/auth')



router.post('/days/:id/entries', requireToken, entriesCtrl.create)

router.delete('/entries/:id', requireToken, entriesCtrl.destroy)



module.exports = router