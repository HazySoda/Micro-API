// 多人挑战表
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('multiplayer', {
    pid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {tableName: 'multiplayer'})
}
