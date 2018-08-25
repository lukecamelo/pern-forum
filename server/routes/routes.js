const express = require('express')
const router = express.Router()
const { User, Thread } = require('../sequelize')
const models = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Test route
router.get('/api/hello', (req, res) => {
  res.send({ message: 'greetings from api' })
})

// Creates new user
router.post('/api/users', (req, res) => {
  models.user.create(req.body).then(user => res.json(user))
})

// Creates thread
router.post('/api/threads', (req, res) => {
  const body = req.body
  models.user.findById(body.userId)
    .then(() =>
      models.thread.create({
        title: body.title,
        content: body.content,
        userId: body.userId
      })
    )
    .then(thread =>
      models.thread.findOne({ where: { id: thread.id }, include: [models.user] })
    )
    .then(threadWithAssociations => res.json(threadWithAssociations))
    // .catch(err =>
    //   res.status(400).json({
    //     err: `User with id = [${body.userId}] doesn't exist in the database`
    //   })
    // )
    .catch(err => console.log(err))
})

// Returns all threads
router.get('/api/threads', (req, res) => {
  models.thread.findAll().then(threads => res.json(threads))
})

// Returns all users
router.get('/api/users', (req, res) => {
  models.user.findAll().then(users => res.json(users))
})

module.exports = router
