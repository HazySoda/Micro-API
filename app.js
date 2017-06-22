const path = require('path')
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onError = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const logUtil = require('./util/log_util')
const users = require('./routes/users')
const personal = require('./routes/personal')
const secret = require('./conf/authScrect').secret

// error handler
onError(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())

app.use(require('koa-static')(path.resolve(__dirname, '/public')))

// 添加token验证中间件
app.use(async (ctx, next) => {
  // 对personal相关路由进行token验证
  if (ctx.path.startsWith('/personal')) {
    const token = ctx.query.token || ctx.request.body.token
    try {
      let decode = jwt.verify(token, secret)
      ctx.state = decode
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        code: 500,
        msg: '账户已过期~'
      }
      ctx.res.end()
    }
  }
  await next()
})

app.use(async (ctx, next) => {
  const start = new Date()
  let ms
  try {
    await next()
    ms = new Date() - start
    // 记录响应日志
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start
    // 记录异常日志
    logUtil.logError(ctx, error, ms)
  }
})

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(personal.routes(), personal.allowedMethods())

module.exports = app
