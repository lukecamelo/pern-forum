const express = require('express')
const bodyParser = require('body-parser')
const { User, Thread } = require('./sequelize')
require('./passport')
const passport = require('passport')

const app = express()
app.use(bodyParser.json())

const port = 8080
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})

// TEMPORARY
const user = require('./routes')
app.use(require('./routes'))
app.use('/user', passport.authenticate('jwt', { session: false }), user)
