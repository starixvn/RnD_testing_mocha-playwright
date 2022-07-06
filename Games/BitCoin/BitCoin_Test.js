const game = "BitCoin"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BitCoinFunc from './BitCoin_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'
let BitCoinLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./BitCoin_Locator').BitCoinLocator_vn : require('./BitCoin_Locator').BitCoinLocator_en)

describe('======== AUTOMATION TEST RESULT BITCOIN ========', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game from lobby and nagvigation of statistic bar', async () => {
  await BitCoinFunc.VerifySignInSuccessfully()
    }) 

   it('TC_06_Full_Verify Max Bet on Big', async () => {
  await BitCoinFunc.waitUtilNewRound()
    const pos = "Up"
    const errormsg = `"errorCode":"SB1910"`
   await BitCoinFunc.PlaceBet(pos,1000)
   await BitCoinFunc.PlaceBet(pos,1000)
   await BitCoinFunc.PlaceBet(pos,5,'nowait')
   await BitCoinFunc.VerifyErrorMessage(errormsg)
  await BitCoinFunc.CheckSettleBalance()
  }) 
 
 it('TC_07_Full_Verify Max Bet on Small', async () => {
  await BitCoinFunc.waitUtilNewRound()
   const pos = "Down"
   const errormsg = `"errorCode":"SB1910"`
  await BitCoinFunc.PlaceBet(pos,1000)
  await BitCoinFunc.PlaceBet(pos,1000)
  await BitCoinFunc.PlaceBet(pos,5,'nowait')
  await BitCoinFunc.VerifyErrorMessage(errormsg)
  await BitCoinFunc.CheckSettleBalance()
}) 

  it('TC_08_Full_Smoke_Verify Hedgebets', async () => {
    await BitCoinFunc.waitUtilNewRound()
     const pos = "Odd"
     const errormsg = '"errorCode":"SB1927"'
    await BitCoinFunc.PlaceBet(pos,1)
    await BitCoinFunc.VerifyBetStake(pos,1)
    await BitCoinFunc.PlaceBet("Even",5,'nowait')
    await BitCoinFunc.VerifyErrorMessage(errormsg)
    await BitCoinFunc.CheckSettleBalance()
  }) 


  it('TC_09_Full_Verify User Can Only Bet on 1 Pos-Even', async () => {
    await BitCoinFunc.waitUtilNewRound()
    const pos = "Even"
    const errormsg = '"errorCode":"SB1927"'
   await BitCoinFunc.PlaceBet(pos,1)
   await BitCoinFunc.VerifyBetStake(pos,1)
   await BitCoinFunc.PlaceBet("Odd",5,'nowait')
   await BitCoinFunc.VerifyErrorMessage(errormsg)
   await BitCoinFunc.CheckSettleBalance()

  })  
 




//   it('TC_18_Full_Verify searching an invalid roundid', async() =>{
//     await GameLobbyFunc.openResultPage()
//     await ResultFunc.BitCoin.verifyInvalidRoundID()
//   })

//   it('TC_19_Full_Verify searching an archived roundid', async() =>{
//     await GameLobbyFunc.openResultPage()
//     await ResultFunc.BitCoin.verifyArchivedRoundID()
//   })

//   it('TC_20_Full_Verify searching with roundid =0', async()=>{
//     await GameLobbyFunc.openResultPage()
//     await ResultFunc.BitCoin.verifyRoundID0()
//   })

//   it('TC_02_Full_Verify History Content', async () => {
//     await BitCoinFunc.OpenHistory()
//     await BitCoinFunc.VerifyHistoryContent()
//     await BitCoinFunc.CloseHistory()
//   })  

//   it('TC_03_Full_Verify Guide Content', async () => {
//     await BitCoinFunc.OpenGuide()
//     await BitCoinFunc.VerifyGuideContent()
//     await BitCoinFunc.CloseGuide()
//   })  

//   it('TC_04_Full_Verify Statistic and Preset Content', async () => {
//     await BitCoinFunc.waitUtilNewRound()
//     await BitCoinFunc.OpenStatistic()
//     await BitCoinFunc.VerifyStatisticContent()
//     await BitCoinFunc.CloseStatistic()
//     await BitCoinFunc.OpenPreset()
//     await BitCoinFunc.VerifyPresetContent()
//     await BitCoinFunc.ClosePreset()
//   })  

//   it('TC_05_Full_Verify Block bet time', async () => {
//     await utils.verifyBlockTime(game,BitCoinFunc.PlaceBet,['Big',1,'nowait'])
//   })  
  
//   it('TC_21_Full_Smoke_Verify Close Game Success', async () => {
//     await BitCoinFunc.CloseGame()
//   }) 

})

