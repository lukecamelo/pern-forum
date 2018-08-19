const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send({ message: 'you found me' })
})

router.get('/profile', function(req, res, next) {
  res.send(req.user)
})

module.exports = router
