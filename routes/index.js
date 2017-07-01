const users = require('./users')
const upload = require('./upload')
const me = require('./me')

module.exports = (app) => {
  app.use(users.routes(), users.allowedMethods())
  app.use(upload.routes(), upload.allowedMethods())
  app.use(me.routes(), me.allowedMethods())
}
