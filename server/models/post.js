module.exports = (sequelize, type) => {
  const Post = sequelize.define('post', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: type.STRING,
      allowNull: false
    },
    content: {
      type: type.TEXT,
      allowNull: false
    }
  })
  return Post
}
