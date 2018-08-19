const express = require('express')
const router = express.Router()
const { User, Thread } = require('./sequelize')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Test route
router.get('/api/hello', (req, res) => {
  res.send({ message: 'greetings from api' })
})

// Creates new user
router.post('/api/users', (req, res) => {
  User.create(req.body).then(user => res.json(user))
})

// Creates thread
router.post('/api/threads', (req, res) => {
  const body = req.body
  User.findById(body.userId)
    .then(() => Thread.create(body))
    .then(thread =>
      Thread.findOne({ where: { id: thread.id }, include: [User] })
    )
    .then(threadWithAssociations => res.json(threadWithAssociations))
    .catch(err =>
      res.status(400).json({
        err: `User with id = [${body.userId}] doesn't exist in the database`
      })
    )
})

// Returns all threads
router.get('/api/threads', (req, res) => {
  Thread.findAll().then(threads => res.json(threads))
})

// Returns all users
router.get('/api/users', (req, res) => {
  User.findAll().then(users => res.json(users))
})

// POST login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something borked up',
        user
      })
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err)
      }
      const token = jwt.sign(user.toJSON(), 'your_jwt_secret')
      return res.json({ user, token })
    })
  })(req, res)
})

// GET user profile
router.get('/profile', function(req, res, next) {
  res.send({ message: req.user })
})
module.exports = router
