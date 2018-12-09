const models = require('../models')

module.exports = {
  makeThreadAndOp,
  makePost,
  getThreadPosts,
  getThreads
}

async function makeThreadAndOp(req, res, next) {
  const body = req.body

  // Builds post object with data sent from the client
  let post = {
    author: body.author,
    content: body.content,
    userId: body.userId,
    // Sort of retroactively includes the thread that the post lives in
    thread: {
      title: body.title,
      content: body.content,
      userId: body.userId,
      subforumId: body.subforumId
    }
  }

  // Creates post model and the user/thread associations
  post = await models.post.create(post, { include: [models.thread] })
  post = await models.post.findOne({
    where: { id: post.id },
    include: [models.user, models.thread]
  })

  // Updates the post creators post count
  let user = await models.user.findOne({ where: { id: body.userId } })
  await user.updateAttributes({ postCount: user.postCount + 1 })

  req.data = res.json(post)
  next()
}

async function makePost(req, res, next) {
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

  req.data = res.json({ post })
  next()
}

async function getThreadPosts(req, res, next) {
  let posts = models.post.findAll({
    where: { threadId: req.params.id },
    include: [models.user]
  })

  req.data = posts
  next()
}

// DOESN'T WORK ???
async function getThreads(req, res, next) {
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
