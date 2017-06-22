const router = require('koa-router')()
const personalController = require('../controllers/personal')

router.prefix('/personal')

router.get('/', personalController.all)

module.exports = router
