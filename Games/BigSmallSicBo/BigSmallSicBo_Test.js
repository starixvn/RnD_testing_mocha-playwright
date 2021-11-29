const game = "BigSmallSicbo"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BigSmallSBFunc from '../BigSmallSicBo/BigSmallSicBo_Function'
const BigSmallSicboLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./BigSmallSicBo_Locator').BigSmallSicboLocator_vn : require('./BigSmallSicBo_Locator').BigSmallSicboLocator_en)
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'

describe('BigSmall SicBo Game', ()=>{

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

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await BigSmallSBFunc.VerifySignInSuccessfully()

  })  

  it('TC_06_Full_Verify bet chips', async () => {
    await BigSmallSBFunc.waitUtilNewRound()
    let pos = "Big"
    let chips = [1,5,10,50,100,200,500,1000]
    for (let i of chips) {
      await BigSmallSBFunc.PlaceBet(pos,i) 
    }
    await BigSmallSBFunc.verifyBetPosStake(pos,1866)
  }) 
 
 it('TC_07_Full_Verify User can bet all specific', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
   let _chip = 1
   let _Aspecific = ['Specific1','Specific2','Specific3','Specific4','Specific5','Specific6']
   for (let i of _Aspecific) {
        await BigSmallSBFunc.PlaceBet(i,_chip) 
        await BigSmallSBFunc.verifyBetPosStake(i,_chip)
      } 
    // Wait for settle
   await BigSmallSBFunc.getSettlementResult() 
}) 


it('TC_08_1_Full_Verify User can bet all total score', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  let _chip = 1
  let _Aspecific = ['Total4','Total5','Total6','Total7','Total8','Total9','Total10']
  for (let i of _Aspecific) {
       await BigSmallSBFunc.PlaceBet(i,_chip) 
       await BigSmallSBFunc.verifyBetPosStake(i,_chip)
     } 
   // Wait for settle
   await BigSmallSBFunc.getSettlementResult()  
}) 

it('TC_08_2_Full_Verify User can bet all total score', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  let _chip = 1
  let _Aspecific = ['Total11','Total12','Total13','Total14','Total15','Total16','Total17']
  for (let i of _Aspecific) {
       await BigSmallSBFunc.PlaceBet(i,_chip) 
       await BigSmallSBFunc.verifyBetPosStake(i,_chip)
     } 
   // Wait for settle
   await BigSmallSBFunc.getSettlementResult()  
})

it('TC_09_Full_Verify User can bet all choice', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  let _chip = 1
  let _Aspecific = ['Big','Small','AnyTriple']
  for (let i of _Aspecific) {
       await BigSmallSBFunc.PlaceBet(i,_chip) 
       await BigSmallSBFunc.verifyBetPosStake(i,_chip)
     } 
  // Wait for settle
  await BigSmallSBFunc.getSettlementResult()  
}) 

it('TC_10_Full_Verify Settlement Big', async () => {
  await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Big',50])
})  

it('TC_11_Full_Verify Settlement Small', async () => {
  await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Small',50])
})  

it('TC_12_Full_Verify Settlement AnyTriple', async () => {
  await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['AnyTriple',50])
})  

it('TC_13_Full_Verify Settlement Specific1', async () => {
  await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Specific1',50])
})  

it('TC_14_Full_Verify Settlement Total4', async () => {
  await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Total4',50])
}) 

it('TC_15_Full_Verify Maxbet 2k', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  let maxbet = 2000
  const errormsg = `"errorCode":"SB1910","maxBet":2000`
  let _Aspecific = ['Specific1','Specific2','Specific3','Specific4','Specific5','Specific6','Big','Small']
  for (let i of _Aspecific) {
        await BigSmallSBFunc.PlaceBet(i,maxbet) 
        await BigSmallSBFunc.PlaceBet(i,1,'nowait') 
        await BigSmallSBFunc.VerifyErrorMessage(errormsg)
        // Wait for settle
        await BigSmallSBFunc.getSettlementResult() 
        await utils.sleep(5000)
     } 
}) 

it('TC_16_Full_Verify Max bet 100', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  let maxbet = 500
  await BigSmallSBFunc.PlaceBet('Big',1) 
  let errormsg = '"errorCode":"SB1910","maxBet":100'
  let _Aspecific = ['AnyTriple','Total4','Total5','Total6','Total7','Total14','Total15','Total16','Total17']
  for (let i of _Aspecific) {
        await BigSmallSBFunc.PlaceBet(i,maxbet,'nowait') 
        await BigSmallSBFunc.VerifyErrorMessage(errormsg)
      }  
   // Wait for settle
  let settleresult = await BigSmallSBFunc.getSettlementResult() 
  //Check history
  await BigSmallSBFunc.CheckRoundHistory(settleresult)
}) 

it('TC_02_Full_Smoke_Verify History Content', async () => {
  await BigSmallSBFunc.VerifyHistoryContent()
})  

it('TC_03_Full_Verify Guide Content', async () => {
await BigSmallSBFunc.VerifyGuideContent()
})  

it('TC_04_Full_Verify Valid betting time', async () => {
await utils.verifyBettingTime(game)
})  

it('TC_05_Full_Verify Block betting time', async () => {
await utils.verifyBlockTime(game,BigSmallSBFunc.PlaceBet,['Big',1,'nowait'])
})  

it('TC_21_Smoke_Verify User can bet all specific', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  await utils.sleep(1000)
   let _chip = 1
   let _Aspecific = ['Specific1','Specific2','Specific3','Specific4','Specific5','Specific6','Total8','Total9','Total10','Total11','Total12','Total13','Big','Small','AnyTriple','Total4','Total5','Total6','Total7','Total14','Total15','Total16','Total17']
  //Select Chip
  await BigSmallSBFunc.Sliding_Select_Chip(_chip)
  //Select bet choice
   for (let i of _Aspecific) {
        await utils.clickPos(BigSmallSicboLocator[i].x,BigSmallSicboLocator[i].y)
        await utils.sleep(200)
      } 
    // Wait for settle
   await BigSmallSBFunc.getSettlementResult() 
}) 
 
it('TC_17_Full_Verify Max bet 500', async () => {
  await BigSmallSBFunc.waitUtilNewRound()
  let maxbet = 1000
  await BigSmallSBFunc.PlaceBet('Big',5) 
  let errormsg = '"errorCode":"SB1910","maxBet":500'
  let _Aspecific = ['Total8','Total9','Total10','Total11','Total12','Total13']
  for (let i of _Aspecific) {
        await BigSmallSBFunc.PlaceBet(i,maxbet,'nowait') 
        await BigSmallSBFunc.VerifyErrorMessage(errormsg)
      }  
  let settleresult = await BigSmallSBFunc.getSettlementResult() 
  //Check history
  await BigSmallSBFunc.CheckRoundHistory(settleresult)
  //exit Sicbo
  await BigSmallSBFunc.CloseGame()
  await GameLobbyFunc.openResultPage()
  await ResultFunc.BigSmallSicbo.verifyResult(settleresult)
}) 
 
it('TC_18_Full_Verify searching an invalid roundid', async() =>{
  await GameLobbyFunc.openResultPage()
  await ResultFunc.BigSmallSicbo.verifyInvalidRoundID()
})

it('TC_19_Full_Verify searching an archived roundid', async() =>{
  await GameLobbyFunc.openResultPage()
  await ResultFunc.BigSmallSicbo.verifyArchivedRoundID()
})

it('TC_20_Full_Verify searching with roundid =0', async()=>{
  await GameLobbyFunc.openResultPage()
  await ResultFunc.BigSmallSicbo.verifyRoundID0()
})

})

