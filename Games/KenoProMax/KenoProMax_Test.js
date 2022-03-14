const game = "KenoProMax"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as KenoProMaxFunc from './KenoProMax_Function'
let RouletteLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./KenoProMax_Locator').RouletteLocator_vn : require('./KenoProMax_Locator').RouletteLocator_en)
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'

describe('======== AUTOMATION TEST RESULT KENO PRO MAX ========', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game from lobby and nagvigation of statistic bar', async () => {
   await KenoProMaxFunc.VerifySignInSuccessfully()
    }) 

   it('TC_02_Smoke_Verify Hedge Bets', async () => {
  await KenoProMaxFunc.waitUtilNewRound()
  await KenoProMaxFunc.verifyHedgeBet('Big','Small',1,'{"errorCode":"SB1939","hedgeBetGroup":["big","small"]')
  await KenoProMaxFunc.verifyHedgeBet('Even','Odd',1,'{"errorCode":"SB1939","hedgeBetGroup":["even","odd"]')
  }) 

  it('TC_03_Smoke_Verify Full Bet Choices', async () => {
    await KenoProMaxFunc.waitUtilNewRound()
    let stake = 50
    let Apos = ['Gold','Wood','Water','Fire','Earth']
    for (let i of Apos){
      await KenoProMaxFunc.PlaceBet(i,stake)
      await KenoProMaxFunc.VerifyBetStake(i,stake)
    }
    await KenoProMaxFunc.CheckSettleBalance()
    await KenoProMaxFunc.CheckRoundHistory()
    }) 
 
  it('TC_04_Full_Smoke_Verify Close Game Success', async () => {
    await KenoProMaxFunc.CloseGame()
  }) 

})

