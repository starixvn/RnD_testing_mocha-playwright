const pw = require('playwright')
const game = "Sedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as SedieFunc from './Sedie_Function'

describe('Sedie Game', ()=>{
  before(async function(){
    await utils.Login(env,game);
    await utils.wsHearMessageOn()
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${__filename}.png`});
      await addContext (this,`./Pictures/${__filename}.png` )
    }
  })

  it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    try {
        await SedieFunc.OpenFromLobby()
        await SedieFunc.verifySignInSuccessfully()
    } catch (error) {
      console.log(error)
    }
  })  

  it('TC_002_Full_Smoke_Verify Bet Choice', async() => {
    try {
      await SedieFunc.verifyBetChoice()
      await SedieFunc.verifySettlement("Even",5)
    } catch (error) {
      console.log(error)
    }
  })
  
  // it('TC_003_Full_Smoke_Verify betting on Even Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_004_Full_Smoke_Verify betting on Odd Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Odd")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_005_Full_Smoke_Verify betting on Red4 Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Red4")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_006_Full_Smoke_Verify betting on Red3 Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Red3")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_007_Full_Smoke_Verify betting on Red2 Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Red2")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_008_Full_Smoke_Verify betting on White3 Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("White3")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_009_Full_Smoke_Verify betting on White4 Choice', async() =>{
  //   try {
  //     await SedieFunc.placeBet("White4")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_010_Full_Smoke_Verify Bet Chip', async() =>{
  //   try {
  //     await SedieFunc.verifyBetChip()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_011_Full_Smoke_Verify betting by chip 5', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",5)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_012_Full_Smoke_Verify betting by chip 10', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",10)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_013_Full_Smoke_Verify betting by chip 50', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",50)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_014_Full_Smoke_Verify betting by chip 100', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",100)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_015_Full_Smoke_Verify betting by chip 200', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",200)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_016_Full_Smoke_Verify betting by chip 500', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",500)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_017_Full_Smoke_Verify betting by chip 1000', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",1000)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_018_Full_Smoke_Verify betting by chip 2000', async() =>{
  //   try {
  //     await SedieFunc.placeBet("Even",2000)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_019_Full_Smoke_Verify betting at Block Betting Time', async() =>{
  //   try {
  //     await SedieFunc.verifyBetAtBlockBettingTime()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_020_Full_Smoke_Verify betting at Settlement Time', async() =>{
  //   try {
  //     await SedieFunc.verifyBetAtSettlementTime()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_021_Full_Smoke_Verify maxbet of Even', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('Even')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_022_Full_Smoke_Verify maxbet of Odd', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('Odd')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_023_Full_Smoke_Verify maxbet of Red4', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('Red4')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_024_Full_Smoke_Verify maxbet of Red3', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('Red3')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_025_Full_Smoke_Verify maxbet of Red2', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('Red2')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_026_Full_Smoke_Verify maxbet of White3', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('White3')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // it('TC_027_Full_Smoke_Verify maxbet of White4', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('White4')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
  

  // it('TC_028_Full_Smoke_Verify maxbet of Round', async() =>{
  //   try {
  //     await SedieFunc.verifyMaxBet('Round')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
})
