const router = require('koa-router')()
const personalController = require('../controllers/personal')

router.prefix('/personal')

router.get('/', personalController.all)

// router.post('/login', userController.login)

module.exports = router
