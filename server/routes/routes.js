const express = require('express')
const router = express.Router()
const models = require('../models')

// Returns all users
router.get('/api/users', (req, res) => {
  models.user.findAll().then(users => res.json(users))
})

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

// Edits users avatarUrl
const editAvatarUrl = async (req, res, next) => {
  const body = req.body
  const user = await models.user.findOne({ where: { id: body.userId } })
  await user.updateAttributes({ avatarUrl: body.newAvatarUrl })
  next()
}

router.post('/api/users/:id/avatar', editAvatarUrl, (req, res) => {
  return req.data
})

module.exports = router
exports.editAvatarUrl = editAvatarUrl
