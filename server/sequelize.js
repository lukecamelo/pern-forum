/*
  This file used to be used to be config file for sequelize. I only keep it for posterity,
  there is not much relevant here.
*/

// const Sequelize = require('sequelize')
// const bcrypt = require('bcrypt-nodejs')
// const UserModel = require('./models/user')
// const ThreadModel = require('./models/thread')

// const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })

// // Instantiating models and creating associations
// const User = UserModel(sequelize, Sequelize)
// const Thread = ThreadModel(sequelize, Sequelize)

// Thread.belongsTo(User)
// User.hasMany(Thread)

// // Adding instance methods used for hashing/salting passwords
// User.prototype.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }

// const userPassword = User.prototype.generateHash('testpassword')

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })
//   .then(() => {
//     // test user
//     User.create({ username: 'rediscover', password: userPassword })
//   })
//   .then(() => {
//     Thread.create({
//       title: 'My favorite retard',
//       content:
//         'Once upon a time there was a retard, my favorite retard, and I killed him.',
//       userId: 1
//     }, { include: [User] })
//   })

// module.exports = {
//   User,
//   Thread
// }
