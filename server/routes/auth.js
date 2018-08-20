const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { User } = require('../sequelize')

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local-login',
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something borked up',
          user
        })
      }

      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err)
        }
        const token = jwt.sign(user.toJSON(), 'your_jwt_secret')
        return res.json({ user, token })
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

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, message: 'Please enter username and password.' })
  } else {
    const userPassword = User.prototype.generateHash(req.body.password)
    User.create({ username: req.body.username, password: userPassword })
  }
})

module.exports = router
