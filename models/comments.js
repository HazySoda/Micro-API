// 评论表
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('comments', {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {tableName: 'comments'})
}
