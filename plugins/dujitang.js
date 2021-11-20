const Bot = require('../modules/bot');
const axios = require('axios').default;

class Plugin extends Bot {
  constructor () {
    super();
    const url = 'http://api.tianapi.com/dujitang/index';
    this.API_KEY = process.env.tianapi_key;
    this.API = `${url}?key=${key}`;
    if (process.env.plug_disabled === 'true') this.exit();
  }
  run () {
    axios.get(this.API).then(res => {
      if(res.data.code === 200) {
        this.sendMarkdown(`> 🌺🐔来碗毒鸡汤\n\n${res.data.newslist[0].content}`);
      }
     
    })
  }
}

new Plugin().run();