const game = "Baccarat"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as BaccaratFunc from './Baccarat_Function'

describe('======== AUTOMATION TEST RESULT BACCARAT ========', ()=>{
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
 
  it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
      await BaccaratFunc.verifySignInSuccessfully()
  })  

  
  it('TC_002_Full_Smoke_Verify History', async() => {
    await utils.sleep(3000)
    await BaccaratFunc.openHistory()
    await BaccaratFunc.verifyHistoryPopup()
    await BaccaratFunc.closeHistory()
  })

  it('TC_003_Smoke_Verify Settlement all Bet Choices', async()=>{
    let _choice = ['Big','PlayerPair','Player','Tie','BankerPair']
     await BaccaratFunc.verifySettlementMultipleChoices(_choice,1)
  })

  it('TC_004_Full_Smoke_Verify Home', async() => {
    await BaccaratFunc.returnHome()
  })

})
