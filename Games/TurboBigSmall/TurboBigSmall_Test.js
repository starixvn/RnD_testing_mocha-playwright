const game = "TurboBigSmall"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as TurboBigSmallFunc from '../TurboBigSmall/TurboBigSmall_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
import {TurboBigSmallLocator} from './TurboBigSmall_Locator'

describe('TurboBigSmall Game', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
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
    await TurboBigSmallFunc.VerifySignInSuccessfully()

  })  

  it('TC_02_Full_Smoke_Verify History Content', async () => {
    await TurboBigSmallFunc.OpenHistory()
    await TurboBigSmallFunc.VerifyHistoryContent()
    await TurboBigSmallFunc.CloseHistory()
  })  

  it('TC_03_Full_Smoke_Verify Guide Content', async () => {
    await TurboBigSmallFunc.OpenGuide()
    await TurboBigSmallFunc.VerifyGuideContent()
    await TurboBigSmallFunc.CloseGuide()
  })  

  it('TC_04_Full_Smoke_Verify Statistic Content', async () => {
    await TurboBigSmallFunc.OpenStatistic()
    await TurboBigSmallFunc.VerifyStatisticContent()
    await TurboBigSmallFunc.CloseStatistic()
  })  

  it('TC_05_Full_Smoke_Verify Preset Content', async () => {
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.VerifyPresetContent()
    await TurboBigSmallFunc.ClosePreset()
  })  

  it('TC_06_Full_Smoke_Verify User Can Only Bet on 1 Pos-Big', async () => {
     const pos = "Big"
     const errormsg = 'Chỉ được cược 1 bên.'
    await TurboBigSmallFunc.PlaceBet(pos,1)
    await TurboBigSmallFunc.VerifyBetStake(pos,1)
    await TurboBigSmallFunc.PlaceBet("Small",5,'nowait')
    await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
  })  

  it('TC_07_Full_Smoke_Verify User Can Only Bet on 1 Pos-Small', async () => {
    const pos = "Small"
    const errormsg = 'Chỉ được cược 1 bên.'
   await TurboBigSmallFunc.PlaceBet(pos,1)
   await TurboBigSmallFunc.VerifyBetStake(pos,1)
   await TurboBigSmallFunc.PlaceBet("Big",5,'nowait')
   await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
   let d= await TurboBigSmallFunc.GetWinLossResult()
   console.log('Is Win: ',d.win, d.stake)
  })  
 
  it('TC_08_Full_Smoke_Verify Max Bet on Big', async () => {
     const pos = "Big"
     const errormsg = 'Tổng tiền cược tối đa ở phiên này là 2,000'
    await TurboBigSmallFunc.PlaceBet(pos,1000)
    await TurboBigSmallFunc.PlaceBet(pos,1000)
    await TurboBigSmallFunc.PlaceBet(pos,5,'nowait')
    await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
  }) 
  
  it('TC_09_Full_Smoke_Verify Max Bet on Small', async () => {
    const pos = "Small"
    const errormsg = 'Tổng tiền cược tối đa ở phiên này là 2,000'
   await TurboBigSmallFunc.PlaceBet(pos,1000)
   await TurboBigSmallFunc.PlaceBet(pos,1000)
   await TurboBigSmallFunc.PlaceBet(pos,5,'nowait')
   await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
   let d= await TurboBigSmallFunc.GetWinLossResult()
   console.log('Is Win: ',d.win, d.stake)
 }) 

  it('TC_10_Full_Smoke_Verify Betting [1 -50] Chips on Big', async () => {
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)     

  })  

  it('TC_11_Full_Smoke_Verify Betting [100-1000] Chips on Big', async () => {
    const Achip =  [100,200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)     

  })  

  it('TC_12_Full_Smoke_Verify Betting [1 -50] Chips on Small', async () => {
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
  })  

  it('TC_13_Full_Smoke_Verify Betting [100-1000] Chips on Small', async () => {
    const Achip =  [100,200,500,1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
  })  

  it('TC_14_Full_Smoke_Verify Preset Betting [1-50] Chips on Big', async () => {
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  })  

  it('TC_15_Full_Smoke_Verify Preset Betting [100-1000] Chips on Big', async () => {
    const Achip =  [100,200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  })

  it('TC_16_Full_Smoke_Verify Preset Betting [1 -50] Chips on Big', async () => {
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_17_Full_Smoke_Verify Preset Betting [100-1000] Chips on Big', async () => {
    const Achip =  [100,200,500,1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_18_Full_Smoke_Verify Betting [1-50] on Big with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Big
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_19_Full_Smoke_Verify Betting [100-500] on Big with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Big
    //Verify all preset and chips on board can be bet success
    const Achip =  [100,200,500]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_20_Full_Smoke_Verify Betting [1-50] on Small with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Small
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    let _beforebalance = await GameLobbyFunc.getBalance()
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_21_Full_Smoke_Verify Betting [100-500] on Small with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Small
    //Verify all preset and chips on board can be bet success
    const Achip =  [100,200,500]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'wait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    let _beforebalance = await GameLobbyFunc.getBalance()
    let d= await TurboBigSmallFunc.GetWinLossResult()
    console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

    it('TC_22_Full_Smoke_Verify Betting [1-50] on Big with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
    await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
    let _beforebalance = await GameLobbyFunc.getBalance() 
     let d= await TurboBigSmallFunc.GetWinLossResult()
     console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_23_Full_Smoke_Verify Betting [100 -500] on Big with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [100,200,500]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
    await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
    let _beforebalance = await GameLobbyFunc.getBalance() 
     let d= await TurboBigSmallFunc.GetWinLossResult()
     console.log('Is Win: ',d.win, d.stake)
    //Post-condition: clear preset value
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.ClearPresetChip()
    await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_24_Full_Smoke_Verify Betting [1-50] on Small with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
    await TurboBigSmallFunc.VerifyBetStake(pos,_stake)  
     let d= await TurboBigSmallFunc.GetWinLossResult()
     console.log('Is Win: ',d.win, d.stake)
     //Post-condition: clear preset value
     await TurboBigSmallFunc.OpenPreset()
     await TurboBigSmallFunc.ClearPresetChip()
     await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_25_Full_Smoke_Verify Betting [100-500] on Small with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [100,200,500]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'wait')
    await TurboBigSmallFunc.VerifyBetStake(pos,_stake)  
     let d= await TurboBigSmallFunc.GetWinLossResult()
     console.log('Is Win: ',d.win, d.stake)
     //Post-condition: clear preset value
     await TurboBigSmallFunc.OpenPreset()
     await TurboBigSmallFunc.ClearPresetChip()
     await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
  }) 

  it('TC_26_Full_Smoke_Verify Close Game Success', async () => {
    await TurboBigSmallFunc.CloseGame()
  }) 
})

