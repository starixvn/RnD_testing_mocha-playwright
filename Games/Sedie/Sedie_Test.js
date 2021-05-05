const game = "Sedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as SedieFunc from './Sedie_Function'
import * as ResultFunc from './../Result_Function'
import * as GameLobbyFunc from './../GameLobby_Function'

describe('Sedie Game', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)


  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

  let result;
  it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
      await SedieFunc.verifySignInSuccessfully()
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
      await SedieFunc.verifyBetChoice()
  })
  
  it('TC_003_Full_Smoke_Verify betting on Even Choice', async() =>{
    await SedieFunc.placeBet("Even")
  })

  it('TC_004_Full_Smoke_Verify betting on Odd Choice', async() =>{
    await SedieFunc.placeBet("Odd")
  })

  it('TC_005_Full_Smoke_Verify betting on Red4 Choice', async() =>{
    await SedieFunc.placeBet("Red4")
  })

  it('TC_006_Full_Smoke_Verify betting on Red3 Choice', async() =>{
    await SedieFunc.placeBet("Red3")
  })

  it('TC_007_Full_Smoke_Verify betting on Red2 Choice', async() =>{
    await SedieFunc.placeBet("Red2")
  })

  it('TC_008_Full_Smoke_Verify betting on White3 Choice', async() =>{
    await SedieFunc.placeBet("White3")
  })

  it('TC_009_Full_Smoke_Verify betting on White4 Choice', async() =>{
    await SedieFunc.placeBet("White4")
  })

  it('TC_010_Full_Smoke_Verify Bet Chip', async() =>{
    await SedieFunc.verifyBetChip()
  })

  it('TC_011_Full_Smoke_Verify betting by chip 5', async() =>{
    await SedieFunc.placeBet("Even",5)
  })

  it('TC_012_Full_Smoke_Verify betting by chip 10', async() =>{
    await SedieFunc.placeBet("Even",10)
  })

  it('TC_013_Full_Smoke_Verify betting by chip 50', async() =>{
    await SedieFunc.placeBet("Even",50)
  })

  it('TC_014_Full_Smoke_Verify betting by chip 100', async() =>{
    await SedieFunc.placeBet("Even",100)
  })

  it('TC_015_Full_Smoke_Verify betting by chip 200', async() =>{
    await SedieFunc.placeBet("Even",200)
  })

  it('TC_016_Full_Smoke_Verify betting by chip 500', async() =>{
    await SedieFunc.placeBet("Even",500)
  })

  it('TC_017_Full_Smoke_Verify betting by chip 1000', async() =>{
    await SedieFunc.placeBet("Even",1000)
  })

  it('TC_018_Full_Smoke_Verify betting by chip 2000', async() =>{
    await SedieFunc.placeBet("Even",2000)
  })

  it('TC_019_Full_Smoke_Verify betting at Block Betting Time', async() =>{
    await SedieFunc.verifyBetAtBlockBettingTime()
  })

  it('TC_020_Full_Smoke_Verify betting at Settlement Time', async() =>{
    await SedieFunc.verifyBetAtSettlementTime()
  })

  it('TC_021_Full_Smoke_Verify maxbet of Even', async() =>{
    await SedieFunc.verifyMaxBet('Even')
  })

  it('TC_022_Full_Smoke_Verify maxbet of Odd', async() =>{
    await SedieFunc.verifyMaxBet('Odd')
  })

  it('TC_023_Full_Smoke_Verify maxbet of Red4', async() =>{
    await SedieFunc.verifyMaxBet('Red4')
  })

  it('TC_024_Full_Smoke_Verify maxbet of Red3', async() =>{
    await SedieFunc.verifyMaxBet('Red3')
  })

  it('TC_025_Full_Smoke_Verify maxbet of Red2', async() =>{
    await SedieFunc.verifyMaxBet('Red2')
  })

  it('TC_026_Full_Smoke_Verify maxbet of White3', async() =>{
    await SedieFunc.verifyMaxBet('White3')
  })

  it('TC_027_Full_Smoke_Verify maxbet of White4', async() =>{
    await SedieFunc.verifyMaxBet('White4')
  })
  
  it('TC_028_Full_Smoke_Verify maxbet of Round', async() =>{
    await SedieFunc.verifyMaxBet('Round')
  })
  
  it('TC_029_Full_Smoke_Verify Settlement on choice Even', async() =>{  
    await SedieFunc.verifySettlement("Even",5)
  })

  it('TC_030_Full_Smoke_Verify Settlement on choice Odd', async() =>{  
    await SedieFunc.verifySettlement("Odd",10)
  })

  it('TC_031_Full_Smoke_Verify Settlement on choice Red4', async() =>{  
    await SedieFunc.verifySettlement("Red4",200)
  })

  it('TC_032_Full_Smoke_Verify Settlement on choice Red3', async() =>{  
    await SedieFunc.verifySettlement("Red3",50)
  })

  it('TC_033_Full_Smoke_Verify Settlement on choice Red2', async() =>{  
    await SedieFunc.verifySettlement("Red2",1)
  })

  it('TC_034_Full_Smoke_Verify Settlement on choice White3', async() =>{  
    await SedieFunc.verifySettlement("White3",100)
  })
  
  it('TC_035_Full_Smoke_Verify Settlement on choice White4', async() =>{  
    result = await SedieFunc.verifySettlement("White4",10,true)
    console.log(result)
  })

  it('TC_036_Full_Smoke_Verify Game Guide', async()=>{
    await SedieFunc.openGuide()
    await SedieFunc.verifyGuideContent()
    await SedieFunc.closeGuide()
  })

  it('TC_037_Full_Smoke_Verify History', async() => {
    await SedieFunc.openHistory()
    await SedieFunc.verifyHistoryPopup()
    await SedieFunc.closeHistory()
  })

  it('TC_038_Full_Smoke_Verify Home', async() => {
    await SedieFunc.returnHome()
  })

  it('TC_039_Full_Smoke_Verify Result Page', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.Sedie.verifyResult(await result)
  })

  it('TC_040_Full_Smoke_Verify searching an invalid roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.Sedie.verifyInvalidRoundID()
  })

  it('TC_041_Full_Smoke_Verify searching an archived roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.Sedie.verifyArchivedRoundID()
  })

  it('TC_042_Full_Smoke_Verify searching with roundid =0', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.Sedie.verifyRoundID0()
  })

})

