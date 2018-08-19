const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const ThreadModel = require('./models/thread')

const sequelize = new Sequelize('pern_forum', 'rediscover', 'thegreatbeyond', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const Thread = ThreadModel(sequelize, Sequelize)

Thread.belongsTo(User)
User.hasMany(Thread)

sequelize
  .sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .then(() => {
    User.create({ username: 'rediscover', password: 'testpassword' })
  })

module.exports = {
  User,
  Thread
}
