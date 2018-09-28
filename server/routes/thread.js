const express = require('express')
const router = express.Router()
const models = require('../models')

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
  let user = await models.user.findOne({ where: { id: body.userId } })
  await user.updateAttributes({ postCount: user.postCount + 1 })
  req.data = post
  next()
}

const makePost = async (req, res, next) => {
  const body = req.body
  console.log(res.json(body))

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

const getThreads = async (req, res, next) => {
  let threads = models.thread.findAll({
    include: [
      {
        model: models.post,
        as: 'Post'
      }
    ],
    order: [[{ model: models.post, as: 'Post' }, 'createdAt', 'DESC']]
  })
  req.data = threads
  next()
}

// Creates thread
router.post('/threads', makeThreadAndOp, (req, res) => {
  return req.data
})

// Returns all threads
// Using the async/await middleware causes threads not to sort properly
// as well as not reporting their postcounts on the list ???
router.get('/threads', (req, res) => {
  models.thread.findAll({
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
  // return req.data
})

const getThreadPosts = async (req, res, next) => {
  let posts = models.post.findAll({
    where: { threadId: req.params.id },
    include: [models.user]
  })
  req.data = posts
  next()
}

// Returns all posts in a thread
router.get('/:id/posts', getThreadPosts, (req, res) => {
  // models.post
  //   .findAll({ where: { threadId: req.params.id }, include: [models.user] })
  //   .then(posts => res.json(posts))
  return req.data
})

// Makes post in thread
router.post('/:id/posts', makePost, (req, res) => {
  return req.data
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
      ]
    })
    .then(thread => res.json(thread))
})

module.exports = router
