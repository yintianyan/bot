const Bot = require('../modules/bot');
const axios = require('axios').default;

class Plugin extends Bot {
  constructor () {
    super();
    const url = 'http://api.tianapi.com/internet/index';
    this.API_KEY = process.env.tianapi_key;
    const pageNum = 20
    this.API = `${url}?key=${this.API_key}&num=${pageNum}`;
    if (process.env.plug_disabled === 'true') this.exit();
  }
  async run () {
    await axios.get(this.API).then(res => {
      if(res.data.code === 200) {
        this._sendMessage(res.data.newslist)
      }
    })
  }

  async _sendMessage (newsList) {
    const articles = [];
    newsList.forEach(newItem => {
      articles.push({
        title: newItem.title,
        description: newItem.description,
        url: newItem.url,
        picUrl: newItem.picUrl
      })
    })
    await this.sendNews(articles.slice(0,8))
  }

}

new Plugin().run();