// CRUD SQL语句
var user = {
  /*
    创建users表
    id 设置非空约束， 主键， 自增
    nickname 非空约束  唯一约束
    phoneNumber 非空约束 唯一约束
    hashpwd 非空约束
  */
  createUserTable: `CREATE TABLE users (
    uid INT(15) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nickname CHAR(20) NOT NULL UNIQUE KEY,
    phoneNumber VARCHAR(32) NOT NULL UNIQUE KEY,
    hashpwd VARCHAR(32) NOT NULL
  );`,
  insert: 'INSERT INTO users(uid, nickname, phoneNumber, hashpwd) VALUES(0,?,?,?)',
  update: 'update users set nickname = ?, phoneNumber =? where uid = ?',
  delete: 'delete from users where uid=?',
  queryById: 'select * from users where uid=?',
  queryAll: 'select * from users',
  query: function (field) {
    return `select * from users where ${field}=?`
  }
}

module.exports = user
