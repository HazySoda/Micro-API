// 参加挑战用户表
module.exports = function (sequelize, Datatypes) {
  return sequelize.define('player', {
    uid: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    record: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    cal: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false
    },
    type: {
      type: Datatypes.BOOLEAN,
      allowNull: false
    }
  }, {tableName: 'player'})
}
