const express = require('express')
const bodyParser = require('body-parser')
const { User, Thread } = require('./server/sequelize')
require('./server/passport')
require('dotenv').config()
const passport = require('passport')
const cors = require('cors')
const path = require('path')

const models = require('./server/models')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 8090

const user = require('./server/routes/user')
const auth = require('./server/routes/auth')
const index = require('./server/routes/routes')

app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/', index)
app.use('/user', passport.authenticate('jwt', { session: false }), user)
app.use('/auth', auth)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// models.sequelize.sync().then(() => {
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
// })
