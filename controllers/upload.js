const fs = require('fs')
const path = require('path')

const saveImg = (ctx) => {
  return new Promise((resolve, reject) => {
    let { file, type } = ctx.request.body
    let { name, mimetype } = file
    if (mimetype.indexOf('image') === -1) {
      resolve({
        code: 400,
        msg: '文件格式错误'
      })
    }
    let publicPath = `public/img/${type}`
    let savePath = path.resolve(publicPath, name)
    let serverPath = path.join(ctx.host, publicPath, name)
    // 如果没有该文件夹，就创建一个
    if (!fs.existsSync(path.resolve(publicPath))) {
      fs.mkdirSync(path.resolve(publicPath))
    }
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

const loadImg = async (ctx, next) => {
  if (!ctx.request.body.file) {
    ctx.body = {
      code: 400,
      msg: '文件不可为空'
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
    ctx.body = result
  }
}

module.exports = {
  loadImg
}
