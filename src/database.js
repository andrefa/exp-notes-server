const Sequelize = require('sequelize')
const models = require('./models')
const config = require('./config')

const db = {}

const sequelize = new Sequelize(
  config.db.uri,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
)

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize)
  db[seqModel.name] = seqModel
})

Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
