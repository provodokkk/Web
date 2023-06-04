const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname) // reads current directory and gives an array of files
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    // sequelize[model.name] = model;
    db[model.name] = model;
  })


db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db