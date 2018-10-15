module.exports = (sequelize, type) => {
  const Subforum = sequelize.define('subforum', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Subforum.hasMany(models.Thread)
      }
    }
  })
  return Subforum
}