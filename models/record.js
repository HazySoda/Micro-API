// 健身数据表
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('record', {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heartRate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beauty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dumbbells: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {tableName: 'record'})
}
