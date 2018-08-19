const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('./sequelize')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, cb) {
      User.findOne({ where: { username, password } }).then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password.' })
        }

        return cb(null, user, { message: 'Logged in successfully' })
      })
    }
  )
)

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
