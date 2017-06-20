// 数据库连接配置
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:wjzl2008@localhost:3306/test')

module.exports = sequelize
