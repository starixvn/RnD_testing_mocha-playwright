const pw = require('playwright')
const game = "MiniSedie"
const addContext = require('mochawesome/addContext')
import * as config from '../../config/config'
import * as utils from '../../util/utils'
import { GameLobbyLocator } from '../GameLobby_Locator'
import * as MiniSedieFunc from './MiniSedie_Function'

describe('MiniSedie Game', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
  let result = null
 
  it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
      await MiniSedieFunc.openFromLobby()
      await MiniSedieFunc.verifySignInSuccessfully()
  })  

  // it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
  //     await MiniSedieFunc.verifyBetChoice()
  // })
  
  // it('TC_003_Full_Smoke_Verify betting on Even Choice', async() =>{
  //   await MiniSedieFunc.placeBet("Even")
  // })

  // it('TC_004_Full_Smoke_Verify betting on Odd Choice', async() =>{
  //   await MiniSedieFunc.placeBet("Odd")
  // })

  // it('TC_005_Full_Smoke_Verify betting on Red4 Choice', async() =>{
  //   await MiniSedieFunc.placeBet("Red4")
  // })

  // it('TC_006_Full_Smoke_Verify betting on Red3 Choice', async() =>{
  //   await MiniSedieFunc.placeBet("Red3")
  // })

  // it('TC_008_Full_Smoke_Verify betting on White3 Choice', async() =>{
  //   await MiniSedieFunc.placeBet("White3")
  // })

  // it('TC_009_Full_Smoke_Verify betting on White4 Choice', async() =>{
  //   await MiniSedieFunc.placeBet("White4")
  // })

  // it('TC_010_Full_Smoke_Verify Bet Chip', async() =>{
  //   await MiniSedieFunc.verifyBetChip()
  // })

  // it('TC_011_Full_Smoke_Verify betting by chip 5', async() =>{
  //   await MiniSedieFunc.placeBet("Even",5)
  // })

  // it('TC_012_Full_Smoke_Verify betting by chip 10', async() =>{
  //   await MiniSedieFunc.placeBet("Even",10)
  // })

  // it('TC_013_Full_Smoke_Verify betting by chip 50', async() =>{
  //   await MiniSedieFunc.placeBet("Even",50)
  // })

  // it('TC_014_Full_Smoke_Verify betting by chip 100', async() =>{
  //   await MiniSedieFunc.placeBet("Even",100)
  // })

  // it('TC_015_Full_Smoke_Verify betting by chip 200', async() =>{
  //   await MiniSedieFunc.placeBet("Even",200)
  // })

  // it('TC_016_Full_Smoke_Verify betting by chip 500', async() =>{
  //   await MiniSedieFunc.placeBet("Even",500)
  // })

  // it('TC_017_Full_Smoke_Verify betting by chip 1000', async() =>{
  //   await MiniSedieFunc.placeBet("Even",1000)
  // })

  // it('TC_018_Full_Smoke_Verify betting by chip 2000', async() =>{
  //   await MiniSedieFunc.placeBet("Even",2000)
  // })

  // it('TC_019_Full_Smoke_Verify betting at Block Betting Time', async() =>{
  //   await MiniSedieFunc.verifyBetAtBlockBettingTime()
  // })

  // it('TC_020_Full_Smoke_Verify betting at Settlement Time', async() =>{
  //   await MiniSedieFunc.verifyBetAtSettlementTime()
  // })

  // it('TC_021_Full_Smoke_Verify maxbet of Even', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('Even')
  // })

  // it('TC_022_Full_Smoke_Verify maxbet of Odd', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('Odd')
  // })

  // it('TC_023_Full_Smoke_Verify maxbet of Red4', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('Red4')
  // })

  // it('TC_024_Full_Smoke_Verify maxbet of Red3', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('Red3')
  // })


  // it('TC_026_Full_Smoke_Verify maxbet of White3', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('White3')
  // })

  // it('TC_027_Full_Smoke_Verify maxbet of White4', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('White4')
  // })
  
  // it('TC_028_Full_Smoke_Verify maxbet of Round', async() =>{
  //   await MiniSedieFunc.verifyMaxBet('Round')
  // })
  
  // it('TC_029_Full_Smoke_Verify Settlement on choice Even', async() =>{  
  //   await MiniSedieFunc.verifySettlement("Even",5)
  // })

  // it('TC_030_Full_Smoke_Verify Settlement on choice Odd', async() =>{  
  //   await MiniSedieFunc.verifySettlement("Odd",10)
  // })

  // it('TC_031_Full_Smoke_Verify Settlement on choice Red4', async() =>{  
  //   await MiniSedieFunc.verifySettlement("Red4",200)
  // })

  // it('TC_032_Full_Smoke_Verify Settlement on choice Red3', async() =>{  
  //   await MiniSedieFunc.verifySettlement("Red3",50)
  // })

  // it('TC_034_Full_Smoke_Verify Settlement on choice White3', async() =>{  
  //   await MiniSedieFunc.verifySettlement("White3",100)
  // })
  
  // it('TC_035_Full_Smoke_Verify Settlement on choice White4', async() =>{  
  //   result = await MiniSedieFunc.verifySettlement("White4",10,true)
  //   console.log(result)
  // })

  // it('TC_036_Full_Smoke_Verify Game Guide', async()=>{
  //   await MiniSedieFunc.openGuide()
  //   await MiniSedieFunc.verifyGuideContent()
  //   await MiniSedieFunc.closeGuide()
  // })

  // it('TC_037_Full_Smoke_Verify History', async() => {
  //   await MiniSedieFunc.openHistory()
  //   await MiniSedieFunc.verifyHistoryPopup()
  //   await MiniSedieFunc.closeHistory()
  // })

  // it('TC_038_Full_Smoke_Verify Home', async() => {
  //   await MiniSedieFunc.returnClose()
  // })

  it('TC_039_Full_Smoke_Verify ResultPage', async()=>{
    await utils.clickPos(GameLobbyLocator.Result.x, GameLobbyLocator.Result.y)
    await utils.sleep(5000)
    await utils.switchTabs(1)
    console.log(await page.title())
  })

})
