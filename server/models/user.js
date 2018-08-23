'use strict'
const bcrypt = require('bcrypt-nodejs')

module.exports = (sequelize, type) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: type.STRING,
        allowNull: false
      },
      password: {
        type: type.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Thread)
        }
      },
      instanceMethods: {
        generateHash: function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        }
      }
    }
  )
  return User
}
