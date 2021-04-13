const game = "TurboOddEven"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as TurboOddEvenFunc from '../TurboOddEven/TurboOddEven_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
import * as ResultFunc from '../Result_Function'
import {TurboOddEvenLocator} from './TurboOddEven_Locator'

describe('TurboOddEven Game', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
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
    await TurboOddEvenFunc.VerifySignInSuccessfully()

  })  

  it('TC_02_Full_Smoke_Verify History Content', async () => {
    await TurboOddEvenFunc.OpenHistory()
    await TurboOddEvenFunc.VerifyHistoryContent()
    await TurboOddEvenFunc.CloseHistory()
  })  

  it('TC_03_Full_Smoke_Verify Guide Content', async () => {
    await TurboOddEvenFunc.OpenGuide()
    await TurboOddEvenFunc.VerifyGuideContent()
    await TurboOddEvenFunc.CloseGuide()
  })  

  it('TC_04_Full_Smoke_Verify Statistic Content', async () => {
    await TurboOddEvenFunc.OpenStatistic()
    await TurboOddEvenFunc.VerifyStatisticContent()
    await TurboOddEvenFunc.CloseStatistic()
    await utils.verifyBettingTime(game)
  })  

  it('TC_05_Full_Smoke_Verify Preset Content', async () => {
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.VerifyPresetContent()
    await TurboOddEvenFunc.ClosePreset()
    await utils.verifyBlockTime(game,TurboOddEvenFunc.PlaceBet,['Odd',1,'nowait'])

  })  

  it('TC_06_Full_Smoke_Verify Max Bet on Odd', async () => {
    const pos = "Odd"
    const errormsg = 'Tổng tiền cược tối đa ở phiên này là 2,000'
   await TurboOddEvenFunc.PlaceBet(pos,1000)
   await TurboOddEvenFunc.PlaceBet(pos,1000)
   await TurboOddEvenFunc.PlaceBet(pos,5,'nowait')
   await TurboOddEvenFunc.VerifyErrorMessage(errormsg)
   await TurboOddEvenFunc.CheckSettleBalance()
   await TurboOddEvenFunc.CheckRoundHistory()
 }) 
 
 it('TC_07_Full_Verify Max Bet on Even', async () => { 
   const pos = "Even"
   const errormsg = 'Tổng tiền cược tối đa ở phiên này là 2,000'
  await TurboOddEvenFunc.PlaceBet(pos,1000)
  await TurboOddEvenFunc.PlaceBet(pos,1000)
  await TurboOddEvenFunc.PlaceBet(pos,5,'nowait')
  await TurboOddEvenFunc.VerifyErrorMessage(errormsg)
  await TurboOddEvenFunc.CheckSettleBalance()
}) 

  it('TC_08_Full_Verify User Can Only Bet on 1 Pos-Odd', async () => {   
     const pos = "Odd"
     const errormsg = 'Chỉ được cược 1 bên.'
    await TurboOddEvenFunc.PlaceBet(pos,1)
    await TurboOddEvenFunc.VerifyBetStake(pos,1)
    await TurboOddEvenFunc.PlaceBet("Even",5,'nowait')
    await TurboOddEvenFunc.VerifyErrorMessage(errormsg)
    await TurboOddEvenFunc.CheckSettleBalance()
  })  

  it('TC_09_Full_Smoke_Verify User Can Only Bet on 1 Pos-Even', async () => {   
    const pos = "Even"
    const errormsg = 'Chỉ được cược 1 bên.'
   await TurboOddEvenFunc.PlaceBet(pos,1)
   await TurboOddEvenFunc.VerifyBetStake(pos,1)
   await TurboOddEvenFunc.PlaceBet("Odd",5,'nowait')
   await TurboOddEvenFunc.VerifyErrorMessage(errormsg)
   await TurboOddEvenFunc.CheckSettleBalance()
  })  

  it('TC_10_Full_Smoke_Verify Betting [1 -50] Chips on Odd', async () => {  
    const Achip =  [1,5,10,50]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
         } 
      await TurboOddEvenFunc.CheckSettleBalance()     

  })  

  it('TC_11_Full_Verify Betting [100-1000] Chips on Odd', async () => {   
    const Achip =  [100,200,500,1000]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
         } 
      await TurboOddEvenFunc.CheckSettleBalance()    

  })  

  it('TC_12_Full_Verify Betting [1 -50] Chips on Even', async () => {   
    const Achip =  [1,5,10,50]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
         } 
    await TurboOddEvenFunc.CheckSettleBalance()
  })  

  it('TC_13_Full_Verify Betting [100-1000] Chips on Even', async () => {   
    const Achip =  [100,200,500,1000]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
         } 
    await TurboOddEvenFunc.CheckSettleBalance()
  })  

  it('TC_14_Full_Smoke_Verify Preset Betting [1-50] Chips on Odd', async () => {   
    const Achip =  [1,5,10,50]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
         } 
         await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  })  

  it('TC_15_Full_Verify Preset Betting [100-1000] Chips on Odd', async () => {  
    const Achip =  [100,200,500,1000]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
         } 
         await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  })

  it('TC_16_Full_Verify Preset Betting [1 -50] Chips on Odd', async () => {   
    const Achip =  [1,5,10,50]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)    
         } 
         await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_17_Full_Verify Preset Betting [100-1000] Chips on Even', async () => {   
    const Achip =  [100,200,500,1000]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)    
         } 
         await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_18_Full_Smoke_Verify Betting [1-50] on Odd with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Odd
    //Verify all preset and chips on board can be bet success  
    const Achip =  [1,5,10,50]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)    
         } 
         await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_19_Full_Verify Betting [100-500] on Odd with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Odd
    //Verify all preset and chips on board can be bet success   
    const Achip =  [100,200,500]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)    
         } 
         await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_20_Full_Verify Betting [1-50] on Even with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Even
    //Verify all preset and chips on board can be bet success   
    const Achip =  [1,5,10,50]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)    
         } 
    await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_21_Full_erify Betting [100-500] on Even with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Even
    //Verify all preset and chips on board can be bet success   
    const Achip =  [100,200,500]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboOddEvenFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboOddEvenFunc.VerifyBetStake(pos,_stake)    
         } 
    await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

    it('TC_22_Full_Smoke_Verify Betting [1-50] on Odd with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Odd, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success  
    const Achip =  [1,5,10,50]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
    await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
    await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_23_Full_Verify Betting [100 -500] on Odd with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Odd, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success   
    const Achip =  [100,200,500]
    const pos = "Odd"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
    await TurboOddEvenFunc.VerifyBetStake(pos,_stake)   
    await TurboOddEvenFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await TurboOddEvenFunc.OpenPreset()
    await TurboOddEvenFunc.ClearPresetChip()
    await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_24_Full_Verify Betting [1-50] on Even with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Even, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success   
    const Achip =  [1,5,10,50]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
    await TurboOddEvenFunc.VerifyBetStake(pos,_stake)  
    await TurboOddEvenFunc.CheckSettleBalance()
     //Post-condition: clear preset value
     await TurboOddEvenFunc.OpenPreset()
     await TurboOddEvenFunc.ClearPresetChip()
     await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_25_Full_Verify Betting [100-500] on Even with accumulate presetchip and Result page', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Even, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success    
    const Achip =  [100,200,500]
    const pos = "Even"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboOddEvenFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboOddEvenFunc.PlaceBet(pos,null,'wait')
    await TurboOddEvenFunc.VerifyBetStake(pos,_stake)  
    await TurboOddEvenFunc.CheckSettleBalance()
    let settleresult = await TurboOddEvenFunc.GetSettleResult()
    await GameLobbyFunc.openResultPage()
    await ResultFunc.OddEvenTurbo.verifyResult(settleresult)
     //Post-condition: clear preset value
     await TurboOddEvenFunc.OpenPreset()
     await TurboOddEvenFunc.ClearPresetChip()
     await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
  }) 

  it('TC_26_Full_Smoke_Verify searching an invalid roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.OddEvenTurbo.verifyInvalidRoundID()
  })

  it('TC_27_Full_Smoke_Verify searching an archived roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.OddEvenTurbo.verifyArchivedRoundID()
  })

  it('TC_28_Full_Smoke_Verify searching with roundid =0', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.OddEvenTurbo.verifyRoundID0()
  })

  it('TC_29_Full_Smoke_Verify Close Game Success', async () => {
    await TurboOddEvenFunc.CloseGame()
  }) 


})

