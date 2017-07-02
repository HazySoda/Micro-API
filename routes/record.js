const router = require('koa-router')()
const recordController = require('../controllers/record')

router.prefix('/record')

// 查询运动记录
router.get('/query', recordController.query)

// 查询运动排行榜
router.get('/rank', recordController.rank)

module.exports = router
