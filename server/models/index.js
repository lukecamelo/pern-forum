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
const url =
  'postgres://ixokdhlskmpphx:c9ad01e9c20556fc75242e5b2b6e600539b805dde77ab33b3a14d670bd61c9d7@ec2-54-83-13-119.compute-1.amazonaws.com:5432/dcbbl2rbe22bj6'
  // TEST DB
  // 'postgres://uyebwslsddifoh:4526fe1ec0111715e1c0a273f2b643d3dd8a5293c1e6ac27b2b81d3885834c9e@ec2-54-83-29-34.compute-1.amazonaws.com:5432/dehbi7ag50lkf'

const sequelize = new Sequelize(url, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

// const sequelize = new Sequelize(
//   'pern_forum',
//   process.env.DBUSER,
//   process.env.DBPASS,
//   {
//     dialect: 'postgres',
//     host: 'localhost'
//   }
// )

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

db.thread.belongsTo(db.user)
db.user.hasMany(db.thread)

db.user.hasMany(db.post)
db.post.belongsTo(db.user)
db.post.belongsTo(db.thread)
db.thread.hasMany(db.post, { as: 'Post' })


// aliases
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
