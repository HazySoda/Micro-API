const router = require('koa-router')()
const upload = require('../controllers/upload')

router.post('/v1/upload', upload.loadImg)

module.exports = router
