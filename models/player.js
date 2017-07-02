// 参加挑战用户表
module.exports = function (sequelize, Datatypes) {
  return sequelize.define('player', {
    uid: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    pid: {
      type: Datatypes.INTEGER,
      allowNull: true
    },
    type: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  }, {tableName: 'player'})
}
