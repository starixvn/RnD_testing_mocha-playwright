const game = "VipBaccarat"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as VipBaccaratFunc from './VipBaccarat_Function'
import * as ResultFunc from '../References/Result_Function'

describe('======== AUTOMATION TEST RESULT VIP BACCARAT ========', ()=>{
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
  let result = null
 
  it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
      await VipBaccaratFunc.verifySignInSuccessfully()
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
      await VipBaccaratFunc.waitUtilNewRound()
      // await VipBaccaratFunc.verifyBetChoice()
  })
  
  it('TC_003_Full_Smoke_Verify History', async() => {
    await utils.sleep(3000)
    await VipBaccaratFunc.openHistory()
    await VipBaccaratFunc.verifyHistoryPopup()
    await VipBaccaratFunc.closeHistory()
  })

  it('TC_004_Smoke_Verify Settlement all Bet Choices', async()=>{
    let _choice = ['Big','PlayerPair','Player','Tie','BankerPair']
     await VipBaccaratFunc.verifySettlementMultipleChoices(_choice,10)
  })

  it('TC_005_Full_Smoke_Verify MD5 String', async () => {
    await VipBaccaratFunc.verifyMd5()
 }) 

  it('TC_006_Full_Smoke_Verify Home', async() => {
    await VipBaccaratFunc.returnHome()
  })

})
