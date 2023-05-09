const express = require('express')
const router = express.Router()

const entriesCtrl = require("../controllers/entries-controller")



router.post('/days/:id/entries', entriesCtrl.create)

router.delete('/entries/:id', entriesCtrl.destroy)



module.exports = router