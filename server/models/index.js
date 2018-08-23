// const bcrypt = require('bcrypt-nodejs')

// if (!global.hasOwnProperty('db')) {
//   var Sequelize = require('sequelize')
//     , sequelize = null

//   if (process.env.PROD_DB_URL) {
//     // the application is executed on Heroku ... use the postgres database
//     sequelize = new Sequelize(process.env.PROD_DB_URL, {
//       dialect:  'postgres',
//       protocol: 'postgres',
//       port: process.env.DB_PORT,
//       host: process.env.HOST_NAME,
//       logging:  false,
//       native: true,
//       ssl: true,

//     })
//   } else {
//     // the application is executed on the local machine ... use mysql
//     sequelize = new Sequelize('pern-forum', 'rediscover', process.env.DBPASS)
//   }

//   global.db = {
//     Sequelize: Sequelize,
//     sequelize: sequelize,
//     User:      sequelize.import(__dirname + '/user'),
//     Thread:      sequelize.import(__dirname + '/thread')
//     // add your other models here
//   }

//   /*
//     Associations can be defined here. E.g. like this:
//     global.db.User.hasMany(global.db.SomethingElse)
//   */
//   global.db.Thread.belongsTo(global.db.User)
//   global.db.User.hasMany(global.db.Thread)

//   global.db.User.prototype.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
//   }
// }

// module.exports = global.db

'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(module.filename)
var db = {}

// Initialize sequelize with heroku postgres - the actuall address comes from the DATABASE_URL environment variable
var sequelize = new Sequelize(process.env.PROD_DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

// Read through this folder and join the contents (the models) into the db object
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

// Execute the 'associate' method from each model if it exists
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// aliases
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
