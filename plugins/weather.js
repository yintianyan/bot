const Bot = require('../modules/bot');
const axios = require('axios').default;
const process = require('process');

class Plugin extends Bot {
  constructor () {
    super();
    this.url = 'http://api.tianapi.com/tianqi/index'
    this.API_KEY = process.env.tianapi_key
    this.city = process.env.city || '北京市'
    this.API = `${this.url}?key=${this.API_KEY}&city=${encodeURI(this.city)}`;
    console.log(this.API)
  }

  async run () {
    await axios.get(this.API).then(res => {
      console.log(res)
      if(res.data.code === 200) {
        this._sendData(res.data.newslist[0])
      }
    })
  }

  async _sendData (data) {
    await this.sendMarkdown(`今日：${data.date} ${data.week}\n
${data.area}天气：
<font color="info">${data.weather},${data.wind}${data.windsc}</font>
<font color="info">最高温度：${data.highest}，
最低温度：${data.lowest},
体感温度：${data.real}</font>
日出：${data.sunrise}日落：${data.sunset}

<font color="warning">温馨小提示：${data.tips}</font>
    `)

  }
}

new Plugin().run()