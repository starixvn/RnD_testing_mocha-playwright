const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as SedieWarFunc from './SedieWar_Function'
import * as ResultFunc from './../Result_Function'
import * as GameLobbyFunc from './../GameLobby_Function'
const game = "SedieWar"

describe('SedieWar Game', ()=>{
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
      await SedieWarFunc.verifySignInSuccessfully()
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
      await SedieWarFunc.verifyBetChoice()
  })

  it('TC_003_Full_Smoke_Verify betting on Player Choice', async() =>{
      await SedieWarFunc.placeBet("Player")
  })
  
  it('TC_004_Full_Smoke_Verify betting on Banker Choice', async() =>{
      await SedieWarFunc.placeBet("Banker")
  })

  it('TC_005_Full_Smoke_Verify betting on Tie Choice', async() =>{
      await SedieWarFunc.placeBet("Tie")
  })

  it('TC_006_Full_Smoke_Verify betting on Even Choice', async() =>{
      await SedieWarFunc.placeBet("Even")
  })

  it('TC_007_Full_Smoke_Verify betting on Odd Choice', async() =>{
      await SedieWarFunc.placeBet("Odd")
  })

  it('TC_008_Full_Smoke_Verify betting on PlayerEven Choice', async() =>{
      await SedieWarFunc.placeBet("PlayerEven")
  })

  it('TC_009_Full_Smoke_Verify betting on PlayerOdd Choice', async() =>{
      await SedieWarFunc.placeBet("PlayerOdd")
  })

  it('TC_010_Full_Smoke_Verify betting on PlayerRed4 Choice', async() =>{
      await SedieWarFunc.placeBet("PlayerRed4")
  })

  it('TC_011_Full_Smoke_Verify betting on PlayerRed3 Choice', async() =>{
      await SedieWarFunc.placeBet("PlayerRed3")
  })

  it('TC_012_Full_Smoke_Verify betting on PlayerWhite3 Choice', async() =>{
      await SedieWarFunc.placeBet("PlayerWhite3")
  })

  it('TC_013_Full_Smoke_Verify betting on PlayerWhite4 Choice', async() =>{
      await SedieWarFunc.placeBet("PlayerWhite4")
  })

  it('TC_014_Full_Smoke_Verify betting on BankerEven Choice', async() =>{
      await SedieWarFunc.placeBet("BankerEven")
  })

  it('TC_015_Full_Smoke_Verify betting on BankerOdd Choice', async() =>{
      await SedieWarFunc.placeBet("BankerOdd")
  })

  it('TC_016_Full_Smoke_Verify betting on BankerRed4 Choice', async() =>{
      await SedieWarFunc.placeBet("BankerRed4")
  })

  it('TC_017_Full_Smoke_Verify betting on BankerRed3 Choice', async() =>{
      await SedieWarFunc.placeBet("BankerRed3")
  })

  it('TC_018_Full_Smoke_Verify betting on BankerWhite3 Choice', async() =>{
      await SedieWarFunc.placeBet("BankerWhite3")
  })

  it('TC_019_Full_Smoke_Verify betting on BankerWhite4 Choice', async() =>{
      await SedieWarFunc.placeBet("BankerWhite4")
  })

  it('TC_020_Full_Smoke_Verify Bet Chip', async() =>{
      await SedieWarFunc.verifyBetChip()
  })

  it('TC_021_Full_Smoke_Verify betting by chip 5', async() =>{
    await SedieWarFunc.placeBet("Even",5)
  })

  it('TC_022_Full_Smoke_Verify betting by chip 10', async() =>{
    await SedieWarFunc.placeBet("Even",10)
  })

  it('TC_023_Full_Smoke_Verify betting by chip 50', async() =>{
    await SedieWarFunc.placeBet("Even",50)
  })

  it('TC_024_Full_Smoke_Verify betting by chip 100', async() =>{
    await SedieWarFunc.placeBet("Even",100)
  })

  it('TC_025_Full_Smoke_Verify betting by chip 200', async() =>{
    await SedieWarFunc.placeBet("Even",200)
  })

  it('TC_026_Full_Smoke_Verify betting by chip 500', async() =>{
    await SedieWarFunc.placeBet("Even",500)
  })

  it('TC_027_Full_Smoke_Verify betting by chip 1000', async() =>{
    await SedieWarFunc.placeBet("Even",1000)
  })

  it('TC_028_Full_Smoke_Verify betting by chip 2000', async() =>{
    await SedieWarFunc.placeBet("Even",2000)
  })

  
  it('TC_029_Full_Smoke_Verify betting at Block Betting Time', async() =>{
    await SedieWarFunc.verifyBetAtBlockBettingTime()
  })

  it('TC_030_Full_Smoke_Verify betting at Settlement Time', async() =>{
    await SedieWarFunc.verifyBetAtSettlementTime()
  })

  it('TC_031_Full_Smoke_Verify maxbet of Player Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("Player")
  })
  
  it('TC_032_Full_Smoke_Verify maxbet of Banker Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("Banker")
  })

  it('TC_033_Full_Smoke_Verify maxbet of Tie Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("Tie")
  })

  it('TC_034_Full_Smoke_Verify maxbet of Even Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("Even")
  })

  it('TC_035_Full_Smoke_Verify maxbet of Odd Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("Odd")
  })

  it('TC_036_Full_Smoke_Verify maxbet of PlayerEven Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("PlayerEven")
  })

  it('TC_037_Full_Smoke_Verify maxbet of PlayerOdd Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("PlayerOdd")
  })

  it('TC_038_Full_Smoke_Verify maxbet of PlayerRed4 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("PlayerRed4")
  })

  it('TC_039_Full_Smoke_Verify maxbet of PlayerRed3 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("PlayerRed3")
  })

  it('TC_040_Full_Smoke_Verify maxbet of PlayerWhite3 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("PlayerWhite3")
  })

  it('TC_041_Full_Smoke_Verify maxbet of PlayerWhite4 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("PlayerWhite4")
  })

  it('TC_042_Full_Smoke_Verify maxbet of BankerEven Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("BankerEven")
  })

  it('TC_043_Full_Smoke_Verify maxbet of BankerOdd Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("BankerOdd")
  })

  it('TC_044_Full_Smoke_Verify maxbet of BankerRed4 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("BankerRed4")
  })

  it('TC_045_Full_Smoke_Verify maxbet of BankerRed3 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("BankerRed3")
  })

  it('TC_046_Full_Smoke_Verify maxbet of BankerWhite3 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("BankerWhite3")
  })

  it('TC_047_Full_Smoke_Verify maxbet of BankerWhite4 Choice', async() =>{
      await SedieWarFunc.verifyMaxBet("BankerWhite4")
  })

  it('TC_048_Full_Smoke_Verify maxbet of Round', async() =>{
      await SedieWarFunc.verifyMaxBet('Round')
  })

  it('TC_049_Full_Smoke_Verify Settlement on Player Choice', async() =>{
      await SedieWarFunc.verifySettlement("Player",5)
  })
  
  it('TC_050_Full_Smoke_Verify Settlement on Banker Choice', async() =>{
      await SedieWarFunc.verifySettlement("Banker",10)
  })

  it('TC_051_Full_Smoke_Verify Settlement on Tie Choice', async() =>{
      await SedieWarFunc.verifySettlement("Tie",100)
  })

  it('TC_052_Full_Smoke_Verify Settlement on Even Choice', async() =>{
      await SedieWarFunc.verifySettlement("Even",200)
  })

  it('TC_053_Full_Smoke_Verify Settlement on Odd Choice', async() =>{
      await SedieWarFunc.verifySettlement("Odd",500)
  })

  it('TC_054_Full_Smoke_Verify Settlement on PlayerEven Choice', async() =>{
      await SedieWarFunc.verifySettlement("PlayerEven",1000)
  })

  it('TC_055_Full_Smoke_Verify Settlement on PlayerOdd Choice', async() =>{
      await SedieWarFunc.verifySettlement("PlayerOdd",2000)
  })

  it('TC_056_Full_Smoke_Verify Settlement on PlayerRed4 Choice', async() =>{
      await SedieWarFunc.verifySettlement("PlayerRed4")
  })

  it('TC_057_Full_Smoke_Verify Settlement on PlayerRed3 Choice', async() =>{
      await SedieWarFunc.verifySettlement("PlayerRed3")
  })

  it('TC_058_Full_Smoke_Verify Settlement on PlayerWhite3 Choice', async() =>{
      await SedieWarFunc.verifySettlement("PlayerWhite3")
  })

  it('TC_059_Full_Smoke_Verify Settlement on PlayerWhite4 Choice', async() =>{
      await SedieWarFunc.verifySettlement("PlayerWhite4")
  })

  it('TC_060_Full_Smoke_Verify Settlement on BankerEven Choice', async() =>{
      await SedieWarFunc.verifySettlement("BankerEven")
  })

  it('TC_061_Full_Smoke_Verify Settlement on BankerOdd Choice', async() =>{
      await SedieWarFunc.verifySettlement("BankerOdd")
  })

  it('TC_062_Full_Smoke_Verify Settlement on BankerRed4 Choice', async() =>{
      await SedieWarFunc.verifySettlement("BankerRed4")
  })

  it('TC_063_Full_Smoke_Verify Settlement on BankerRed3 Choice', async() =>{
      await SedieWarFunc.verifySettlement("BankerRed3")
  })

  it('TC_064_Full_Smoke_Verify Settlement on BankerWhite3 Choice', async() =>{
      await SedieWarFunc.verifySettlement("BankerWhite3")
  })

  it('TC_065_Full_Smoke_Verify Settlement on BankerWhite4 Choice', async() =>{
      result = await SedieWarFunc.verifySettlement("BankerWhite4")
  })
  it('TC_066_Full_Smoke_Verify Game Guide', async()=>{
    await SedieWarFunc.openGuide()
    await SedieWarFunc.verifyGuideContent()
    await SedieWarFunc.closeGuide()
  })

  it('TC_067_Full_Smoke_Verify History', async() => {
    await SedieWarFunc.openHistory()
    await SedieWarFunc.verifyHistoryPopup()
    await SedieWarFunc.closeHistory()
  })

  it('TC_068_Full_Smoke_Verify Home', async() => {
    await SedieWarFunc.returnHome()
  })

  it('TC_069_Full_Smoke_Verify Result Page', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.SedieWar.verifyResult(await result)
  })

  it('TC_070_Full_Smoke_Verify searching an invalid roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.SedieWar.verifyInvalidRoundID()
  })

  it('TC_071_Full_Smoke_Verify searching an archived roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.SedieWar.verifyArchivedRoundID()
  })

  it('TC_072_Full_Smoke_Verify searching with roundid =0', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.SedieWar.verifyRoundID0()
  })

})