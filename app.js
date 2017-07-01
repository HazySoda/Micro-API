const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const multy = require('multy')
const serve = require('koa-static')
const mount = require('koa-mount')
const onError = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const logUtil = require('./util/log')
const route = require('./routes')
const secret = require('./conf/authScrect').secret

// 错误处理
onError(app)

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// 添加解析form-data中间件
app.use(multy())

app.use(json())

// 访问静态资源
app.use(mount('/public', serve('public/')))

// Token验证中间件
if (process.env.NODE_ENV === 'prod') {
  app.use(async (ctx, next) => {
    // 除用户模块和访问静态资源，全站验证Token
    if (!ctx.path.startsWith('/user')) {
      const token = ctx.query.token || ctx.request.body.token
      try {
        let decode = jwt.verify(token, secret)
        ctx.state.user = decode
      } catch (e) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          msg: 'Token过期，请重新登录'
        }
      }
    }
  })
}

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
route(app)

module.exports = app
