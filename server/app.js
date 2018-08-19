const express = require('express')
const bodyParser = require('body-parser')
const { User, Thread } = require('./sequelize')

const app = express()
app.use(bodyParser.json())

const port = 8080
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})

app.get('/api/hello', (req, res) => {
  res.send({ message: 'greetings from api' })
})

app.post('/api/users', (req, res) => {
  User.create(req.body).then(user => res.json(user))
})

app.post('/api/threads', (req, res) => {
  const body = req.body
  User.findById(body.userId)
    .then(() => Thread.create(body))
    .then(thread =>
      Thread.findOne({ where: { id: thread.id }, include: [User] })
    )
    .then(threadWithAssociations => res.json(threadWithAssociations))
    .catch(err =>
      res
        .status(400)
        .json({
          err: `User with id = [${body.userId}] doesn't exist in the database`
        })
    )
})

app.get('/api/threads', (req, res) => {
  Thread.findAll().then(threads => res.json(threads))
})

app.get('/api/users', (req, res) => {
  User.findAll().then(users => res.json(users))
})
