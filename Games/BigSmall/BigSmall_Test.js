const game = "BigSmall"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BigSmallFunc from '../BigSmall/BigSmall_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
import * as ResultFunc from '../Result_Function'
import {BigSmallLocator} from './BigSmall_Locator'

describe('BigSmall Game', ()=>{

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
   await BigSmallFunc.VerifySignInSuccessfully()

  })  

  it('TC_02_Full_Smoke_Verify History Content', async () => {
    await BigSmallFunc.OpenHistory()
    await BigSmallFunc.VerifyHistoryContent()
    await BigSmallFunc.CloseHistory()
  })  

  it('TC_03_Full_Smoke_Verify Guide Content', async () => {
    await BigSmallFunc.OpenGuide()
    await BigSmallFunc.VerifyGuideContent()
    await BigSmallFunc.CloseGuide()
  })  

  it('TC_04_Full_Smoke_Verify Statistic Content', async () => {
    await BigSmallFunc.OpenStatistic()
    await BigSmallFunc.VerifyStatisticContent()
    await BigSmallFunc.CloseStatistic()
  await utils.verifyBettingTime(game)
  })  

  it('TC_05_Full_Verify Preset Content', async () => {
    await BigSmallFunc.OpenPreset()
    await BigSmallFunc.VerifyPresetContent()
    await BigSmallFunc.ClosePreset()
    await utils.verifyBlockTime(game,BigSmallFunc.PlaceBet,['Big',1,'nowait'])
  })  

  it('TC_06_Full_Smoke_Verify Max Bet on Big', async () => {
    const pos = "Big"
    const errormsg = 'Tổng tiền cược tối đa ở phiên này là 2,000'
   await BigSmallFunc.PlaceBet(pos,1000)
   await BigSmallFunc.PlaceBet(pos,1000)
   await BigSmallFunc.PlaceBet(pos,5,'nowait')
   await BigSmallFunc.VerifyErrorMessage(errormsg)
   await BigSmallFunc.CheckSettleBalance()
  }) 
 
 it('TC_07_Full_Verify Max Bet on Small', async () => {
   const pos = "Small"
   const errormsg = 'Tổng tiền cược tối đa ở phiên này là 2,000'
  await BigSmallFunc.PlaceBet(pos,1000)
  await BigSmallFunc.PlaceBet(pos,1000)
  await BigSmallFunc.PlaceBet(pos,5,'nowait')
  await BigSmallFunc.VerifyErrorMessage(errormsg)
  await BigSmallFunc.CheckSettleBalance()

}) 

  it('TC_08_Full_Smoke_Verify User Can Only Bet on 1 Pos-Big', async () => {
     const pos = "Big"
     const errormsg = 'Chỉ được cược 1 bên.'
    await BigSmallFunc.PlaceBet(pos,1)
    await BigSmallFunc.VerifyBetStake(pos,1)
    await BigSmallFunc.PlaceBet("Small",5,'nowait')
    await BigSmallFunc.VerifyErrorMessage(errormsg)
    await BigSmallFunc.CheckSettleBalance()
    await BigSmallFunc.CheckRoundHistory()
  }) 


  it('TC_09_Full_Verify User Can Only Bet on 1 Pos-Small', async () => {
    const pos = "Small"
    const errormsg = 'Chỉ được cược 1 bên.'
   await BigSmallFunc.PlaceBet(pos,1)
   await BigSmallFunc.VerifyBetStake(pos,1)
   await BigSmallFunc.PlaceBet("Big",5,'nowait')
   await BigSmallFunc.VerifyErrorMessage(errormsg)
   await BigSmallFunc.CheckSettleBalance()

  })  
 
   it('TC_10_Full_Smoke_Verify Betting Full Chips on Big', async () => {
    const Achip =  [1,5,10,50,100,200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await BigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
      await BigSmallFunc.CheckSettleBalance()  

  })  

  it('TC_11_Full_Verify Betting Full Chips on Small', async () => {
    const Achip =  [1,5,10,50,100,200,500,1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await BigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
         await BigSmallFunc.CheckSettleBalance()
  })  

  it('TC_12_Full_Smoke_Verify Preset Betting Full Chips on Big', async () => {
    const Achip =  [1,5,10,50,100,200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await BigSmallFunc.PlaceBet(pos,null,'wait')
      await BigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    await BigSmallFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BigSmallFunc.OpenPreset()
    await BigSmallFunc.ClearPresetChip()
    await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)
  })  

  it('TC_13_Full_Verify Preset Betting Full Chips on Big', async () => {
    const Achip =  [1,5,10,50,100,200,500,1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await BigSmallFunc.PlaceBet(pos,null,'wait')
      await BigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    await BigSmallFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BigSmallFunc.OpenPreset()
    await BigSmallFunc.ClearPresetChip()
    await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)
  }) 

  it('TC_14_Full_Verify Betting on Big with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Big
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50,100,200,500]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await BigSmallFunc.PlaceBet(pos,Achip[i],'wait')
      await BigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    await BigSmallFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BigSmallFunc.OpenPreset()
    await BigSmallFunc.ClearPresetChip()
    await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)
  }) 

  it('TC_15_Full_Smoke_Verify Betting on Small with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Small
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50,100,200,500]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await BigSmallFunc.PlaceBet(pos,Achip[i],'wait')
      await BigSmallFunc.VerifyBetStake(pos,_stake)    
         } 
    await BigSmallFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BigSmallFunc.OpenPreset()
    await BigSmallFunc.ClearPresetChip()
    await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)
  }) 

    it('TC_16_Full_Smoke_Verify Betting on Big with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50,100,200,500, 1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await BigSmallFunc.PlaceBet(pos,null,'wait')
    await BigSmallFunc.VerifyBetStake(pos,_stake)   
    await BigSmallFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BigSmallFunc.OpenPreset()
    await BigSmallFunc.ClearPresetChip()
    await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)
  }) 

  it('TC_17_Full_Smoke_Verify Betting on Small with accumulate presetchip and Result page', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50,100,200,500, 1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await BigSmallFunc.PlaceBet(pos,null,'wait')
    await BigSmallFunc.VerifyBetStake(pos,_stake)  
    await BigSmallFunc.CheckSettleBalance()
    let settleresult = await BigSmallFunc.GetSettleResult()
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmall.verifyResult(settleresult)
     //Post-condition: clear preset value
     await BigSmallFunc.OpenPreset()
     await BigSmallFunc.ClearPresetChip()
     await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)
  }) 

  it('TC_18_Full_Smoke_Verify searching an invalid roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmall.verifyInvalidRoundID()
  })

  it('TC_19_Full_Smoke_Verify searching an archived roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmall.verifyArchivedRoundID()
  })

  it('TC_20_Full_Smoke_Verify searching with roundid =0', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmall.verifyRoundID0()
  })

  it('TC_21_Full_Smoke_Verify Close Game Success', async () => {
    await BigSmallFunc.CloseGame()
  }) 

})

