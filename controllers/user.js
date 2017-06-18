const userDB = require('../db/userDB')

const register = async (ctx, next) => {
  let res = await userDB.register(ctx, next)
  ctx.body = res
}

const login = async (ctx, next) => {
  let res = await userDB.login(ctx, next)
  ctx.body = res
}

module.exports = {
  register,
  login
}
