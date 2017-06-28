const users = require('./users')
const personal = require('./personal')
const upload = require('./upload')

module.exports = (app) => {
  app.use(users.routes(), users.allowedMethods())
  app.use(personal.routes(), personal.allowedMethods())
  app.use(upload.routes(), upload.allowedMethods())
}
