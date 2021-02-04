import playwright from 'playwright'
import * as config from './config/config'

exports.mochaHooks = {
  // Runs before each file in parallel mode, or once before the whole test suite in serial mode
  beforeAll: [async () => {
    console.log('setup')
    global.wsMessageReceived = []
    global.browser = await playwright[config.setting.browser].launch({ headless: true })
    global.page = await browser.newPage();
    global.context = await browser.newContext({
        viewport: {
          width: config.setting.viewport.width,
          height: config.setting.viewport.height
        }
    });
    global.isHear = false
    } ]  ,
  afterAll: [async () => { await browser.close()  }]
  }

