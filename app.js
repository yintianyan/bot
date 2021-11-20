const Bot = require('./modules/bot');
const process = require('process');

require('./modules/date-format');

class Plugin extends Bot {
  constructor () {
    super();
  }
}

new Plugin().run();