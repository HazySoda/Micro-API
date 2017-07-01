const users = require('./users')
const upload = require('./upload')
const me = require('./me')
const relation = require('./relation')

module.exports = app => {
  app.use(users.routes(), users.allowedMethods())
  app.use(upload.routes(), upload.allowedMethods())
  app.use(me.routes(), me.allowedMethods())
  app.use(relation.routes(), relation.allowedMethods())
}
