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
    .then(threads => res.json(threads))
    .catch(err => console.log(err))
})

// Returns all posts in a thread
router.get('/:id/posts', (req, res) => {
  models.post
    .findAll({
      where: { threadId: req.params.id }
    })
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

// Makes new post
router.post('/:id/posts', async (req, res, next) => {
  try {
    console.log('in async route')
    let body = req.body

    let post = {
      author: body.username,
      content: body.content,
      userId: body.userId,
      threadId: parseInt(body.threadId, 10)
    }

    post = await models.post.create(post)
    post = await models.post.findOne({
      where: { id: post.id },
      include: [models.user, models.thread]
    })

    let user = await models.user.findOne({ where: { id: body.userId } })
    await user.updateAttributes({ postCount: user.postCount + 1 })

    return res.json({ post: post })
  } catch (e) {
    next(e)
  }
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

router.get('/:id/deletepost', (req, res) => {
  models.post
    .destroy({
      where: { id: req.params.id }
    })
    .then(post => res.json(post))
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
    .catch(err => console.log('error getting posts, ', err))
})

module.exports = router
