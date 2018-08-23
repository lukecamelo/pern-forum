const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { User } = require('../sequelize')
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

// passport version
// router.post(
//   '/signup',
//   passport.authenticate(
//     'local-signup',
//     { session: false },
//     (req, res, next) => {
//       res.json({
//         message: 'signup successful!',
//         // user: req.user
//       })
//     }
//   )
// )

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, message: 'Please enter username and password.' })
  } else {
    const userPassword = generateHash(req.body.password)
    models.user.create({ username: req.body.username, password: userPassword })
    return res.json({ success: true, message: 'User created!' })
  }
})

module.exports = router
