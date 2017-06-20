'use strict'

var Sequelize = require('sequelize')

exports.sequelize = function () {
  return new Sequelize('test', 'root', 'wjzl2008', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: console.log
  })
}
