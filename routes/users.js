const router = require('koa-router')()
const userDB = require('../db/userDB');

router.prefix('/users')

/***** 有些操作应该是post方式的，为了方便调试就改成了get方式 *****/

router.get('/', async (ctx, next)=> {
  let res = await userDB.get(ctx,next);
  ctx.body = res;
})

router.get('/add',async (ctx, next)=> {
  let res = await userDB.add(ctx,next);
  ctx.body = res;
})

router.get('/delete', async (ctx,next)=> {
  let res = await userDB.delete(ctx,next);
  ctx.body = res;
})

router.get('/update', async (ctx,next)=> {
  let res = await userDB.update(ctx,next);
  ctx.body = res;
})

module.exports = router;
