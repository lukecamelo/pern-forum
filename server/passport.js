const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('./sequelize')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt-nodejs')

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, cb) {
      const isValidPassword = function(userpass, password) {
        return bcrypt.compareSync(password, userpass)
      }

      User.findOne({ where: { username } }).then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password.' })
        }

        if (!isValidPassword(user.password, password)) {
          return cb(null, false, {
            message: 'Incorrect password.'
          })
        }
        return cb(null, user, { message: 'Logged in successfully' })
      })
    }
  )
)

// Potentially unnecessary?
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, cb) {
      User.findOne({ where: { username } }).then(user => {
        if (user) {
          console.log('first if statement', user)
          return cb(null, false, {
            message: 'That username is already taken'
          })
        } else {
          const userPassword = User.prototype.generateHash(password)
          const data = {
            username,
            password: userPassword
          }
          User.create(data).then((newUser, created) => {
            if (!newUser) {
              return cb(null, false)
            }
            if (newUser) {
              return cb(null, newUser)
            }
          })
        }
      })
    }
  )
)

// Creates jwt token for stateless authorization
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret'
    },
    function(jwtPayload, cb) {
      return User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user)
        })
        .catch(err => {
          return cb(err)
        })
    }
  )
)
