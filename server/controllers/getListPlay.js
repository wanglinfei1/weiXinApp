const axios = require('axios')
module.exports = async (ctx,next) => {
  var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting'
  const res = ctx.res;
  await axios.get(url, {
    headers: {
      "origin": "http://tingapi.ting.baidu.com",
      "referer": "http://tingapi.ting.baidu.com"
    },
    params: ctx.query
  }).then(response => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    ctx.body = ret
  }).catch(error => {
    console.log(error)
  })
}
