const router = require('koa-router')()
const meController = require('../controllers/me')

router.prefix('/me')

// 查询用户信息
router.get('/query', meController.query)
// 修改用户信息
router.post('/update', meController.update)

module.exports = router
