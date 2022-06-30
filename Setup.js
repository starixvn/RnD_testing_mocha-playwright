import playwright from "playwright";
import * as config from "./config/config";
import uaParser from "ua-parser-js";
const chai = require("chai");
const chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const expect = chai.expect;

before(async () => {
  const args = await parseArg(process.env.npm_config_args);
  global.wsMessageReceived = [];
  global.wsMessageSend =[];
  global.browser = await playwright[config.setting.browser].launch({
    headless: config.setting.headless,
    //  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader','--enable-webgl']
    args: ["--disable-gpu", "--mute-audio",  '--no-sandbox','--disable-canvas-aa','--disable-infobars', '--hide-scrollbars','--disable-2d-canvas-clip-aa', '--wm-window-animations-disabled'],
  });
  const context = await browser.newContext({
    viewport: {
      width: config.setting.viewport.width,
      height: config.setting.viewport.height,
    }
    // recordVideo: {
    //   dir: './Report/vn/Videos/',
    // }
  });
  await context.grantPermissions(["clipboard-read"]);
  let page = await context.newPage();
  const getUA = await page.evaluate(() => navigator.userAgent);
  let pages = [];
  pages.push(page);
  context.on("page", async (newPage) => {
    pages.push(await newPage);
  });
  global.pages = pages;
  global.userAgent = uaParser(getUA).ua;
  global.page = page;
  global.context = context;
  global.isHear = false;
  global.balance = parseFloat("0.00");
  global.env = typeof args.env !== "undefined" ? args.env : "cf_local";
  global.cf_lang =
    typeof process.env.npm_config_cf_lang !== "undefined"
      ? process.env.npm_config_cf_lang
      : "vn";
  global.expect = expect;
  global.username = null;
  global.session = null;
  global.name = null;
  global.pid =
    typeof process.env.npm_config_pid !== "undefined"
      ? process.env.npm_config_pid
      : "ONEworks1";
  if (typeof process.env.npm_config_game !== "undefined") {
    global.game = process.env.npm_config_game;
    // Set balance on Local
    if (env === "cf_local" || env === "cf_local1") {
      let _requestdata = `Operator=ow&PlayerId=${config[env].memberId[game]}&Balance=200000.00&MinBet=1.00&MaxBet=3000.00&Partner=ow`;
      chai
        .request(config[env].setBalance)
        .post("")
        .send(_requestdata)
        .end(async (err, res) => {
          expect(res).to.have.status(200);
        });
    }
  } 
});

const parseArg = async (_args) => {
  if (typeof _args !== "undefined") {
    let p = _args.split("-");
    let args = {},
      tmp = [];
    for (let i = 0; i < p.length; i++) {
      tmp = p[i].split("=");
      args[tmp[0]] = tmp[1];
    }
    return args;
  }
  return {};
};
