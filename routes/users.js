const router = require('koa-router')()
const userController = require('../controllers/user')

router.prefix('/v1/user')

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router
