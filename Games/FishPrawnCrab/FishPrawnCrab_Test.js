const game = "FishPrawnCrab"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as FishPrawnCrabFunc from './FishPrawnCrab_Function'
import * as ResultFunc from '../References/Result_Function'

describe('======== AUTOMATION TEST RESULT FishPrawnCrab ========', ()=>{
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

  // it('TC_002_Full_Smoke_Verify UI of All Bet Choices', async() => {
  //     await FishPrawnCrabFunc.verifyBetChoice()
  // })
  
  it('TC_003_Full_Smoke_Verify User Can Open History Popup', async() => {
    await FishPrawnCrabFunc.openHistory()
    await FishPrawnCrabFunc.verifyHistoryPopup()
    await FishPrawnCrabFunc.closeHistory()
  })

    it('TC_004_Full_Smoke_Verify MD5 String', async () => {
    await FishPrawnCrabFunc.verifyMd5()
  }) 

  it('TC_005_Smoke_Verify Place Bet All Bet Choices and check settlement Result', async()=>{
    let _choice = ['Stag','Gourd','Fish','Rooster','Crab','Prawn']
     await FishPrawnCrabFunc.verifySettlementMultipleChoices(_choice,10)
  })

  it('TC_006_Full_Smoke_Verify User can go back game lobby by click Home button', async() => {
    await FishPrawnCrabFunc.returnClose()
  })

})
