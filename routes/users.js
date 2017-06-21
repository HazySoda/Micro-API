const router = require('koa-router')()
const userController = require('../controllers/user')

router.prefix('/user')

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router
