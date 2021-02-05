import playwright from 'playwright'
import * as config from './config/config'
import {Login} from './util/utils'

before(async () => {
    global.wsMessageReceived = []
    global.browser = await playwright[config.setting.browser].launch({ headless: config.setting.headless })
    global.page = await browser.newPage();
    global.context = await browser.newContext({
        viewport: {
          width: config.setting.viewport.width,
          height: config.setting.viewport.height
        }
    });
    global.isHear = false
    global.balance = parseFloat("0.00")
    global.env = process.env.NODE_ENV || 'cf_local'
    // await Login(env)
})

