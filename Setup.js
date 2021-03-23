import playwright from 'playwright'
import * as config from './config/config'
import uaParser from 'ua-parser-js'

const chai = require('chai')
const expect = chai.expect

before(async () => {
    global.wsMessageReceived = []
    global.browser = await playwright[config.setting.browser].launch({
       headless: config.setting.headless ,
       args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader','--enable-webgl']
      })
    const context = await browser.newContext({
        viewport: {
          width: config.setting.viewport.width,
          height: config.setting.viewport.height
        }
    });
    const page = await browser.newPage()
    const getUA = await page.evaluate(() => navigator.userAgent);
    global.userAgent = uaParser(getUA).ua;
    global.page = page
    global.context = context
    global.isHear = false
    global.balance = parseFloat("0.00")
    global.env = process.env.NODE_ENV || 'cf_local'
    global.expect = expect
})

