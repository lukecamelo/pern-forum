const express = require('express')
const router = express.Router()
const models = require('../models')
const threadController = require('../controllers/thread.controller')

// Creates thread
router.post('/threads', threadController.makeThreadAndOp, (req, res) => {
  return req.data
})

// Returns all threads
router.get('/threads', (req, res) => {
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
    .catch(err => console.log(err))
})

// Returns all posts in a thread
router.get('/:id/posts', (req, res) => {
  models.post
    .findAll({
      where: { threadId: req.params.id }
    })
    .then(post => res.json(post))
})

// Makes post in thread
router.post('/:id/posts', (req, res) => {
  const body = req.body
  let post = {
    author: body.username,
    content: body.content,
    userId: body.userId,
    threadId: body.threadId
  }
  models.post
    .create(post)
    .then(post => {
      models.post.findOne({
        where: { id: post.id },
        include: [{ model: models.user }, { model: models.thread }]
      })
    })
    .then(post => res.json(post))

  // post = await models.post.create(post)
  // post = await models.post.findOne({
  //   where: { id: post.id },
  //   include: [models.user, models.thread]
  // })
  // let user = await models.user.findOne({ where: { id: body.userId } })
  // await user.updateAttributes({ postCount: user.postCount + 1 })
  // return req.data
})

// Edits a post
router.post('/:id/editpost', (req, res) => {
  models.post
    .update(
      { content: req.body.content },
      { where: { id: req.body.id, threadId: req.params.id } }
    )
    .then(post => {
      return res.json(post)
    })
})

// Get single thread
router.get('/:id', (req, res) => {
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
      ],
      order: [[{ model: models.post, as: 'Post' }, 'createdAt', 'ASC']]
    })
    .then(thread => res.json(thread))
})

module.exports = router
