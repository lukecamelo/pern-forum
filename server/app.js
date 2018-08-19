const express = require('express')
const bodyParser = require('body-parser')
const { User, Thread } = require('./sequelize')

const app = express()
app.use(bodyParser.json())

const port = 8080
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})

app.use(require('./routes'))
