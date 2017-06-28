//  用户表
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
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fields: {
      type: DataTypes.STRING,
      allowNull: true
    },
    regDate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {tableName: 'user'})
}
