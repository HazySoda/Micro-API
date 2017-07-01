const loadModel = require('../db')
const userModel = loadModel('user')

// 查询用户信息
const query = async (ctx, next) => {
  let { uid } = ctx.query
  if (!uid) {
    ctx.body = {
      code: 400,
      msg: '参数不合法'
    }
    ctx.req.end()
  }
  let res
  try {
    let userInfo = await userModel.findOne({
      where: {
        uid: uid
      }
    })
    if (userInfo) {
      let newInfo = JSON.parse(JSON.stringify(userInfo))
      delete newInfo.hashpwd
      delete newInfo.uid
      res = {
        code: 0,
        msg: '查询成功',
        data: newInfo
      }
    } else {
      res = {
        code: 500,
        msg: '查询失败'
      }
    }
  } catch (e) {
    res = {
      code: 500,
      msg: '查询失败',
      stack: e
    }
  }
  ctx.body = res
}

// 修改用户信息
const update = async (ctx, next) => {
  let params = ctx.request.body
  if (!params.uid) {
    ctx.body = {
      code: 400,
      msg: '参数不合法'
    }
    ctx.req.end()
  }
  let res
  let newInfo = {}
  for (let key in ctx.request.body) {
    if (key !== 'uid' && ctx.request.body[key]) {
      newInfo[key] = ctx.request.body[key]
    }
  }
  try {
    let userInfo = await userModel.findOne({
      where: {
        uid: params.uid
      }
    })
    delete newInfo.uid
    delete newInfo.regDate
    let result = await userInfo.update(newInfo)
    if (result) {
      res = {
        code: 0,
        msg: '修改用户信息成功'
      }
    } else {
      res = {
        code: 500,
        msg: '修改用户信息失败'
      }
    }
  } catch (e) {
    res = {
      code: 500,
      msg: '修改用户信息失败',
      stack: e.message
    }
  }
  ctx.body = res
}

module.exports = {
  query,
  update
}
