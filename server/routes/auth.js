const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const models = require('../models')
const bcrypt = require('bcrypt-nodejs')

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local-login',
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Incorrect username or password.',
          user
        })
      }

      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err)
        }
        const token = jwt.sign(user.toJSON(), process.env.JWTSECRET)
        return res.json({ user, token, message: 'Success!' })
      })
    }
  )(req, res)
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

router.post('/signup', (req, res) => {
  models.user.findOne({ where: { username: req.body.username } }).then(user => {
    if (user) {
      console.log('user already exists?')
      return res.json({ success: false, message: 'That user already exists' })
    } else {
      const userPass = generateHash(req.body.password)
      models.user
        .create({
          username: req.body.username,
          password: userPass,
          avatarUrl: req.body.avatarUrl,
          postCount: 0
        })
        .then(newUser => {
          if (!newUser) {
            return false
          } else {
            return res.json({ success: true, message: 'User created!' })
          }
        })
    }
  })
})

module.exports = router
exports.generateHash = generateHash
