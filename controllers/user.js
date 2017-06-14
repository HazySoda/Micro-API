const userDB = require('../db/userDB')

// 有些操作应该是post方式的，为了方便调试就改成了get方式
const getUser = async (ctx, next) => {
  let res = await userDB.get(ctx, next)
  ctx.body = res
}

const addUser = async (ctx, next) => {
  let res = await userDB.add(ctx, next)
  ctx.body = res
}

const deleteUser = async (ctx, next) => {
  let res = await userDB.delete(ctx, next)
  ctx.body = res
}
const updateUser = async (ctx, next) => {
  let res = await userDB.update(ctx, next)
  ctx.body = res
}

module.exports = {
  getUser,
  addUser,
  deleteUser,
  updateUser
}
