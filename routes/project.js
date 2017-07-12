const router = require('koa-router')()
const projectController = require('../controllers/project')

router.prefix('/v1/project')

router.get('/query', projectController.queryProjectList)

router.post('/create', projectController.createMultiProject)

module.exports = router
