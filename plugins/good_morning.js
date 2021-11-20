// 早安心语
// 早上是阳光太阳东升的时间，一句励志的话给新的一天注入动力。
// 注意：需申请API KEY，设置到secrets中，名称：tianapi_key
// https://www.tianapi.com/apiview/143

const Bot = require('../modules/bot');
const axios = require('axios').default;
const process = require('process');

class Plugin extends Bot {
  constructor () {
    super();
    this.API = 'http://api.tianapi.com/zaoan/index';
    this.API_KEY = process.env.tianapi_key;
    if (!this.API_KEY) return this.exit();
  }

  run () {
    axios.get(this.API + '?key=' + this.API_KEY).then(res => {
      const c = res.data.newslist[0].content;
      this.sendText(c);
    });
  }
}

new Plugin().run();