const loadModel = require('../db')
const momentsModel = loadModel('moments')
const commentsModel = loadModel('comments')

const createMoments = async (ctx, next) => {
  let res
  const { uid, nickname, avatar, location, createTime, image, content } = ctx.request.body
  if (!uid || !nickname || !avatar || !createTime || !content) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
    return
  }
  try {
    await momentsModel.create({
      uid,
      nickname,
      avatar,
      location,
      createTime,
      image,
      content
    })
    ctx.status = 200
    res = {
      code: 0,
      msg: '创建动态成功！'
    }
  } catch (e) {
    ctx.status = 500
    res = {
      code: 500,
      msg: '创建动态失败！',
      err: e.message
    }
  }
  ctx.body = res
}

const queryMoments = async (ctx, next) => {
  let res
  const { uid } = ctx.query
  if (!uid) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
  }
  try {
    const moments = await momentsModel.findAll({
      where: {
        uid
      }
    })
    ctx.status = 200
    res = {
      code: 0,
      msg: '查询成功！',
      data: moments
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      code: 500,
      msg: '查询失败！',
      err: e.message
    }
  }
  ctx.body = res
}

const deleteMoments = async (ctx, next) => {
  let res
  const { uid, mid } = ctx.request.body
  if (!uid || !mid) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
    return
  }
  try {
    const moment = await momentsModel.findOne({
      where: {
        uid,
        mid
      }
    })
    await moment.destroy()
    ctx.status = 200
    res = {
      code: 0,
      msg: '删除成功！'
    }
  } catch (e) {
    ctx.status = 500
    res = {
      code: 500,
      msg: '删除失败'
    }
  }
  ctx.body = res
}

const createComments = async (ctx, next) => {
  let res
  const { uid, mid, nickname, content, createTime } = ctx.request.body
  if (!uid || !mid || !nickname || !content || !createTime) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
    return
  }
  try {
    await commentsModel.create({
      uid,
      mid,
      nickname,
      content,
      createTime
    })
    ctx.status = 200
    res = {
      code: 200,
      msg: '评论成功！'
    }
  } catch (e) {
    ctx.status = 500
    res = {
      code: 500,
      msg: '评论失败！'
    }
  }
  ctx.body = res
}

const queryComments = async (ctx, next) => {
  let res
  const { mid } = ctx.query
  if (!mid) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
    return
  }
  try {
    const comments = await commentsModel.findAll({
      where: {
        mid
      }
    })
    ctx.status = 200
    res = {
      code: 0,
      msg: '查询成功！',
      data: comments
    }
  } catch (e) {
    ctx.status = 500
    res = {
      code: 500,
      msg: '查询失败！',
      err: e.message
    }
  }
  ctx.body = res
}

const deleteComments = async (ctx, next) => {
  let res
  const { cid, mid } = ctx.request.body
  if (!cid || !mid) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
    return
  }
  try {
    const comments = await commentsModel.findOne({
      where: {
        mid,
        cid
      }
    })
    await comments.destroy()
    ctx.status = 200
    res = {
      code: 0,
      msg: '删除成功！'
    }
  } catch (e) {
    ctx.status = 500
    res = {
      code: 500,
      msg: '删除失败！'
    }
  }
  ctx.body = res
}

module.exports = {
  createMoments,
  queryMoments,
  deleteMoments,
  createComments,
  queryComments,
  deleteComments
}
