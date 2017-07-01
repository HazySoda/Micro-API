const router = require('koa-router')()
const relationController = require('../controllers/relation')

router.prefix('/relation')

router.post('/', relationController.changeUserRelation)

module.exports = router
