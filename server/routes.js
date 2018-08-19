const express = require('express')
const { User, Thread } = require('./sequelize')
const router = express.Router()

router.get('/api/hello', (req, res) => {
  res.send({ message: 'greetings from api' })
})

router.post('/api/users', (req, res) => {
  User.create(req.body).then(user => res.json(user))
})

router.post('/api/threads', (req, res) => {
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

router.get('/api/threads', (req, res) => {
  Thread.findAll().then(threads => res.json(threads))
})

router.get('/api/users', (req, res) => {
  User.findAll().then(users => res.json(users))
})

module.exports = router