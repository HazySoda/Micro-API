// 用户关注与被关注表
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('relation', {
    from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {tableName: 'relation'})
}
