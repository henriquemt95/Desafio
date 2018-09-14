const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// router
const general = require('./app/router/appRouter')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(morgan('dev'))
// allow origin
app.use(cors())
app.use('/', general)
app.set('json spaces', 4)

// connect to server port 3000
app.listen(5000, function () {
  console.log('Desafio dito', 500)
})
