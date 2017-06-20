const crypto = require('crypto')
const userModel = require('../models/member')

// 加密密码
var getHashPwd = (password) => {
  let hash = crypto.createHash('md5')
  return hash.update(password).digest('hex')
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
  if (!nickname) {
    return '昵称不可为空'
  }
  if (nickname.length < 3 || nickname.length > 16) {
    return '昵称长度在3-16位之间'
  }
  if (/^[0-9]*$/.test(nickname)) {
    return '昵称不能为纯数字'
  }
}

// 检查手机号码
var checkPhoneNumber = (number) => {
  let isNumber = /^\d{11}$/.test(number)
  if (!number) {
    return '手机号码不可为空'
  }
  if (typeof number === 'number') {
    return '手机号码格式有误'
  }
  if (!isNumber) {
    return '无效的手机号码'
  }
}

const register = async (ctx, next) => {
  let msg = ''
  let hashPwd = ''
  const { phoneNumber, nickname, password } = ctx.request.body
  const numberResult = checkPhoneNumber(phoneNumber)
  const pwdResult = checkPassword(password)
  const nameResult = checkNickname(nickname)

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
    nickname: nickname
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

const login = async (ctx, next) => {}

module.exports = {
  register,
  login
}
