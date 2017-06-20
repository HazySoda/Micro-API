const Sequelize = require('sequelize')
const sequelize = require('../conf/db')

const userModel = sequelize.define('user', {
  uid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  hashpwd: {
    type: Sequelize.STRING
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {timestamps: false})

module.exports = userModel
