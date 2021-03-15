const game = "BlackJack"
const addContext = require('mochawesome/addContext')
import { dir } from 'console'
import * as utils from '../../util/utils'
import * as BlackJackFunc from '../BlackJack/BlackJack_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
import {BlackJackLocator} from './BlackJack_Locator'

describe('BlackJack Game', ()=>{

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

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await GameLobbyFunc.OpenGameFromLobby(game)
    await BlackJackFunc.VerifySignInSuccessfully()
  })  


 it('TC_02_Full_Smoke_Verify text in table Game name,odds and dealer hitting rule', async () => {
    await BlackJackFunc.VerifyDealerContent()
    })  

 it('TC_03_Full_Smoke_Verify History ', async () => {
    await BlackJackFunc.OpenHistory()
   //Expected: Clicking on it to open icon menu: Home, History, Guide icons
    await BlackJackFunc.VerifyHistoryContent()
    await BlackJackFunc.CloseHistory()
    })  

  it('TC_04_Full_Smoke_Verify Guide', async () => {
    await BlackJackFunc.OpenGuide()
    await BlackJackFunc.VerifyGuideContent()
    await BlackJackFunc.CloseGuide()
    })  

  it('TC_05_Full_Smoke_Verify Default State', async () => {
      await BlackJackFunc.PlaceBet(1,'Pos3')
      await BlackJackFunc.ClickCancel()
      await utils.sleep(500)
      await BlackJackFunc.VerifyDefaultState()
      await BlackJackFunc.PlaceBet(50,'Pos2')
      await BlackJackFunc.ReturnHome()
      await GameLobbyFunc.OpenGameFromLobby(game)
      await BlackJackFunc.VerifyDefaultState()
      
    })  

  it('TC_06_Full_Smoke_Verify PlaceBet all Chips to  Pos1', async () => {
        const AStake = ['Stake1','Stake5','Stake10','Stake50','Stake100','Stake200','Stake500','Stake1k','Stake2k']
        let pos = 'Pos1'
        for (let i in AStake){
          await utils.sleep(500)
          await BlackJackFunc.SelectPos(pos)
          await utils.sleep(500)
          await BlackJackFunc.VerifyPosStake(pos,AStake[i])
          await BlackJackFunc.VerifyBetBlance(AStake[i])
          await utils.clickPos(BlackJackLocator.RightArrow.x,BlackJackLocator.RightArrow.y)
          await utils.sleep(500)
          await BlackJackFunc.CancelBet(pos)
        }
        await utils.sleep(500)
        await BlackJackFunc.Sliding_Select_Chip(1)
        
    })  
        
    it('TC_07_Full_Smoke_Verify PlaceBet all Chips to Pos2', async () => {
      const AStake = ['Stake1','Stake5','Stake10','Stake50','Stake100','Stake200','Stake500','Stake1k','Stake2k']
      let pos = 'Pos2'
      for (let i in AStake){
        await utils.sleep(500)
        await BlackJackFunc.SelectPos(pos)
        await utils.sleep(500)
        await BlackJackFunc.VerifyPosStake(pos,AStake[i])
        await BlackJackFunc.VerifyBetBlance(AStake[i])
        await BlackJackFunc.VerifyChipColor_Pos2(AStake[i])
        await utils.clickPos(BlackJackLocator.RightArrow.x,BlackJackLocator.RightArrow.y)
        await utils.sleep(500)
        await BlackJackFunc.CancelBet(pos)
      }
      await utils.sleep(5000)
      await BlackJackFunc.Sliding_Select_Chip(1)
      
  }) 
    
  it('TC_08_Full_Smoke_Verify PlaceBet all Chips to Pos3', async () => {
    const AStake = ['Stake1','Stake5','Stake10','Stake50','Stake100','Stake200','Stake500','Stake1k','Stake2k']
    let pos = 'Pos3'
    for (let i in AStake){
      await utils.sleep(500)
      await BlackJackFunc.SelectPos(pos)
      await utils.sleep(500)
      await BlackJackFunc.VerifyPosStake(pos,AStake[i])
      await BlackJackFunc.VerifyBetBlance(AStake[i])
      await utils.clickPos(BlackJackLocator.RightArrow.x,BlackJackLocator.RightArrow.y)
      await utils.sleep(500)
      await BlackJackFunc.CancelBet(pos)
    }
    await utils.sleep(500)
    await BlackJackFunc.Sliding_Select_Chip(1)
    
})  

     it('TC_09_Full_Smoke_Verify User Can Betting SingleHand-HitToQuizzed', async () => {
      let pos = 'Pos1'
      let betstake = 1
      //Place bet
      await BlackJackFunc.PlaceBet(betstake,pos)
      await BlackJackFunc.ClickDeal()
      //// User can not place bet after confirmed
      await BlackJackFunc.PlaceBet(betstake,pos)
      await utils.sleep(1000)
      // Verify totalbet
      const totalbet = await BlackJackFunc.GetTotalBetAmount()
      await utils.shouldBeEqual(totalbet,betstake)
      // Get Current Balance
      let DealBalance =await BlackJackFunc.GetDealBalance()
      // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      // Hit to Quizzed
      await BlackJackFunc.BetSettle_HitToQuizzed(1)
      let wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)     
      let UIBalance = await BlackJackFunc.GetBJUIBalance()
      console.log(DealBalance,UIBalance)
     //Check Current Balance After Settled
      // if (wlpos1 !=0){
      //   await utils.shouldBeEqual(UIBalance,DealBalance + wlpos1)
      //   }
      // else {
      //   await utils.shouldBeEqual(UIBalance,DealBalance)
      // }  
    })

    it('TC_10_Full_Smoke_Verify User Can Betting SingleHand-Hit Card Score OVer 15', async () => {
      let pos = 'Pos1'
      let betstake = 10
      //Place bet 
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake,pos)
      await BlackJackFunc.ClickDeal()
      // Get Current Balance
      let DealBalance =await BlackJackFunc.GetDealBalance()
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
          // Hit score over 15
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      let UIBalance = await BlackJackFunc.GetBJUIBalance()
      console.log(DealBalance,UIBalance)
      // if (wlpos1 !=0){
      //   await utils.shouldBeEqual(UIBalance,DealBalance + wlpos1)
      //   }
      // else {
      //   await utils.shouldBeEqual(UIBalance,DealBalance)
      // }  
    })

    it('TC_11_Full_Smoke_Verify User Can Betting Double Hands-Hit Card Score OVer 15', async () => {
      let pos1 = 'Pos1'
      let pos2 = 'Pos2'
      let betstake = 10
      //Place bet 500
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake,pos1)
      await BlackJackFunc.PlaceBet(betstake,pos2)
      await BlackJackFunc.ClickDeal()
      // Get Current Balance
      let DealBalance =await BlackJackFunc.GetDealBalance()
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      const pos2id = await BlackJackFunc.GetPosId(2)
          // Hit score over 15
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const wlpos2 = await BlackJackFunc.GetWinlossPosID(pos2id)
      // let UIBalance = await BlackJackFunc.GetBJUIBalance()
      // const finalwl = (wlpos1 +wlpos2)
      // if (finalwl !=0){
      //   await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
      //   }
      // else {
      //   await utils.shouldBeEqual(UIBalance,DealBalance)
      // } 
    })

    it('TC_12_Full_Smoke_Verify User Can Betting Double Hands-HitToQuizzed', async () => {
      let pos1 = 'Pos1'
      let pos2 = 'Pos2'
      let betstake = 1
      //Place bet 500
     // await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake,pos1)
      await BlackJackFunc.PlaceBet(betstake,pos2)
      await BlackJackFunc.ClickDeal()
      // Get Current Balance
      let DealBalance =await BlackJackFunc.GetDealBalance()
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      const pos2id = await BlackJackFunc.GetPosId(2)
          // Hit score over 15
      await BlackJackFunc.BetSettle_HitToQuizzed(1)
      await BlackJackFunc.BetSettle_HitToQuizzed(2)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const wlpos2 = await BlackJackFunc.GetWinlossPosID(pos2id)
      // let UIBalance = await BlackJackFunc.GetBJUIBalance()
      // const finalwl = (wlpos1 +wlpos2)
      // if (finalwl !=0){
      //   await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
      //   }
      // else {
      //   await utils.shouldBeEqual(UIBalance,DealBalance)
      // } 
    })

    it('TC_13_Full_Smoke_Verify User Can Betting Triple Hands-Hit Card Score OVer 15', async () => {
      let pos1 = 'Pos1'
      let pos2 = 'Pos2'
      let pos3 = 'Pos3'
      let betstake = 5
      //Place bet 500
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake,pos1)
      await BlackJackFunc.PlaceBet(betstake,pos2)
      await BlackJackFunc.PlaceBet(betstake,pos3)
      await BlackJackFunc.ClickDeal()
      // Get Current Balance
      let DealBalance =await BlackJackFunc.GetDealBalance()
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      const pos2id = await BlackJackFunc.GetPosId(2)
      const pos3id = await BlackJackFunc.GetPosId(3)
      // id order rule : pos1 < pos2 < pos3
      await utils.shouldBeEqual(pos1id+1,pos2id)
      await utils.shouldBeEqual(pos2id+1,pos3id)
      // Hit score over 15
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(3)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const wlpos2 = await BlackJackFunc.GetWinlossPosID(pos2id)
      const wlpos3 = await BlackJackFunc.GetWinlossPosID(pos3id)
      const finalwl = (wlpos1 +wlpos2+ wlpos3)
      // let UIBalance = await BlackJackFunc.GetBJUIBalance()
      //  if (finalwl !=0){
      //   await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
      //   }
      // else {
      //   await utils.shouldBeEqual(UIBalance,DealBalance)
      // } 
    })
    
    it('TC_14_Full_Smoke_Verify User Can Betting Triple Hands-HitToQuizzed', async () => {
      let pos1 = 'Pos1'
      let pos2 = 'Pos2'
      let pos3 = 'Pos3'
      let betstake = 1
      //Place bet 500
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake,pos1)
      await BlackJackFunc.PlaceBet(betstake,pos2)
      await BlackJackFunc.PlaceBet(betstake,pos3)
      await BlackJackFunc.ClickDeal()
      // Get Current Balance
      let DealBalance =await BlackJackFunc.GetDealBalance()
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      const pos2id = await BlackJackFunc.GetPosId(2)
      const pos3id = await BlackJackFunc.GetPosId(3)
      // Hit to Quizzed
      await BlackJackFunc.BetSettle_HitToQuizzed(1)
      await BlackJackFunc.BetSettle_HitToQuizzed(2)
      await BlackJackFunc.BetSettle_HitToQuizzed(3)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const wlpos2 = await BlackJackFunc.GetWinlossPosID(pos2id)
      const wlpos3 = await BlackJackFunc.GetWinlossPosID(pos3id)
      const finalwl = (wlpos1 +wlpos2+ wlpos3)
    //   let UIBalance = await BlackJackFunc.GetBJUIBalance()
    //   if (finalwl !=0){
    //    await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
    //    }
    //  else {
    //    await utils.shouldBeEqual(UIBalance,DealBalance)
    //  } 
    })

    it('TC_15_Full_Smoke_Verify Maxbet Of Single Hand', async () => {
      const pos1 = 'Pos1'
      const betstake1 = 500
      const betstake2 = 1000
      const maxbet =2000 
      //Place max bet 
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake1,pos1)
      await BlackJackFunc.PlaceBet(betstake1,pos1)
      await BlackJackFunc.PlaceBet(betstake2,pos1)
      await BlackJackFunc.PlaceBet(betstake2,pos1)
      await BlackJackFunc.ClickDeal()
      // Get Current Balance
      let totalbet =await BlackJackFunc.GetTotalBetAmount()
      await utils.shouldBeEqual(totalbet,maxbet)
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      // Hit to Quizzed
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const finalwl = (wlpos1)
    //   let UIBalance = await BlackJackFunc.GetBJUIBalance()
    //   if (finalwl !=0){
    //    await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
    //    }
    //  else {
    //    await utils.shouldBeEqual(UIBalance,DealBalance)
    //  } 
    })

    it('TC_16_Full_Smoke_Verify Maxbet Of Double Hands', async () => {
      const pos1 = 'Pos1'
      const pos2= 'Pos2'
      const betstake1 = 1000
      const betstake2 = 2000
      const maxbet =4000 
      //Place max bet
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake2,pos1)
      await BlackJackFunc.PlaceBet(betstake2,pos2)
      await BlackJackFunc.PlaceBet(betstake1,pos1)
      await BlackJackFunc.PlaceBet(betstake1,pos2)
      await BlackJackFunc.ClickDeal()
      // Get Total Bet and pos bet
      let totalbet =await BlackJackFunc.GetTotalBetAmount()
      let pos1bet = await BlackJackFunc.GetPosBet(1)
      let pos2bet = await BlackJackFunc.GetPosBet(2)
      await utils.shouldBeEqual(totalbet,maxbet)
      await utils.shouldBeEqual(pos1bet,betstake2)
      await utils.shouldBeEqual(pos2bet,betstake2)
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      const pos2id = await BlackJackFunc.GetPosId(2)
      // HSettle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const wlpos2 = await BlackJackFunc.GetWinlossPosID(pos2id)
      const finalwl = (wlpos1 +wlpos2)
    //   let UIBalance = await BlackJackFunc.GetBJUIBalance()
    //   if (finalwl !=0){
    //    await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
    //    }
    //  else {
    //    await utils.shouldBeEqual(UIBalance,DealBalance)
    //  } 
    })

    it('TC_17_Full_Smoke_Verify Maxbet Of Triple Hands', async () => {
      const pos1 = 'Pos1'
      const pos2 = 'Pos2'
      const pos3 = 'Pos3'
      const betstake1 = 1000
      const betstake2 = 2000
      const maxbet =6000 
      //Place max bet
     await BlackJackFunc.NewRound()
     await BlackJackFunc.PlaceBet(betstake2,pos1)
     await BlackJackFunc.PlaceBet(betstake2,pos2)
     await BlackJackFunc.PlaceBet(betstake2,pos3)
     await BlackJackFunc.PlaceBet(betstake1,pos1)
     await BlackJackFunc.PlaceBet(betstake1,pos2)
     await BlackJackFunc.PlaceBet(betstake1,pos3)
     await BlackJackFunc.ClickDeal()
       // Get Total Bet and pos bet
      let totalbet =await BlackJackFunc.GetTotalBetAmount()
      let pos1bet = await BlackJackFunc.GetPosBet(1)
      let pos2bet = await BlackJackFunc.GetPosBet(2)
      let pos3bet = await BlackJackFunc.GetPosBet(2)
      await utils.shouldBeEqual(totalbet,maxbet)
      await utils.shouldBeEqual(pos1bet,betstake2)
      await utils.shouldBeEqual(pos2bet,betstake2)
      await utils.shouldBeEqual(pos3bet,betstake2)
       // Get PosId
      const pos1id = await BlackJackFunc.GetPosId(1)
      const pos2id = await BlackJackFunc.GetPosId(2)
      const pos3id = await BlackJackFunc.GetPosId(3)
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(3)
      const wlpos1 = await BlackJackFunc.GetWinlossPosID(pos1id)
      const wlpos2 = await BlackJackFunc.GetWinlossPosID(pos2id)
      const wlpos3 = await BlackJackFunc.GetWinlossPosID(pos3id)
      const finalwl = (wlpos1 + wlpos2+ wlpos3)
    //   let UIBalance = await BlackJackFunc.GetBJUIBalance()
    //   if (finalwl !=0){
    //    await utils.shouldBeEqual(UIBalance,DealBalance + finalwl)
    //    }
    //  else {
    //    await utils.shouldBeEqual(UIBalance,DealBalance)
    //  } 
    })

       it('TC_18_Full_Smoke_Verify Re-bet Of Single Hand', async () => {
      const pos1 = 'Pos1'
      const betstake1 = 1
      const maxbet = 1
        //Place max bet 
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake1,pos1)
      await BlackJackFunc.ClickDeal()
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.Rebet()
      let totalbet =await BlackJackFunc.GetTotalBetAmount()
      await utils.shouldBeEqual(totalbet,maxbet)
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await utils.sleep(2000)
    })

    it('TC_19_Full_Smoke_Verify Re-bet Of Double Hands', async () => {
      const pos1 = 'Pos1'
      const pos2 = 'Pos2'
      const betstake1 = 1
      const maxbet = 2
        //Place max bet 
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake1,pos1)
      await BlackJackFunc.PlaceBet(betstake1,pos2)
      await BlackJackFunc.ClickDeal()
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      await BlackJackFunc.Rebet()
      let totalbet =await BlackJackFunc.GetTotalBetAmount()
      await utils.shouldBeEqual(totalbet,maxbet)
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
    })

    it('TC_20_Full_Smoke_Verify Re-bet Of Triple Hands', async () => {
      const pos1 = 'Pos1'
      const pos2 = 'Pos2'
      const pos3 = 'Pos3'
      const betstake1 = 1
      const maxbet = 3
        //Place max bet 
      await BlackJackFunc.NewRound()
      await BlackJackFunc.PlaceBet(betstake1,pos1)
      await BlackJackFunc.PlaceBet(betstake1,pos2)
      await BlackJackFunc.PlaceBet(betstake1,pos3)
      await BlackJackFunc.ClickDeal()
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(3)
      await BlackJackFunc.Rebet()
      let totalbet =await BlackJackFunc.GetTotalBetAmount()
      await utils.shouldBeEqual(totalbet,maxbet)
      // Settle
      await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(2)
      await BlackJackFunc.BetSettle_HitCardUntilOver15(3)
    })

    it('TC_21_Full_Smoke_Verify Close Game Success', async () => {
      await BlackJackFunc.ReturnHome()
    }) 


})

