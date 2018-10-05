const models = require('../models')

module.exports = {
  makeThreadAndOp,
  makePost,
  getThreadPosts,
  getThreads
}

async function makeThreadAndOp (req, res, next) {
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

async function makePost (req, res, next) {
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

async function getThreadPosts (req, res, next) {
  let posts = models.post.findAll({
    where: { threadId: req.params.id },
    include: [models.user]
  })
  req.data = posts
  next()
}

// DOESN'T WORK ???
async function getThreads (req, res, next) {
  let threads = await models.thread.findAll({
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
