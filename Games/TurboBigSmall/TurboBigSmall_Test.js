const game = "TurboBigSmall"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as TurboBigSmallFunc from '../TurboBigSmall/TurboBigSmall_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'
const TurboBigSmallLocator = (process.env.npm_config_lang === 'vn' ? require('./TurboBigSmall_Locator').TurboBigSmallLocator_vn : require('./TurboBigSmall_Locator').TurboBigSmallLocator_en)

describe('TurboBigSmall Game', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
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
    await TurboBigSmallFunc.VerifySignInSuccessfully()
    await TurboBigSmallFunc.checkNavStatisticbar()
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
    await utils.verifyBettingTime(game)
  })  

  it('TC_05_Full_Smoke_Verify Preset Content', async () => {
    await TurboBigSmallFunc.OpenPreset()
    await TurboBigSmallFunc.VerifyPresetContent()
    await TurboBigSmallFunc.ClosePreset()
    await utils.verifyBlockTime(game,TurboBigSmallFunc.PlaceBet,['Big',1,'nowait'])
    await utils.sleep(5000)
  })  

  it('TC_06_Full_Smoke_Verify Max Bet on Big', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const pos = "Big"
    const errormsg = `"errorCode":"SB1911","maxBet":2000`
   await TurboBigSmallFunc.PlaceBet(pos,1000)
   await TurboBigSmallFunc.PlaceBet(pos,1000)
   await TurboBigSmallFunc.PlaceBet(pos,5,'nowait')
   await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
   await TurboBigSmallFunc.CheckSettleBalance()

 }) 
 
 it('TC_07_Full_Verify Max Bet on Small', async () => {  
  await TurboBigSmallFunc.waitUtilNewRound()
   const pos = "Small"
   const errormsg = `"errorCode":"SB1911","maxBet":2000`
  await TurboBigSmallFunc.PlaceBet(pos,1000)
  await TurboBigSmallFunc.PlaceBet(pos,1000)
  await TurboBigSmallFunc.PlaceBet(pos,5,'nowait')
  await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
  await TurboBigSmallFunc.CheckSettleBalance()
}) 

  it('TC_08_Full_Smoke_Verify User Can Only Bet on 1 Pos-Big', async () => {  
    await TurboBigSmallFunc.waitUtilNewRound()
     const pos = "Big"
     const errormsg = '"errorCode":"SB1927"'
    await TurboBigSmallFunc.PlaceBet(pos,1)
    await TurboBigSmallFunc.VerifyBetStake(pos,1)
    await TurboBigSmallFunc.PlaceBet("Small",5,'nowait')
    await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
    await TurboBigSmallFunc.CheckSettleBalance()
    await TurboBigSmallFunc.CheckRoundHistory()
  })  

  it('TC_09_Full_Verify User Can Only Bet on 1 Pos-Small', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const pos = "Small"
    const errormsg = '"errorCode":"SB1927"'
   await TurboBigSmallFunc.PlaceBet(pos,1)
   await TurboBigSmallFunc.VerifyBetStake(pos,1)
   await TurboBigSmallFunc.PlaceBet("Big",5,'nowait')
   await TurboBigSmallFunc.VerifyErrorMessage(errormsg)
   await TurboBigSmallFunc.CheckSettleBalance()
  })  
 
  it('TC_10_Full_Smoke_Verify Betting [1 -50] Chips on Big', async () => {
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    await TurboBigSmallFunc.CheckSettleBalance()   

  })  

  it('TC_11_Full_Verify Betting [100-1000] Chips on Big', async () => {  
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    await TurboBigSmallFunc.CheckSettleBalance()     

  })  

  it('TC_12_Full_Verify Betting [1 -50] Chips on Small', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
    await TurboBigSmallFunc.CheckSettleBalance()
  })  

  it('TC_13_Full_Verify Betting [100-1000] Chips on Small', async () => {  
    await TurboBigSmallFunc.waitUtilNewRound() 
    const Achip =  [100,200,500,1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
     await TurboBigSmallFunc.CheckSettleBalance()
  })  

  it('TC_14_Full_Smoke_Verify Preset Betting [1-50] Chips on Big', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    await TurboBigSmallFunc.waitUtilNewRound()
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
      await TurboBigSmallFunc.VerifyBetStake(pos,_stake)   
         } 
      await TurboBigSmallFunc.ClearPreset()    
      await TurboBigSmallFunc.CheckSettleBalance()
  })  

  it('TC_15_Full_Verify Preset Betting [100-1000] Chips on Big', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
         } 
    await TurboBigSmallFunc.ClearPreset()    
    await TurboBigSmallFunc.CheckSettleBalance()
  })

  it('TC_16_Full_Verify Preset Betting [1 -50] Chips on Big', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
         } 
    await TurboBigSmallFunc.ClearPreset()    
    await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_17_Full_Verify Preset Betting [100-1000] Chips on Big', async () => {   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500,1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
         } 
    await TurboBigSmallFunc.ClearPreset()    
    await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_18_Full_Smoke_Verify Betting [1-50] on Big with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Big
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'nowait')
         } 
         await TurboBigSmallFunc.ClearPreset()    
         await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_19_Full_Verify Betting [100-500] on Big with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Big
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'nowait')
         } 
         await TurboBigSmallFunc.ClearPreset()    
         await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_20_Full_Verify Betting [1-50] on Small with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Small
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'nowait')
         } 
         await TurboBigSmallFunc.ClearPreset()    
         await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_21_Full_Verify Betting [100-500] on Small with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Small
    //Verify all preset and chips on board can be bet success  
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await TurboBigSmallFunc.PlaceBet(pos,Achip[i],'nowait')
         } 
         await TurboBigSmallFunc.ClearPreset()    
         await TurboBigSmallFunc.CheckSettleBalance()
  }) 

    it('TC_22_Full_Smoke_Verify Betting [1-50] on Big with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
    await TurboBigSmallFunc.ClearPreset()    
    await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_23_Full_Verify Betting [100 -500] on Big with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
    await TurboBigSmallFunc.ClearPreset()    
    await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_24_Full_Verify Betting [1-50] on Small with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [1,5,10,50]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
    await TurboBigSmallFunc.ClearPreset()    
    await TurboBigSmallFunc.CheckSettleBalance()
  }) 

  it('TC_25_Full_Smoke_Verify Betting [100-500] on Small with accumulate presetchip and Result page', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success   
    await TurboBigSmallFunc.waitUtilNewRound()
    const Achip =  [100,200,500]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await TurboBigSmallFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await TurboBigSmallFunc.PlaceBet(pos,null,'nowait')
    await TurboBigSmallFunc.CheckSettleBalance()
    let settleresult = await TurboBigSmallFunc.GetSettleResult()
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmallTurbo.verifyResult(settleresult)
     //Post-condition: clear preset value
     await TurboBigSmallFunc.ClearPreset()    
  }) 
  
  it('TC_26_Full_Smoke_Verify searching an invalid roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmallTurbo.verifyInvalidRoundID()
  })

  it('TC_27_Full_Smoke_Verify searching an archived roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmallTurbo.verifyArchivedRoundID()
  })

  it('TC_28_Full_Smoke_Verify searching with roundid =0', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BigSmallTurbo.verifyRoundID0()
  })

  it('TC_29_Full_Smoke_Verify Close Game Success', async () => {
    await TurboBigSmallFunc.CloseGame()
  }) 
  
})

