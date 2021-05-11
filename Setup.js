import playwright from 'playwright'
import * as config from './config/config'
import uaParser from 'ua-parser-js'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const expect = chai.expect

before(async () => {
    const args = await parseArg(process.argv[2])
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
    
    let page = await context.newPage()
    const getUA = await page.evaluate(() => navigator.userAgent);
    let pages = []
    pages.push(page)
    context.on('page', async(newPage)=>{
      pages.push(await newPage)
    })
    global.pages = pages
    global.userAgent = uaParser(getUA).ua;
    global.page = page
    global.context = context
    global.isHear = false
    global.balance = parseFloat("0.00")
    global.env = (typeof args.env !== 'undefined') ? args.env : 'cf_local'
    global.lang = (typeof args.lang !== 'undefined') ? args.lang : 'vn'
    global.expect = expect
    global.game = /Games\/(.*)\//ig.exec(process.argv[5])[1]
    // Set balance on Local
    if(env === 'cf_local' || env === 'cf_local1'){
      chai.request(config[env].setBalance).post("").send(
        `ObCustId=${config[env].memberId[game]}&Balance=200000.00&MinBet=1.00&MaxBet=3000.00`
      ).end( async(err,res)=>{
        expect(res).to.have.status(200)
      })
    }
})

const parseArg = async(_args)=> {
  let p = _args.split("-")
  let args ={},tmp=[]
  for(let i=0 ; i< p.length ; i++){
      tmp = p[i].split("=")
      args[tmp[0]] = tmp[1]
  }
  return args
}