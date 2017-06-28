const router = require('koa-router')()
const upload = require('../controllers/upload')

router.post('/upload', upload.loadImg)

module.exports = router
