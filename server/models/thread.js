module.exports = (sequelize, type) => {
  return sequelize.define('thread', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    content: type.TEXT
  })
}