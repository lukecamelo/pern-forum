const express = require('express')
const bodyParser = require('body-parser')
require('./server/passport')
require('dotenv').config()
const passport = require('passport')
const cors = require('cors')
const path = require('path')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const user = require('./server/routes/user')
const auth = require('./server/routes/auth')
const index = require('./server/routes/routes')
const thread = require('./server/routes/thread')

app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/', index)
app.use('/thread', thread)
app.use('/user', passport.authenticate('jwt', { session: false }), user)
app.use('/auth', auth)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// models.sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`Running on http://localhost:${port}`)
//   })
// })

module.exports = app
