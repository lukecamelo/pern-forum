const express = require('express')
const router = express.Router()
const models = require('../models')
const userController = require('../controllers/user.controller')

// Returns all users
router.get('/api/users', (req, res) => {
  models.user.findAll().then(users => res.json(users))
})

// Returns single user
router.get('/api/users/:id', (req, res) => {
  models.user
    .findOne({ where: { id: req.params.id } })
    .then(user => res.json(user))
})

// Get all posts by user
router.get('/api/users/:id/posts', (req, res) => {
  models.post
    .findAll({ where: { userId: req.params.id } })
    .then(posts => res.json(posts))
})

router.post(
  '/api/users/:id/avatar',
  userController.editAvatarUrl,
  (req, res) => {
    return req.data
  }
)

module.exports = router
