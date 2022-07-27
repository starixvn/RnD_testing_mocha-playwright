const game = "BaccaratBlockChain"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as BaccaratBlockChainFunc from './BaccaratBlockChain_Function'

describe('======== AUTOMATION TEST RESULT BaccaratBlockChain ========', ()=>{
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
 
  it('TC_001_Full_Smoke_Verify can open game successfully', async () => {
      await BaccaratBlockChainFunc.verifySignInSuccessfully()
      await BaccaratBlockChainFunc.verifyIntroduce()
  })  

  
  it('TC_002_Smoke_Verify Settlement all Bet Choices', async()=>{
    let _choice = ['Big','PlayerPair','Player','Tie','BankerPair']
     await BaccaratBlockChainFunc.verifySettlementMultipleChoices(_choice,1)
  })

  it('TC_003_Full_Smoke_Verify History', async() => {
    await BaccaratBlockChainFunc.openHistory()
    await BaccaratBlockChainFunc.verifyHistoryPopup()
    await BaccaratBlockChainFunc.closeHistory()
  })

  it('TC_004_Smoke_Verify Hedgebet', async()=>{
    await BaccaratBlockChainFunc.waitUtilNewRound()
    await BaccaratBlockChainFunc.verifyHedgeBet('Big','Small',1,'"errorCode":"SB1939"')
  })

  it('TC_005_Full_Smoke_Verify Home', async() => {
    await BaccaratBlockChainFunc.returnHome()
  })

})
