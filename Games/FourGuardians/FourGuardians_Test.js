const game = "FourGuardians"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as FourGuardiansFunc from './FourGuardians_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'

describe('======== AUTOMATION TEST RESULT FourGuardians ========', ()=>{

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

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await FourGuardiansFunc.VerifySignInSuccessfully()
  })  

  // it('TC_02_Full_Verify History Content', async () => {
  //     await FourGuardiansFunc.VerifyHistoryContent()
  // })  

  // it('TC_03_Full_Verify Guide Content', async () => {
  //   await FourGuardiansFunc.VerifyGuideContent()
  // })  

  // it('TC_04_Full_Verify Left Right payline', async () => {
  //   await FourGuardiansFunc.VerifyRightPayline()
  //   await FourGuardiansFunc.VerifyLeftPayline()
  // })  

  // it('TC_05_Full_Verify payline Detail Default', async () => {
  //   await FourGuardiansFunc.VerifyPaylineDetail()
  // }) 
  
  // it('TC_06_Full_Verify payline Detail Odd', async () => {
  //   await FourGuardiansFunc.VerifyPaylinelOdd()
  // })  

  // it('TC_07_Full_Verify payline Detail Even', async () => {
  //   await FourGuardiansFunc.VerifyPaylineEven()
  // })  

  // it('TC_08_Full_Verify payline Detail All', async () => {
  //   await FourGuardiansFunc.VerifyPaylineAll()
  // })  

  it('TC_09_Full_Smoke_Verify Place bet single line', async () => {
      await utils.sleep(15000)
      await FourGuardiansFunc.checkSettlement(FourGuardiansFunc.PlaceBet,["L1",1])
      await utils.sleep(2000)
  })  

  it('TC_10_Full_Smoke_Verify User Can Place Bet Odd Line and check settlement Result', async () => {
    await FourGuardiansFunc.checkSettlement(FourGuardiansFunc.PlaceBet,["OddLine",1])
  })    

  it('TC_11_Full_Smoke_Verify User Can Open History pop-up', async () => {
    await FourGuardiansFunc.VerifyHistoryContent()
    })  
  
  it('TC_12_Full_Smoke_Verify User can go back game lobby by click Home button', async () => {
  await FourGuardiansFunc.CloseGame()
  })  
})

