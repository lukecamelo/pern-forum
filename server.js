// reverting to other app file for heroku troubleshooting
const models = require('./server/models/')
const app = require('./app')

// models.sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`)
  })
// })