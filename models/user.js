'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    uid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashpwd: {
      type: DataTypes.STRING
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    regDate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    charset: 'utf8'
  })
}
