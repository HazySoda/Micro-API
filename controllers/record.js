const loadModel = require('../db')
const recordModel = loadModel('record')

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
    let userRecord = await recordModel.findOne({
      where: {
        uid: uid
      }
    })
    if (userRecord) {
      res = userRecord
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
      stack: e.message
    }
  }
  ctx.body = res
}

const rank = async (ctx, next) => {
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
    let userRecords = await recordModel.findAll({
      limit: 5,
      order: [
        ['step', 'DESC']
      ]
    })
    if (userRecords) {
      res = userRecords
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
      stack: e.message
    }
  }
  ctx.body = res
}

module.exports = {
  query,
  rank
}
