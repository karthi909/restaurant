const express = require('express')
const router = express.Router()
const restoController = require('../Controller/restoController')

router.post('/api/create-resto', restoController.createResto)

router.get('/api/resto-near', restoController.getResto)

router.delete('/api/del-resto/:restoid', restoController.deleteResto)

router.put('/api/update-resto/:restoid', restoController.restoUpdate)

router.post('/api/rate-resto/:restoid', restoController.rateResto)

module.exports = router