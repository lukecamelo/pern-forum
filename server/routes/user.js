const express = require('express')
const router = express.Router()

// Mostly test routes
// TODO: move all user related routes into this file
router.get('/', (req, res, next) => {
  res.send({ message: 'you found me' })
})

router.get('/profile', function(req, res, next) {
  res.send(req.user)
})

module.exports = router
