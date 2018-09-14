const express = require('express')
const router = express.Router()
const controller = require('../controller/appController')

router.post('/timeline', controller.timeline)

module.exports = router
