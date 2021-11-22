const game = "BitCoin"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BitCoinFunc from './BitCoin_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'
let BitCoinLocator = (process.env.npm_config_lang  == 'vn' ? require('./BitCoin_Locator').BitCoinLocator_vn : require('./BitCoin_Locator').BitCoinLocator_en)

describe(game, ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game from lobby and nagvigation of statistic bar', async () => {
   await BitCoinFunc.VerifySignInSuccessfully()
   //await BitCoinFunc.checkNavStatisticbar()
    }) 

   it('TC_06_Full_Smoke_Verify Max Bet on Big', async () => {
  await BitCoinFunc.waitUtilNewRound()
    const pos = "Big"
    const errormsg = `"errorCode":"SB1911","maxBet":2000`
   await BitCoinFunc.PlaceBet(pos,1000)
   await BitCoinFunc.PlaceBet(pos,1000)
   await BitCoinFunc.PlaceBet(pos,5,'nowait')
   await BitCoinFunc.VerifyErrorMessage(errormsg)
  await BitCoinFunc.CheckSettleBalance()
   await BitCoinFunc.CheckRoundHistory()
  }) 
 
 it('TC_07_Full_Smoke_Verify Max Bet on Small', async () => {
  await BitCoinFunc.waitUtilNewRound()
   const pos = "Small"
   const errormsg = `"errorCode":"SB1911","maxBet":2000`
  await BitCoinFunc.PlaceBet(pos,1000)
  await BitCoinFunc.PlaceBet(pos,1000)
  await BitCoinFunc.PlaceBet(pos,5,'nowait')
  await BitCoinFunc.VerifyErrorMessage(errormsg)
  await BitCoinFunc.CheckSettleBalance()
  await BitCoinFunc.CheckRoundHistory()
}) 

  it('TC_08_Full_Verify User Can Only Bet on 1 Pos-Big', async () => {
    await BitCoinFunc.waitUtilNewRound()
     const pos = "Big"
     const errormsg = '"errorCode":"SB1927"'
    await BitCoinFunc.PlaceBet(pos,1)
    await BitCoinFunc.VerifyBetStake(pos,1)
    await BitCoinFunc.PlaceBet("Small",5,'nowait')
    await BitCoinFunc.VerifyErrorMessage(errormsg)
    await BitCoinFunc.CheckSettleBalance()
    await BitCoinFunc.CheckRoundHistory()
  }) 


  it('TC_09_Full_Verify User Can Only Bet on 1 Pos-Small', async () => {
    await BitCoinFunc.waitUtilNewRound()
    const pos = "Small"
    const errormsg = '"errorCode":"SB1927"'
   await BitCoinFunc.PlaceBet(pos,1)
   await BitCoinFunc.VerifyBetStake(pos,1)
   await BitCoinFunc.PlaceBet("Big",5,'nowait')
   await BitCoinFunc.VerifyErrorMessage(errormsg)
   await BitCoinFunc.CheckSettleBalance()

  })  
 
   it('TC_10_Full_Verify Betting Full Chips on Big', async () => {
    const Achip =  [200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await BitCoinFunc.VerifyBetStake(pos,_stake)   
         } 
      await BitCoinFunc.CheckSettleBalance()  

  })  

  it('TC_11_Full_Verify Betting Full Chips on Small', async () => {
    const Achip =  [1,5,10,50,100]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PlaceBet(pos,Achip[i])
      _stake = _stake + Achip[i]
      await BitCoinFunc.VerifyBetStake(pos,_stake)   
         } 
         await BitCoinFunc.CheckSettleBalance()
  })  

  it('TC_12_Full_Verify Preset Betting Full Chips on Big', async () => {
    const Achip =  [200,500,1000]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await BitCoinFunc.PlaceBet(pos,null)
      await BitCoinFunc.VerifyBetStake(pos,_stake)   
         } 
    await BitCoinFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BitCoinFunc.OpenPreset()
    await BitCoinFunc.ClearPresetChip()
    await utils.clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)
  })  

  it('TC_13_Full_Verify Preset Betting Full Chips on Big', async () => {
    const Achip =  [1,5,10,50,100]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i]
      await BitCoinFunc.PlaceBet(pos,null,'wait')
      await BitCoinFunc.VerifyBetStake(pos,_stake)    
         } 
    await BitCoinFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BitCoinFunc.OpenPreset()
    await BitCoinFunc.ClearPresetChip()
    await utils.clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)
  })
  
  it('TC_14_Full_Verify Betting on Big with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Big
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await BitCoinFunc.PlaceBet(pos,Achip[i],'wait')
      await BitCoinFunc.VerifyBetStake(pos,_stake)    
         } 
    await BitCoinFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BitCoinFunc.OpenPreset()
    await BitCoinFunc.ClearPresetChip()
    await utils.clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)
  }) 

  it('TC_15_Full_Verify Betting on Small with specific Preset Chip + extra Chip on Board', async () => {
    //Test senario: Set Specific Preset Chip Then Place Bet extra chip-board on Small
    //Verify all preset and chips on board can be bet success
    const Achip =  [100,200,500]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PresetChip(Achip[i])
      _stake = _stake + Achip[i] * 2
      await BitCoinFunc.PlaceBet(pos,Achip[i],'wait')
      await BitCoinFunc.VerifyBetStake(pos,_stake)    
         } 
    await BitCoinFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BitCoinFunc.OpenPreset()
    await BitCoinFunc.ClearPresetChip()
    await utils.clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)
  }) 

    it('TC_16_Full_Verify Betting on Big with accumulate presetchip', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [1,5,10,50,100]
    const pos = "Big"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await BitCoinFunc.PlaceBet(pos,null,'wait')
    await BitCoinFunc.VerifyBetStake(pos,_stake)   
    await BitCoinFunc.CheckSettleBalance()
    //Post-condition: clear preset value
    await BitCoinFunc.OpenPreset()
    await BitCoinFunc.ClearPresetChip()
    await utils.clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)
  }) 

  it('TC_17_Full_Verify Betting on Small with accumulate presetchip and Result page', async () => {
    //Test senario: Set Preset Chip Then Place Bet on Big, Value of preset chip will be accmulated
    //Verify all preset and chips on board can be bet success
    const Achip =  [200,500, 1000]
    const pos = "Small"
    let _stake =0
    for (let i =0 ; i< Achip.length ;i ++){
      await BitCoinFunc.PresetChip(Achip[i],'noclear')
      _stake = _stake + Achip[i]
        } 
    await BitCoinFunc.PlaceBet(pos,null,'wait')
    await BitCoinFunc.VerifyBetStake(pos,_stake)  
    await BitCoinFunc.CheckSettleBalance()
    let settleresult = await BitCoinFunc.GetSettleResult()
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BitCoin.verifyResult(settleresult)
     //Post-condition: clear preset value
     await BitCoinFunc.OpenPreset()
     await BitCoinFunc.ClearPresetChip()
     await utils.clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)
  }) 

  it('TC_18_Full_Verify searching an invalid roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BitCoin.verifyInvalidRoundID()
  })

  it('TC_19_Full_Verify searching an archived roundid', async() =>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BitCoin.verifyArchivedRoundID()
  })

  it('TC_20_Full_Verify searching with roundid =0', async()=>{
    await GameLobbyFunc.openResultPage()
    await ResultFunc.BitCoin.verifyRoundID0()
  })

  it('TC_02_Full_Verify History Content', async () => {
    await BitCoinFunc.OpenHistory()
    await BitCoinFunc.VerifyHistoryContent()
    await BitCoinFunc.CloseHistory()
  })  

  it('TC_03_Full_Verify Guide Content', async () => {
    await BitCoinFunc.OpenGuide()
    await BitCoinFunc.VerifyGuideContent()
    await BitCoinFunc.CloseGuide()
  })  

  it('TC_04_Full_Verify Statistic and Preset Content', async () => {
    await BitCoinFunc.waitUtilNewRound()
    await BitCoinFunc.OpenStatistic()
    await BitCoinFunc.VerifyStatisticContent()
    await BitCoinFunc.CloseStatistic()
    await BitCoinFunc.OpenPreset()
    await BitCoinFunc.VerifyPresetContent()
    await BitCoinFunc.ClosePreset()
  })  

  it('TC_05_Full_Verify Block bet time', async () => {
    await utils.verifyBlockTime(game,BitCoinFunc.PlaceBet,['Big',1,'nowait'])
  })  
  
  it('TC_21_Full_Smoke_Verify Close Game Success', async () => {
    await BitCoinFunc.CloseGame()
  }) 

})

