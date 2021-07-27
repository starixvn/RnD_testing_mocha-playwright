const game = "FourGuardians"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as FourGuardiansFunc from './FourGuardians_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'

describe('FourGuardians Game', ()=>{

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

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await FourGuardiansFunc.VerifySignInSuccessfully()
  })  

  it('TC_02_Full_Smoke_Verify History Content', async () => {
      await FourGuardiansFunc.VerifyHistoryContent()
  })  

  it('TC_03_Full_Smoke_Verify Guide Content', async () => {
    await FourGuardiansFunc.VerifyGuideContent()
  })  

  it('TC_04_Full_Smoke_Verify Left Right payline', async () => {
    await FourGuardiansFunc.VerifyRightPayline()
    await FourGuardiansFunc.VerifyLeftPayline()
  })  

  it('TC_05_Full_Smoke_Verify payline Detail Default', async () => {
    await FourGuardiansFunc.VerifyPaylineDetail()
  }) 
  
  it('TC_06_Full_Smoke_Verify payline Detail Odd', async () => {
    await FourGuardiansFunc.VerifyPaylinelOdd()
  })  

  it('TC_07_Full_Smoke_Verify payline Detail Even', async () => {
    await FourGuardiansFunc.VerifyPaylineEven()
  })  

  it('TC_08_Full_Smoke_Verify payline Detail All', async () => {
    await FourGuardiansFunc.VerifyPaylineAll()
  })  

  // it('TC_09_Full_Smoke_Verify payline Detail All', async () => {
  //   for(let i=1; i<=24; i++){
  //     let temp = 'L'+i
  //     await FourGuardiansFunc.checkSettlement(FourGuardiansFunc.PlaceBet,[temp,1])
  //   }
  // })  

//   it('TC_06_Full_Smoke_Verify bet chips', async () => {
//     let pos = "Big"
//     let chips = [1,5,10,50,100,200,500,1000]
//     for (let i of chips) {
//       await BigSmallSBFunc.PlaceBet(pos,i) 
//     }
//     await BigSmallSBFunc.verifyBetPosStake(pos,1866)
//   }) 
 
//  it('TC_07_Full_Smoke Verify User can bet all specific', async () => {
//    let _chip = 1
//    let _Aspecific = ['Specific1','Specific2','Specific3','Specific4','Specific5','Specific6']
//    for (let i of _Aspecific) {
//         await BigSmallSBFunc.PlaceBet(i,_chip) 
//         await BigSmallSBFunc.verifyBetPosStake(i,_chip)
//       } 
//     // Wait for settle
//    await BigSmallSBFunc.getSettlementResult() 
// }) 


// it('TC_08_Full_Smoke Verify User can bet all total score', async () => {
//   let _chip = 1
//   let _Aspecific = ['Total4','Total5','Total6','Total7','Total8','Total9','Total10','Total11','Total12','Total13','Total14','Total15','Total16','Total17']
//   for (let i of _Aspecific) {
//        await BigSmallSBFunc.PlaceBet(i,_chip) 
//        await BigSmallSBFunc.verifyBetPosStake(i,_chip)
//      } 
//    // Wait for settle
//    await BigSmallSBFunc.getSettlementResult()  
// }) 

// it('TC_09_Full_Smoke Verify User can bet all choice', async () => {
//   let _chip = 1
//   let _Aspecific = ['Big','Small','AnyTriple']
//   for (let i of _Aspecific) {
//        await BigSmallSBFunc.PlaceBet(i,_chip) 
//        await BigSmallSBFunc.verifyBetPosStake(i,_chip)
//      } 
//   // Wait for settle
//   await BigSmallSBFunc.getSettlementResult()  
// }) 

// it('TC_10_Full_Verify Settlement Big', async () => {
//   await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Big',50])
// })  

// it('TC_11_Full_Verify Settlement Small', async () => {
//   await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Small',50])
// })  

// it('TC_12_Full_Verify Settlement AnyTriple', async () => {
//   await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['AnyTriple',50])
// })  

// it('TC_13_Full_Verify Settlement Specific1', async () => {
//   await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Specific1',50])
// })  

// it('TC_14_Full_Verify Settlement Total4', async () => {
//   await BigSmallSBFunc.checkSettlement(BigSmallSBFunc.PlaceBet,['Total4',50])
// }) 

// it('TC_15_Full_Smoke Verify Maxbet 2k', async () => {
//   let maxbet = 2000
//   let errormsg = 'Tiền cược tối đa ở cửa này là 2,000'
//   let _Aspecific = ['Specific1','Specific2','Specific3','Specific4','Specific5','Specific6','Big','Small']
//   for (let i of _Aspecific) {
//         await BigSmallSBFunc.PlaceBet(i,maxbet) 
//         await BigSmallSBFunc.PlaceBet(i,1,'nowait') 
//         await BigSmallSBFunc.VerifyErrorMessage(errormsg)
//         // Wait for settle
//         await BigSmallSBFunc.getSettlementResult() 
//         await utils.sleep(5000)
//      } 
// }) 


// it('TC_16_Full_Smoke Verify Max bet 100', async () => {
//   let maxbet = 500
//   await BigSmallSBFunc.PlaceBet('Big',1) 
//   let errormsg = 'Tiền cược tối đa ở cửa này là 100'
//   let _Aspecific = ['AnyTriple','Total4','Total5','Total6','Total7','Total14','Total15','Total16','Total17']
//   for (let i of _Aspecific) {
//         await BigSmallSBFunc.PlaceBet(i,maxbet,'nowait') 
//         await BigSmallSBFunc.VerifyErrorMessage(errormsg)
//       }  
//    // Wait for settle
//   let settleresult = await BigSmallSBFunc.getSettlementResult() 
//   //Check history
//   await BigSmallSBFunc.CheckRoundHistory(settleresult)
// }) 
 
// it('TC_17_Full_Smoke Verify Max bet 500', async () => {
//   let maxbet = 1000
//   await BigSmallSBFunc.PlaceBet('Big',5) 
//   let errormsg = 'Tiền cược tối đa ở cửa này là 500'
//   let _Aspecific = ['Total8','Total9','Total10','Total11','Total12','Total13']
//   for (let i of _Aspecific) {
//         await BigSmallSBFunc.PlaceBet(i,maxbet,'nowait') 
//         await BigSmallSBFunc.VerifyErrorMessage(errormsg)
//       }  
//   let settleresult = await BigSmallSBFunc.getSettlementResult() 
//   //Check history
//   await BigSmallSBFunc.CheckRoundHistory(settleresult)
//   //exit Sicbo
//   await BigSmallSBFunc.CloseGame()
//   await GameLobbyFunc.openResultPage()
//   await ResultFunc.BigSmallSicbo.verifyResult(settleresult)
// }) 
 
// it('TC_18_Full_Smoke_Verify searching an invalid roundid', async() =>{
//   await GameLobbyFunc.openResultPage()
//   await ResultFunc.BigSmallSicbo.verifyInvalidRoundID()
// })

// it('TC_19_Full_Smoke_Verify searching an archived roundid', async() =>{
//   await GameLobbyFunc.openResultPage()
//   await ResultFunc.BigSmallSicbo.verifyArchivedRoundID()
// })

// it('TC_20_Full_Smoke_Verify searching with roundid =0', async()=>{
//   await GameLobbyFunc.openResultPage()
//   await ResultFunc.BigSmallSicbo.verifyRoundID0()
// })

})

