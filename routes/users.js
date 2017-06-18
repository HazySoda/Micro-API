const router = require('koa-router')()
const userController = require('../controllers/user')

router.prefix('/member')

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router
