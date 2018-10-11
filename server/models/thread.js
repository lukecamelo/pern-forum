module.exports = (sequelize, type) => {
  const Thread = sequelize.define('thread', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Thread.belongsTo(models.User)
      }
    }
  })
  return Thread
}