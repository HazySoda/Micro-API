const all = async (ctx, next) => {
  ctx.body = ctx.state
}

module.exports = {
  all
}
