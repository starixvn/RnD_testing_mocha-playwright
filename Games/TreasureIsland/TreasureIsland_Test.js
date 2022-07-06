const game = "TreasureIsland"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as TreasureIslandFunc from './TreasureIsland_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import { clickPos } from '../SpecialSedie/SpecialSedie_Function'
const TreasureIslandLocator = (process.env.npm_config_cf_lang === 'en' ? require('./TreasureIsland_Locator').TreasureIslandLocator_en : require('./TreasureIsland_Locator').TreasureIslandLocator_vn)


describe('======== AUTOMATION TEST RESULT HERO SLOT ========', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${cf_lang}/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

  describe("Test Suite 01: Verify UI", ()=>{
    it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
      await TreasureIslandFunc.verifySignInSuccessfully()
      await utils.sleep(5000)
      // await utils.clickPos(TreasureIslandLocator.AutoSpin.x,TreasureIslandLocator.AutoSpin.y)
      // await page.screenshot({ path: `AutoSpinmenu.png`});


    })  
    })

    describe("Test Suite 02: Verify Place Bet and Settlement", ()=>{
      it('TC_02_Full_Smoke_Verify Placebet Level-Coin-Total (2-0.01-4)', async () => {
        await TreasureIslandFunc.checkSettlement(TreasureIslandFunc.placeBet,["Up","Up","",true])
       }) 

      it('TC_03_Full_Smoke_Verify Placebet Trial mode Level-Coin-Total (1-0.1-2)', async () => {
        await TreasureIslandFunc.switchmode()
        await TreasureIslandFunc.checkSettlement(TreasureIslandFunc.placeBet,["Up","","Down"])
       }) 

       it('TC_04_Full_Smoke_Verify Placebet Auto Spin 10 Level-Coin-Total 1-0.01-2', async () => {
        // await TreasureIslandFunc.switchmode()
        await TreasureIslandFunc.checkSettlement(TreasureIslandFunc.placeBet,["Up","","Down","",10])
       }) 

       it('TC_05_Full_Smoke_Verify Placebet By Press Space bar', async () => {
        // await TreasureIslandFunc.switchmode()
        await TreasureIslandFunc.checkSettlement(TreasureIslandFunc.placeBet,["Up","","Down","","","Spacebar"])
       }) 
       
    })

    describe("Test Suite 03 :Exit Game", ()=>{
      it('TC_01_Full_Smoke_Verify Close Game Success', async () => {
        await TreasureIslandFunc.ReturnHome()
    }) 
    })


})





