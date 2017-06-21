const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const mysqlConf = require('./conf/mysql').pengfei
// const mysqlConf = require('./conf/mysql').xinpeng

var db = new Sequelize(mysqlConf.dbname, mysqlConf.username, mysqlConf.password, {
  host: mysqlConf.host,
  port: mysqlConf.port,
  define: {
    timestamps: false
  },
  logging: function (str) {
    fs.appendFile('./logs/dblog/db.log', str + '\n', () => {})
  },
  dialect: 'mysql'
})

module.exports = function (name) {
  let model = db.import(path.resolve('models', name))
  db.sync() // 同步模型到数据库中
  return model
}
