const pw = require('playwright')
const game = "VipSedie"
const addContext = require('mochawesome/addContext')
import * as config from '../../config/config'
import * as utils from '../../util/utils'
import * as VipSedieFunc from './VipSedie_Function'

describe('VipSedie Game', ()=>{
  before(async function(){
    await utils.Login(env,game);
    await utils.wsHearMessageOn()
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

  it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
      await VipSedieFunc.openFromLobby()
      await VipSedieFunc.verifySignInSuccessfully()
      // await utils.shouldBeEqual(true,false)
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
      await VipSedieFunc.verifyBetChoice()
  })
  
  it('TC_003_Full_Smoke_Verify betting on Even Choice', async() =>{
    await VipSedieFunc.placeBet("Even")
  })

  it('TC_004_Full_Smoke_Verify betting on Odd Choice', async() =>{
    await VipSedieFunc.placeBet("Odd")
  })

  it('TC_005_Full_Smoke_Verify betting on Red4 Choice', async() =>{
    await VipSedieFunc.placeBet("Red4")
  })

  it('TC_006_Full_Smoke_Verify betting on Red3 Choice', async() =>{
    await VipSedieFunc.placeBet("Red3")
  })

  it('TC_007_Full_Smoke_Verify betting on Red2 Choice', async() =>{
    await VipSedieFunc.placeBet("Red2")
  })

  it('TC_008_Full_Smoke_Verify betting on White3 Choice', async() =>{
    await VipSedieFunc.placeBet("White3")
  })

  it('TC_009_Full_Smoke_Verify betting on White4 Choice', async() =>{
    await VipSedieFunc.placeBet("White4")
  })

  it('TC_010_Full_Smoke_Verify Bet Chip', async() =>{
    await VipSedieFunc.verifyBetChip()
  })

  it('TC_011_Full_Smoke_Verify betting by chip 20', async() =>{
    await VipSedieFunc.placeBet("Even",20)
  })

  it('TC_012_Full_Smoke_Verify betting by chip 50', async() =>{
    await VipSedieFunc.placeBet("Even",50)
  })

  it('TC_013_Full_Smoke_Verify betting by chip 100', async() =>{
    await VipSedieFunc.placeBet("Even",100)
  })

  it('TC_014_Full_Smoke_Verify betting by chip 200', async() =>{
    await VipSedieFunc.placeBet("Even",200)
  })

  it('TC_015_Full_Smoke_Verify betting by chip 500', async() =>{
    await VipSedieFunc.placeBet("Even",500)
  })

  it('TC_016_Full_Smoke_Verify betting by chip 1000', async() =>{
    await VipSedieFunc.placeBet("Even",1000)
  })

  it('TC_017_Full_Smoke_Verify betting by chip 2000', async() =>{
    await VipSedieFunc.placeBet("Even",2000)
  })

  it('TC_018_Full_Smoke_Verify betting by chip 3000', async() =>{
    await VipSedieFunc.placeBet("Even",3000)
  })

  it('TC_019_Full_Smoke_Verify betting at Block Betting Time', async() =>{
    await VipSedieFunc.verifyBetAtBlockBettingTime()
  })

  it('TC_020_Full_Smoke_Verify betting at Settlement Time', async() =>{
    await VipSedieFunc.verifyBetAtSettlementTime()
  })

  it('TC_021_Full_Smoke_Verify maxbet of Even', async() =>{
    await VipSedieFunc.verifyMaxBet('Even')
  })

  it('TC_022_Full_Smoke_Verify maxbet of Odd', async() =>{
    await VipSedieFunc.verifyMaxBet('Odd')
  })

  it('TC_023_Full_Smoke_Verify maxbet of Red4', async() =>{
    await VipSedieFunc.verifyMaxBet('Red4')
  })

  it('TC_024_Full_Smoke_Verify maxbet of Red3', async() =>{
    await VipSedieFunc.verifyMaxBet('Red3')
  })

  it('TC_025_Full_Smoke_Verify maxbet of Red2', async() =>{
    await VipSedieFunc.verifyMaxBet('Red2')
  })

  it('TC_026_Full_Smoke_Verify maxbet of White3', async() =>{
    await VipSedieFunc.verifyMaxBet('White3')
  })

  it('TC_027_Full_Smoke_Verify maxbet of White4', async() =>{
    await VipSedieFunc.verifyMaxBet('White4')
  })
  
  it('TC_028_Full_Smoke_Verify maxbet of Round', async() =>{
    await VipSedieFunc.verifyMaxBet('Round')
  })
  
  // it('TC_029_Full_Smoke_Verify Settlement on choice Even', async() =>{  
  //   await VipSedieFunc.verifySettlement("Even",20)
  // })

  // it('TC_030_Full_Smoke_Verify Settlement on choice Odd', async() =>{  
  //   await VipSedieFunc.verifySettlement("Odd",50)
  // })

  // it('TC_031_Full_Smoke_Verify Settlement on choice Red4', async() =>{  
  //   await VipSedieFunc.verifySettlement("Red4",500)
  // })

  // it('TC_032_Full_Smoke_Verify Settlement on choice Red3', async() =>{  
  //   await VipSedieFunc.verifySettlement("Red3",50)
  // })

  // it('TC_033_Full_Smoke_Verify Settlement on choice Red2', async() =>{  
  //   await VipSedieFunc.verifySettlement("Red2",20)
  // })

  // it('TC_034_Full_Smoke_Verify Settlement on choice White3', async() =>{  
  //   await VipSedieFunc.verifySettlement("White3",100)
  // })
  
  // it('TC_035_Full_Smoke_Verify Settlement on choice White4', async() =>{  
  //   await VipSedieFunc.verifySettlement("White4",50)
  // })

  it('TC_036_Full_Smoke_Verify Game Guide', async()=>{
    await VipSedieFunc.openGuide()
    await VipSedieFunc.verifyGuideContent()
    await VipSedieFunc.closeGuide()
  })

  it('TC_037_Full_Smoke_Verify History', async() => {
    await VipSedieFunc.openHistory()
    await VipSedieFunc.verifyHistoryPopup()
    await VipSedieFunc.closeHistory()
  })

  it('TC_038_Full_Smoke_Verify Home', async() => {
    await VipSedieFunc.returnHome()
  })

})
