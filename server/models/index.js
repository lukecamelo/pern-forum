'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(module.filename)
var db = {}
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const user = require('./user')
const thread = require('./thread')
const post = require('./post')
const subforum = require('./subforum')
require('dotenv').config()
console.log(env)

let sequelize
if (env == 'production') {
  sequelize = new Sequelize(process.env.PROD_DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  })
} else if (env == 'development') {
  sequelize = new Sequelize(
    'pern_forum',
    process.env.DBUSER,
    process.env.DBPASS,
    {
      dialect: 'postgres',
      host: 'localhost',
      operatorsAliases: false
    }
  )
}

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
    console.log(db[modelName])
    db[modelName].associate(db)
  }
})

// Creating model associations
db.thread.belongsTo(db.user)
db.user.hasMany(db.thread)

db.user.hasMany(db.post)
db.post.belongsTo(db.user)
db.post.belongsTo(db.thread)
db.thread.hasMany(db.post, { as: 'Post' })
db.subforum.hasMany(db.thread)
db.thread.belongsTo(db.subforum)

// aliases
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
