const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const util = require('../util/util')
const loadModel = require('../db')
const userModel = loadModel('user')
const secret = require('../conf/authScrect').secret

// 加密密码
var getHashPwd = (password) => {
  return crypto.createHash('md5').update(password).digest('hex')
}

// 生成accessToken
var createToken = (payload) => {
  return jwt.sign(payload, secret, {expiresIn: '1h'})
}

// 检查密码
var checkPassword = (password) => {
  let charOrNumber = /[A-z]*[a-zA-Z][0-9][A-z0-9]*/.test(password)
  if (!password) {
    return '密码不可为空'
  }
  if (password.length < 8 || password.length > 20) {
    return '密码长度须在8-20位之间'
  }
  if (!charOrNumber) {
    return '密码须包含字母和数字'
  }
  return false
}

// 检查昵称
var checkNickname = (nickname) => {
  return new Promise(async (resolve, reject) => {
    if (!nickname) {
      resolve('昵称不可为空')
    }
    if (nickname.length < 3 || nickname.length > 16) {
      resolve('昵称长度在3-16位之间')
    }
    if (/^[0-9]*$/.test(nickname)) {
      resolve('昵称不能为纯数字')
    }
    try {
      let res = await userModel.findOne({
        where: {
          nickname: nickname
        }
      })
      if (res) {
        resolve('该昵称已被注册')
      } else {
        resolve(false)
      }
    } catch (e) {
      resolve('数据库查询失败')
    }
  })
}

// 检查手机号码
var checkPhoneNumber = (number) => {
  return new Promise(async (resolve, reject) => {
    let isNumber = /^\d{11}$/.test(number)
    if (!number) {
      resolve('手机号码不可为空')
    }
    if (typeof number === 'number') {
      resolve('手机号码格式有误')
    }
    if (!isNumber) {
      resolve('无效的手机号码')
    }
    try {
      let res = await userModel.findOne({
        where: {
          phoneNumber: number
        }
      })
      console.log(res)
      if (res) {
        resolve('该手机号已被注册')
      } else {
        resolve(false)
      }
    } catch (e) {
      resolve('数据库查询失败')
    }
  })
}

const register = async (ctx, next) => {
  let msg = ''
  let hashPwd = ''
  const { phoneNumber, nickname, password } = ctx.request.body
  const pwdResult = checkPassword(password)
  const numberResult = await checkPhoneNumber(phoneNumber)
  const nameResult = await checkNickname(nickname)

  // 校验各字段
  if (pwdResult) {
    msg = pwdResult
  } else if (nameResult) {
    msg = nameResult
  } else if (numberResult) {
    msg = numberResult
  }

  // 如果msg为true，说明验证不通过，直接返回
  if (msg) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: msg
    }
    return
  }

  // 对密码进行md5加密
  hashPwd = getHashPwd(password)

  const data = {
    phoneNumber: phoneNumber,
    hashpwd: hashPwd,
    nickname: nickname,
    regDate: util.getNowDate()
  }

  try {
    await userModel.create(data)
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '注册成功！'
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      code: 500,
      msg: err.errors[0].message
    }
  }
}

const login = async (ctx, next) => {
  let hashPwd = ''
  let oldHashPwd = ''
  let thisUser
  const { username, password } = ctx.request.body
  // 获取加密后登录密码
  hashPwd = getHashPwd(password)
  // 判断是手机号登录还是昵称登录
  if (/^\d{11}$/.test(username)) { // 如果匹配说明手机号登录
    thisUser = await userModel.findOne({
      where: {
        phoneNumber: username
      }
    })
  } else { // 否则是昵称登录
    thisUser = await userModel.findOne({
      where: {
        nickname: username
      }
    })
  }
  if (!thisUser) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '用户不存在'
    }
    return
  }
  oldHashPwd = thisUser.hashpwd
  if (oldHashPwd) { // 如果为true，说明用户存在
    if (oldHashPwd === hashPwd) { // 判断密码是否正确
      let payload = {
        nickname: thisUser.nickname,
        phoneNumber: thisUser.phoneNumber
      }
      let token = createToken(payload)
      ctx.body = {
        code: 0,
        msg: '登录成功',
        data: {
          nickname: thisUser.nickname,
          phoneNumber: thisUser.phoneNumber,
          uid: thisUser.uid,
          accessToken: token
        }
      }
    } else {
      ctx.status = 400
      ctx.body = {
        code: 400,
        msg: '账号或密码错误'
      }
    }
  }
}

module.exports = {
  register,
  login
}
