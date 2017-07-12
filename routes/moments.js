const router = require('koa-router')()
const momentsController = require('../controllers/moments')

router.prefix('/v1/moments')

// 创建动态
router.post('/create', momentsController.createMoments)
// 查询动态
router.get('/query', momentsController.queryMoments)
// 删除动态
router.delete('/delete', momentsController.deleteMoments)
// 创建评论
router.post('/createComments', momentsController.createComments)
// 查询评论
router.get('/queryComments', momentsController.queryComments)
// 删除评论
router.delete('/deleteComments', momentsController.deleteComments)

module.exports = router
