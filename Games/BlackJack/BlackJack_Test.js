const game = "BlackJack"
const addContext = require('mochawesome/addContext')
import { dir } from 'console'
import * as utils from '../../util/utils'
import * as BlackJackFunc from '../BlackJack/BlackJack_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
import {BlackJackLocator} from './BlackJack_Locator'
var jp = require('jsonpath');

const path = require('path')


describe('BlackJack Game', ()=>{

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

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await GameLobbyFunc.OpenGameFromLobby(game)
    await BlackJackFunc.VerifySignInSuccessfully()
  })  


//  it('TC_02_Full_Smoke_Verify text in table Game name,odds and dealer hitting rule', async () => {
//     await BlackJackFunc.VerifyDealerContent()
//     })  

//  it('TC_03_Full_Smoke_Verify History ', async () => {
//     await BlackJackFunc.OpenHistory()
//    //Expected: Clicking on it to open icon menu: Home, History, Guide icons
//     await BlackJackFunc.VerifyHistoryContent()
//     await BlackJackFunc.CloseHistory()
//     })  

//   it('TC_04_Full_Smoke_Verify Guide', async () => {
//     await BlackJackFunc.OpenGuide()
//     await BlackJackFunc.VerifyGuideContent()
//     await BlackJackFunc.CloseGuide()
//     })  

  // it('TC_05_Full_Smoke_Verify Default State', async () => {
  //     await BlackJackFunc.PlaceBet(1,'Pos3')
  //     await BlackJackFunc.ClickCancel()
  //     await utils.sleep(500)
  //     await BlackJackFunc.VerifyDefaultState()
  //     await BlackJackFunc.PlaceBet(50,'Pos2')
  //     await BlackJackFunc.ReturnHome()
  //     await GameLobbyFunc.OpenGameFromLobby(game)
  //     await BlackJackFunc.VerifyDefaultState()
      
  //   })  

  // it('TC_06_Full_Smoke_Verify PlaceBet all Chips to  Pos1', async () => {
  //       const AStake = ['Stake1','Stake5','Stake10','Stake50','Stake100','Stake200','Stake500','Stake1k','Stake2k']
  //       let pos = 'Pos1'
  //       for (let i in AStake){
  //         await utils.sleep(500)
  //         await BlackJackFunc.SelectPos(pos)
  //         await utils.sleep(500)
  //         await BlackJackFunc.VerifyPosStake(pos,AStake[i])
  //         await BlackJackFunc.VerifyBetBlance(AStake[i])
  //         await utils.clickPos(BlackJackLocator.RightArrow.x,BlackJackLocator.RightArrow.y)
  //         await utils.sleep(500)
  //         await BlackJackFunc.CancelBet(pos)
  //       }
  //       await utils.sleep(1000)
  //       await BlackJackFunc.Sliding_Select_Chip(1)
        
  //   })  
        
  //   it('TC_07_Full_Smoke_Verify PlaceBet all Chips to Pos2', async () => {
  //     const AStake = ['Stake1','Stake5','Stake10','Stake50','Stake100','Stake200','Stake500','Stake1k','Stake2k']
  //     let pos = 'Pos2'
  //     for (let i in AStake){
  //       await utils.sleep(500)
  //       await BlackJackFunc.SelectPos(pos)
  //       await utils.sleep(500)
  //       await BlackJackFunc.VerifyPosStake(pos,AStake[i])
  //       await BlackJackFunc.VerifyBetBlance(AStake[i])
  //       await BlackJackFunc.VerifyChipColor_Pos2(AStake[i])
  //       await utils.clickPos(BlackJackLocator.RightArrow.x,BlackJackLocator.RightArrow.y)
  //       await utils.sleep(500)
  //       await BlackJackFunc.CancelBet(pos)
  //     }
  //     await utils.sleep(1000)
  //     await BlackJackFunc.Sliding_Select_Chip(1)
      
  // }) 
    
//   it('TC_08_Full_Smoke_Verify PlaceBet all Chips to Pos3', async () => {
//     const AStake = ['Stake1','Stake5','Stake10','Stake50','Stake100','Stake200','Stake500','Stake1k','Stake2k']
//     let pos = 'Pos3'
//     for (let i in AStake){
//       await utils.sleep(500)
//       await BlackJackFunc.SelectPos(pos)
//       await utils.sleep(500)
//       await BlackJackFunc.VerifyPosStake(pos,AStake[i])
//       await BlackJackFunc.VerifyBetBlance(AStake[i])
//       await utils.clickPos(BlackJackLocator.RightArrow.x,BlackJackLocator.RightArrow.y)
//       await utils.sleep(500)
//       await BlackJackFunc.CancelBet(pos)
//     }
//     await utils.sleep(1000)
//     await BlackJackFunc.Sliding_Select_Chip(1)
    
// })  

  it('TC_09_Full_Smoke_Get Bet ID', async () => {
      await BlackJackFunc.PlaceBet(1,'Pos1')
      await BlackJackFunc.PlaceBet(5,'Pos2')
      await BlackJackFunc.PlaceBet(200,'Pos3')
      await BlackJackFunc.ClickDeal()
      await utils.sleep(3000)
      const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"deal'));
      var res = String(_found).split("42/user/blackjack,");
      var obj = JSON.parse(res[1]);
      //console.log(obj[0])
      //console.log(obj[1])
      const testjsp = jp.query(obj[1], '$..hands[?(@.pos==1)]');
      const  testjsp1 = JSON.parse(testjsp)
      //console.log(jp.query(JSON.parse(res[1]),'$..hands[?(@.pos=="1")])'))
      console.log(testjsp1.id)
      // console.log(testjsp.pos)
      // console.log(testjsp.total)

      //    console.log(obj); 
      // console.log(obj[1]); 
      //console.log(_found.deal.hands[0].total)
      //console.log(wsMessageReceived)
      //console.log(_found)
      //let chk = JSON.parse(_found)
      //console.log(_found)


    })  

})

