const express = require('express')
const app = express()
const cors = require("cors");
const transactionsController = require('./controllers/transactionsController')

app.use(express.json())
app.use(cors())

app.use('/transactions', transactionsController)

module.exports = app