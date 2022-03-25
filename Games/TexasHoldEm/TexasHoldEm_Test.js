const game = "TexasHoldEm"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as TexasHoldEmFunc from '../TexasHoldEm/TexasHoldEm_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
const TexasHoldEmLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./TexasHoldEm_Locator').TexasHoldEm_vn : require('./TexasHoldEm_Locator').TexasHoldEm_en)

describe("======== AUTOMATION TEST RESULT TEXAS HOLD'EM ========", ()=>{

  before(async function(){
    try {
      await utils.wsHearMessageOn()
      await utils.Login(env,game);
      await utils.sleep(3000)
      await GameLobbyFunc.OpenGameFromLobby(game)
    } catch (error) {
      
    }

  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
  
  describe("Test Suite 01: Verify UI", ()=>{
 it('TC_01_Full_Smoke_Game Load Success', async () => {
    await TexasHoldEmFunc.VerifySignInSuccessfully()
  })  
  it('TC_02_Full_Smoke_History pop_up', async () => {
    await TexasHoldEmFunc.OpenHistory()
    await TexasHoldEmFunc.VerifyHistoryContent()
    await TexasHoldEmFunc.CloseHistory
  })  

  })

  describe("Test Suite 02: Verify Place Bet and Settlement", ()=>{

 it('TC_03_Full_Smoke_Verify Cancel Bet Function', async () => {
  await TexasHoldEmFunc.PlaceBet(1,'','','','','')
 })

 it('TC_04_Full_Smoke_Verify Double Bet Ante', async () => {
  await TexasHoldEmFunc.PlaceBet(1,'Double','follow','','','')
  let _settle= await TexasHoldEmFunc.getSettlementResult()
  await utils.shouldBeEqual(_settle.turn,0,'check turn ')
  await utils.shouldBeEqual(_settle.river,0,'check river')
 })

 it('TC_05_Full_Smoke_Verify user can placbet on Ante & Turn', async () => {
  await TexasHoldEmFunc.PlaceBet(10,'','follow','turn','','Newbet')
  let _settle= await TexasHoldEmFunc.getSettlementResult()
  await utils.shouldBeEqual(_settle.river,0,'check river')
})  

it('TC_06_Full_Smoke_Verify user can placbet on Ante & River', async () => {
  await TexasHoldEmFunc.PlaceBet(10,'','follow','','river','Newbet')
  let _settle= await TexasHoldEmFunc.getSettlementResult()
  await utils.shouldBeEqual(_settle.turn,0,'check turn')
})  

it('TC_07_Full_Smoke_Verify user can placbet all choices', async () => {
  await TexasHoldEmFunc.PlaceBet(10,'Double','follow','turn','river','Newbet')
  let _settle= await TexasHoldEmFunc.getSettlementResult()
})  
  })

  describe("Test Suite 03 :Exit Game", ()=>{
    it('TC_08_Full_Smoke_Verify Close Game Success', async () => {
      await TexasHoldEmFunc.ReturnHome()
  }) 
  })


})

