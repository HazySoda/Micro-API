const router = require('koa-router')()
const userController = require('../controllers/user')

router.prefix('/users')

/***** 有些操作应该是post方式的，为了方便调试就改成了get方式 *****/

router.get('/', userController.getUser)

router.get('/add', userController.addUser)

router.get('/delete', userController.deleteUser)

router.get('/update', userController.updateUser)

module.exports = router;
