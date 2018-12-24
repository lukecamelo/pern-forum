const models = require('../models')

module.exports = {
  editAvatarUrl,
  getUser
}

async function editAvatarUrl(req, res, next) {
  const body = req.body
  const user = await models.user.findOne({ where: { id: body.userId } })
  await user.updateAttributes({ avatarUrl: body.newAvatarUrl })
  next()
}

// Doesn't quite work right? User avatar url does not appear in UserControlPanel input
// when using this controller method instead of doing the calls in the route itself
async function getUser(req, res, next) {
  const user = models.user.findOne({ where: { id: req.params.id } })
  req.data = res.json(user)
}
