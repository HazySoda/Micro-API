module.exports = {
  extend: function (target, source, flag) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        flag ? (target[key] = source[key]) : (target[key] === void 0 && (target[key] = source[key]))
      }
    }
    return target
  },
  getNowDate: function () {
    let Y, M, D, h, m, s, date
    const format = num => num.toString().length > 1 ? num : `0${num}`
    date = new Date()
    Y = date.getFullYear()
    M = format(date.getMonth() + 1)
    D = format(date.getDate())
    h = format(date.getHours())
    m = format(date.getMinutes())
    s = format(date.getSeconds())
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
}
