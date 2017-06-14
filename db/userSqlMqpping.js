// CRUD SQL语句
var user = {
  createUserTable: `CREATE TABLE users (
    id INT(15) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE KEY,
    age TINYINT(3) NOT NULL
  );`,
  insert: 'INSERT INTO users(id, name, age) VALUES(0,?,?)',
  update: 'update users set name=?, age =? where id = ?',
  delete: 'delete from users where id=?',
  queryById: 'select * from users where id=?',
  queryAll: 'select * from users'
}

module.exports = user
