const loadModel = require('../db')
const relationModel = loadModel('relation')

const changeUserRelation = async (ctx, next) => {
  let res
  // 获取参数
  const { from, to, type } = ctx.request.body
  // 判断参数是否合法
  if (!from || !to || typeof type !== 'number') {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数不完整，请重试。'
    }
    ctx.req.end()
  }
  // 组装payload
  const payload = {
    from,
    to,
    type
  }
  // 操作数据库
  try {
    if (payload.type) {
      await relationModel.create(payload)
      ctx.status = 200
      res = {
        code: 0,
        msg: '操作成功！'
      }
    } else {
      const data = await relationModel.findOne({
        where: {
          from: payload.from,
          to: payload.to
        }
      })
      data.destroy()
      ctx.status = 200
      res = {
        code: 0,
        msg: '操作成功！'
      }
    }
  } catch (e) {
    console.log(e)
    ctx.status = 500
    res = {
      code: 500,
      msg: '操作失败！',
      err: e.message
    }
  }
  ctx.body = res
}

module.exports = {
  changeUserRelation
}
