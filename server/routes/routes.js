const express = require('express')
const router = express.Router()
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

// WORK IN PROGRESS, SOMEHOW ACTUALLY DOES WORK
const makeThreadAndOp = async (req, res, next) => {
  const body = req.body

  let post = {
    author: body.author,
    content: body.content,
    userId: body.userId,
    thread: {
      title: body.title,
      content: body.content,
      userId: body.userId
    }
  }

  post = await models.post.create(post, { include: [models.thread] })
  post = await models.post.findOne({
    where: { id: post.id },
    include: [models.user, models.thread]
  })
  req.data = post
  next()
}

// Creates thread
router.post('/api/threads', makeThreadAndOp, (req, res) => {
  return req.data
})

// Returns all threads
// NOT BEING USED. /api/allposts is currently being used for thread list
router.get('/api/threads', (req, res) => {
  models.thread
    .findAll()
    .then(threads => threads.sort(compareDateCreated))
    .then(threads => res.json(threads))
})

// get single thread
router.get('/api/threads/:id', (req, res) => {
  models.thread
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.post,
          as: 'Post',
          include: [{ model: models.user }]
        },
        { model: models.user }
      ]
    })
    .then(thread => res.json(thread))
})

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

const editAvatarUrl = async (req, res, next) => {
  const body = req.body
  const user = await models.user.findOne({ where: { id: body.userId } })
  await user.updateAttributes({ avatarUrl: body.newAvatarUrl })
  next()
}

router.post('/api/users/:id/avatar', editAvatarUrl, (req, res) => {
  return req.data
})

// Returns all posts in a thread
router.get('/api/threads/:id/posts', (req, res) => {
  models.post
    .findAll({ where: { threadId: req.params.id }, include: [models.user] })
    .then(posts => res.json(posts))
})

router.get('/api/allposts', (req, res) => {
  models.thread
    .findAll({
      include: [
        {
          model: models.post,
          as: 'Post'
        }
      ],
      order: [[{ model: models.post, as: 'Post' }, 'createdAt', 'DESC']]
    })
    .then(posts => res.json(posts))
    .catch(err => console.log('error at /api/allposts: ', err))
})

const makePost = async (req, res, next) => {
  const body = req.body

  let post = {
    author: body.username,
    content: body.content,
    userId: body.userId,
    threadId: body.threadId
  }

  post = await models.post.create(post)
  post = await models.post.findOne({
    where: { id: post.id },
    include: [models.user, models.thread]
  })
  let user = await models.user.findOne({ where: { id: body.userId } })
  await user.updateAttributes({ postCount: user.postCount + 1 })
  req.data = post
  next()
}

router.post('/api/threads/:id/posts', makePost, (req, res) => {
  // models.user
  //   .findById(req.body.userId)
  //   .then(() =>
  //     models.post.create({
  //       author: req.body.username,
  //       content: req.body.content,
  //       userId: req.body.userId,
  //       threadId: req.params.id
  //     })
  //   )
  //   .then(post =>
  //     models.post.findOne({
  //       where: { id: post.id },
  //       include: [{ model: models.user }, { model: models.thread }]
  //     })
  //   )
  //   .then(postWithAssociations => res.json(postWithAssociations))
  //   .catch(err => console.log(err))
  return req.data
})

module.exports = router
