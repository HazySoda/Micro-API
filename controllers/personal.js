const all = async (ctx, next) => {
  console.log(ctx.state)
  if (ctx.state.user) {
    console.log(ctx.state)
    ctx.body = ctx.state
  }
}

module.exports = {
  all
}
