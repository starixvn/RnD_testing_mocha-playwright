const game = "FishPrawnCrab"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as FishPrawnCrabFunc from './FishPrawnCrab_Function'
import * as ResultFunc from '../References/Result_Function'

describe('FishPrawnCrab Game', ()=>{
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
      await FishPrawnCrabFunc.verifySignInSuccessfully()
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
      await FishPrawnCrabFunc.verifyBetChoice()
  })
  
  it('TC_037_Full_Smoke_Verify History', async() => {
    await FishPrawnCrabFunc.openHistory()
    await FishPrawnCrabFunc.verifyHistoryPopup()
    await FishPrawnCrabFunc.closeHistory()
  })

  it('TC_043_Smoke_Verify Settlement all Bet Choices', async()=>{
    let _choice = ['Stag','Gourd','Fish','Rooster','Crab','Prawn']
     await FishPrawnCrabFunc.verifySettlementMultipleChoices(_choice,10)
  })

  it('TC_038_Full_Smoke_Verify Home', async() => {
    await FishPrawnCrabFunc.returnClose()
  })

})
