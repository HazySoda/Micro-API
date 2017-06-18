// 引入Crypto 模块
var crypto = require('crypto')
var hash = crypto.createHash('md5')
// 实现与MySQL交互
var mysql = require('mysql')
var conf = require('../conf/db')
var util = require('../util/util')
var sql = require('./userSqlMqpping')

// 使用连接池，提升性能
var pool = mysql.createPool(util.extend({}, conf.mysql))

// 如果数据库中不存在要查询的表，创建该表。
var createUserTable = (connection, ...args) => {
  return new Promise((resolve, reject) => {
    connection.query(sql.createUserTable, (err, result, fields) => {
      if (err) {
        resolve({
          code: 1,
          msg: '操作失败',
          stack: err
        })
      }
      // 创建表之后继续未完成的查询
      connection.query(...args, (err, res) => {
        let response
        if (err) {
          response = {
            code: 1,
            msg: '操作失败',
            stack: err
          }
        } else {
          response = {
            code: 0,
            msg: '注册成功',
            data: {}
          }
        }
        resolve(response)
      })
    })
  })
}

// 加密密码
var getHashPwd = (pwd) => {
  return hash.update(pwd).digest('hex')
}

// 检查密码
var checkPassword = (password) => {
  let charOrNumber = /^[A-z]*[a-zA-Z][0-9][A-z0-9]*$/.test(password)
  if (password.length < 8 || password.length > 20) {
    return '密码长度在8-20位之间'
  }
  if (!charOrNumber) {
    return '密码须包含字母和数字'
  }
  return false
}

// 检查昵称
var checkNickname = (nickname, connection) => {
  return new Promise((resolve, reject) => {
    if (nickname.length < 3 || nickname.length > 16) {
      resolve('昵称长度在3-16位之间')
    }
    if (/^[0-9]*$/.test(nickname)) {
      resolve('昵称不能为纯数字')
    }
    // 查询数据库昵称是否已存在
    connection.query(sql.query('nickname'), nickname, (err, result) => {
      if (err) {
        // 如果不存在该表，跳过，继续注册流程
        if (err.errno === 1146) {
          resolve(false)
        } else {
          resolve(err)
        }
      } else if (result.length) {
        resolve('该昵称已存在')
      } else {
        resolve(false)
      }
    })
  })
}

// 检查手机号码
var checkPhoneNumber = (number, connection) => {
  return new Promise((resolve, reject) => {
    let isNumber = /^\d{11}$/.test(number)
    if (!isNumber) {
      resolve('无效的手机号码')
    }
    // 查询数据库手机号是否已存在
    connection.query(sql.query('phoneNumber'), number, (err, result) => {
      if (err) {
        // 如果不存在该表，跳过，继续注册流程
        if (err.errno === 1146) {
          resolve(false)
        } else {
          resolve(err)
        }
      } else if (result.length) {
        resolve('手机号码已被注册')
      } else {
        resolve(false)
      }
    })
  })
}

module.exports = {
  register: (ctx, next) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, connection) {
        if (err) {
          resolve({
            code: 1,
            msg: '操作失败',
            stack: err
          })
        };
        let { phoneNumber, nickname, password } = ctx.query
        let res, hashPwd, pwdResult, nameResult, numberResult
        // 验证密码
        pwdResult = checkPassword(password)
        // 验证昵称
        try {
          nameResult = await checkNickname(nickname, connection)
        } catch (e) {
          console.log(e)
        }
        // 验证手机号
        try {
          numberResult = await checkPhoneNumber(phoneNumber, connection)
        } catch (e) {
          console.log(e)
        }
        if (pwdResult) {
          res = pwdResult
        } else if (nameResult) {
          res = nameResult
        } else if (numberResult) {
          res = numberResult
        }
        console.log('144:' + res)
        // 如果res为true，说明验证不通过，直接返回
        if (res) {
          resolve({
            code: 1,
            msg: `注册失败: ${res}`
          })
        }

        // 对密码进行md5加密
        try {
          hashPwd = getHashPwd(password)
          phoneNumber = phoneNumber.toString()
        } catch (e) {
          console.log(e)
        }
        console.log(hashPwd)
        // 建立连接，向表中插入值
        connection.query(sql.insert, [nickname, phoneNumber, hashPwd], async function (err, result) {
          if (err) {
            console.log(phoneNumber)
            console.log(err)
            if (err.errno === 1146) {
              console.log('create table')
              res = await createUserTable(connection, sql.insert, [nickname, phoneNumber, hashPwd])
              console.log(res)
              resolve(res)
            } else {
              res = {
                code: 1,
                msg: '注册失败: 数据库错误',
                stack: err
              }
            }
          } else {
            res = {
              code: 0,
              msg: '注册成功',
              data: {}
            }
          }
          // 释放连接
          connection.release()
          resolve(res)
        })
      })
    })
  }
}
