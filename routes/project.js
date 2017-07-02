const router = require('koa-router')()
const projectController = require('../controllers/project')

router.prefix('/project')

router.get('/query', projectController.queryProjectList)

router.post('/create', projectController.createMultiProject)

module.exports = router
