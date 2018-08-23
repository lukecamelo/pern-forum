module.exports = {
  development: {
    dialect: "postgres",
    storage: "../models"
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    dialect: 'postgres',
    use_env_variable: process.env.PROD_DB_URL
  }
}