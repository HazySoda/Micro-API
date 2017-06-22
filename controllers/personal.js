const all = async (ctx, next) => {
  if (ctx.state.user) {
    ctx.body = ctx.state
  }
}

module.exports = {
  all
}
