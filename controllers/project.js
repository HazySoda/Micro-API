const loadModel = require('../db')
const playerModel = loadModel('player')
const singleModel = loadModel('singleplayer')
const multiModel = loadModel('multiplayer')

const queryProjectList = async (ctx, next) => {
  let res
  // 获取参数
  const { uid, type } = ctx.query
  // 判断参数合法性
  if (!uid || !type) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      msg: '参数错误，请重试！'
    }
    ctx.req.end()
  }
  // 获取该用户参与的项目
  let projects
  let projectData
  try {
    projects = await playerModel.findAll({
      attributes: ['pid'],
      where: {
        uid,
        type
      }
    })
    projects = projects.map((item) => {
      return item.pid
    })
    if (type === 0) {
      projectData = await singleModel.findAll({
        where: {
          pid: projects
        }
      })
    } else {
      projectData = await multiModel.findAll({
        where: {
          pid: projects
        }
      })
    }
    ctx.status = 200
    res = {
      code: 0,
      msg: '查询成功！',
      data: projectData
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

module.exports = {
  queryProjectList
}
