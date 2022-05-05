const game = "NightClub"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as NightClubFunc from './NightClub_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
const NightClubLocator = (process.env.npm_config_cf_lang === 'en' ? require('./NightClub_Locator').NightClubLocator_en : require('./NightClub_Locator').NightClubLocator_vn)

describe('======== AUTOMATION TEST RESULT NIGHTCLUB LADY ========', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
  let result;

  describe("Test Suite 01: Verify UI", ()=>{
  it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await NightClubFunc.verifySignInSuccessfully()
  })  
  })

  describe("Test Suite 02: Verify Place Bet and Settlement", ()=>{
    it('TC_02_Full_Smoke_Verify Placebet 1 line L1 with stake=1', async () => {
      await NightClubFunc.checkSettlement(NightClubFunc.placeBet,["L1",1,true])
     }) 
    it('TC_03_Full_Smoke_Verify Placebet Oddline with stake= 5', async () => {
      await utils.sleep(3000)
      await NightClubFunc.checkSettlement(NightClubFunc.placeBet,["OddLine","5"])
     }) 
    it('TC_04_Full_Smoke_Verify Placebet Evenline with stake=1', async () => {
      await utils.sleep(3000)
      await NightClubFunc.checkSettlement(NightClubFunc.placeBet,["EvenLine","1"])
     }) 
    it('TC_05_Full_Smoke_Verify Placebet All with stake =0.1', async () => {
      await utils.sleep(3000)
      await NightClubFunc.checkSettlement(NightClubFunc.placeBet,["AllLine","0_1"])
     }) 

    it('TC_06_Full_Smoke_Verify Placebet Auto Spin =10 and Stake=1', async () => {
      await NightClubFunc.checkSettlement(NightClubFunc.placeBet,["L2",1,false,10])
     }) 

  })

  describe("Test Suite 03 :Exit Game", ()=>{
    it('TC_07_Full_Smoke_Verify Close Game Success', async () => {
      await NightClubFunc.ReturnHome()
  }) 
  })

})