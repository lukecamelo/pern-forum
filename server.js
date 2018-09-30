// reverting to other app file for heroku troubleshooting

const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`)
})