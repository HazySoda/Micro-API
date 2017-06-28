const fs = require('fs')
const path = require('path')

var saveImg = (ctx) => {
  return new Promise((resolve, reject) => {
    let file = ctx.request.body.file
    let { name, mimetype } = ctx.request.body.file
    if (mimetype.indexOf('image') === -1) {
      console.log(1)
      resolve({
        code: 400,
        msg: '参数格式错误'
      })
    }
    let savePath = path.resolve('public/img', name)
    let serverPath = path.join(ctx.host, '/public/img', name)
    file.pipe(fs.createWriteStream(savePath))
    file.on('end', () => {
      resolve(serverPath)
    })
    file.on('error', (err) => {
      resolve({
        code: 500,
        msg: '上传失败',
        stack: err
      })
    })
  })
}

var loadImg = async (ctx, next) => {
  if (!ctx.request.body.file) {
    ctx.body = {
      code: 400,
      msg: '文件不能为空'
    }
  }
  let result = await saveImg(ctx)
  if (typeof result === 'string') {
    ctx.body = {
      code: 0,
      imgSrc: result,
      msg: '上传成功'
    }
  } else {
    console.log(result)
    ctx.body = result
  }
}

module.exports = {
  loadImg
}
