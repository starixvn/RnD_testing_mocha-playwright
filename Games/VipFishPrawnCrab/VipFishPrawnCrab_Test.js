const game = "VipFishPrawnCrab"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as VipFishPrawnCrabFunc from './VipFishPrawnCrab_Function'
import * as ResultFunc from '../References/Result_Function'

describe('VipFishPrawnCrab Game', ()=>{
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
      await VipFishPrawnCrabFunc.verifySignInSuccessfully()
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
      await VipFishPrawnCrabFunc.verifyBetChoice()
  })
  
  it('TC_037_Full_Smoke_Verify History', async() => {
    await VipFishPrawnCrabFunc.openHistory()
    await VipFishPrawnCrabFunc.verifyHistoryPopup()
    await VipFishPrawnCrabFunc.closeHistory()
  })

  it('TC_043_Smoke_Verify Settlement all Bet Choices', async()=>{
    let _choice = ['Stag','Gourd','Fish','Rooster','Crab','Prawn','Ocean','Mountain','AnyTriple']
     await VipFishPrawnCrabFunc.verifySettlementMultipleChoices(_choice,10)
  })

  it('TC_038_Full_Smoke_Verify Home', async() => {
    await VipFishPrawnCrabFunc.returnHome()
  })

})
