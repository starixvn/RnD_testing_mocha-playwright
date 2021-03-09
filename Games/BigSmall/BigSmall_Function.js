import * as utils from '../../util/utils'
import {BigSmallLocator} from './BigSmall_Locator'
import * as config from '../../config/config'
const path = require('path')
const pathImageCompare =path.join(__dirname, '../../') + "ImageCompare" + path.sep + "BigSmall" + path.sep
var jp = require('jsonpath');

export const CloseGame = async() => {
  await utils.clickPos(BigSmallLocator.Close.x,BigSmallLocator.Close.y )
  await utils.sleep(1000)
}

export const OpenHistory = async() => {
  await utils.clickPos(BigSmallLocator.History.x,BigSmallLocator.History.y )
  await utils.sleep(500)

}

export const CloseHistory = async() => {
  await utils.clickPos(BigSmallLocator.HistoryClose.x,BigSmallLocator.HistoryClose.y )
  await utils.sleep(500)
}

export const OpenGuide = async() => {
  await utils.clickPos(BigSmallLocator.Guide.x,BigSmallLocator.Guide.y )
  await utils.sleep(500)

}

export const CloseGuide = async() => {
  await utils.clickPos(BigSmallLocator.GuideClose.x,BigSmallLocator.GuideClose.y )
  await utils.sleep(500)
}

export const OpenStatistic = async() => {
  await utils.clickPos(BigSmallLocator.Statistic.x,BigSmallLocator.Statistic.y )
  await utils.sleep(500)

}

export const CloseStatistic = async() => {
  await utils.clickPos(BigSmallLocator.StatisticClose.x,BigSmallLocator.StatisticClose.y )
  await utils.sleep(500)
}

export const OpenPreset = async() => {
  await utils.clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y )
  await utils.sleep(500)

}

export const ClosePreset = async() => {
  await utils.clickPos(BigSmallLocator.PresetClose.x,BigSmallLocator.PresetClose.y )
  await utils.sleep(500)
}


export const VerifySignInSuccessfully = async() => {
  // Verify BigSmall Title
    const _title= await utils.findImage(
      BigSmallLocator.Title.ImageCompare,
      BigSmallLocator.Title.left,
      BigSmallLocator.Title.top,
      BigSmallLocator.Title.width,
      BigSmallLocator.Title.height)
    await utils.shouldBeEqual(_title.Val,true)  
  // Verify Big
  const _big= await utils.findImage(
    BigSmallLocator.Big.ImageCompare,
    BigSmallLocator.Big.left,
    BigSmallLocator.Big.top,
    BigSmallLocator.Big.width,
    BigSmallLocator.Big.height)
  await utils.shouldBeEqual(_big.Val,true)  
  // Verify Small
  const _small= await utils.findImage(
    BigSmallLocator.Small.ImageCompare,
    BigSmallLocator.Small.left,
    BigSmallLocator.Small.top,
    BigSmallLocator.Small.width,
    BigSmallLocator.Small.height)
  await utils.shouldBeEqual(_small.Val,true)  
  // Verify odd
  const _odd= await utils.findImage(
    BigSmallLocator.Odds.ImageCompare,
    BigSmallLocator.Odds.left,
    BigSmallLocator.Odds.top,
    BigSmallLocator.Odds.width,
    BigSmallLocator.Odds.height)
  await utils.shouldBeEqual(_odd.Val,true)  
}


//PlaceBet
export const PlaceBet = async (_pos,_stake) => {
  try {
      await utils.sleep(500)
      await SelectPos(pos)
      await utils.sleep(500)
      const _cnumber = `Chip${stake}`
      await utils.clickPos(BigSmallLocator[_cnumber].x,BigSmallLocator[_cnumber].y)
      await utils.sleep(500)
      //SubmitChip
      await SubmitChip()
      //await utils.clickPos(BlackJackLocator[pos].x,BlackJackLocator[pos].y)//click bet position
  } catch (e) {
      console.error(e)
  }
}

//Clear Chip
export const ClearChip = async () => {
  try {
      await utils.clickPos(BigSmallLocator.ChipBroadClear.x,BigSmallLocator.ChipBroadClear.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Close Bet Chip
export const CloseChipBoard = async () => {
  try {
      await utils.clickPos(BigSmallLocator.ChipBroadClose.x,BigSmallLocator.ChipBroadClose.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//SubmitChip
export const SubmitChip = async () => {
  try {
      await utils.clickPos(BigSmallLocator.ChipBroadAccept.x,BigSmallLocator.ChipBroadAccept.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Select Bet pos
export const SelectPos = async(_pos) => {
  await utils.clickPos(BigSmallLocator[_pos].x,BigSmallLocator[_pos].y)//click bet position
}

//Preset Chip
export const PresetChip = async(_chip) => {
  await utils.clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  await utils.clickPos(BigSmallLocator[_prechip].x,BigSmallLocator[_prechip].y)
  await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await utils.clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y)
  await utils.clickPos(BigSmallLocator.PresetClear.x,BigSmallLocator.PresetClear.y)
  await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)//click Accept
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:'ImgCompare_BigSmall_History.png',clip:{x: BigSmallLocator.History.left,
  //   y: BigSmallLocator.History.top,
  //  width: BigSmallLocator.History.width,
  //  height: BigSmallLocator.History.height}})
  const _result0= await utils.findImage(
      BigSmallLocator.History.ImageCompare,
      BigSmallLocator.History.left,
      BigSmallLocator.History.top,
      BigSmallLocator.History.width,
      BigSmallLocator.History.height)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  // await page.screenshot({path:'ImgCompare_BigSmall_Preset.png',clip:{x: BigSmallLocator.Preset.left,
  //   y: BigSmallLocator.Preset.top,
  //  width: BigSmallLocator.Preset.width,
  //  height: BigSmallLocator.Preset.height}})
  const _result0= await utils.findImage(
      BigSmallLocator.Preset.ImageCompare,
      BigSmallLocator.Preset.left,
      BigSmallLocator.Preset.top,
      BigSmallLocator.Preset.width,
      BigSmallLocator.Preset.height)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyGuideContent = async() => {
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ BigSmallLocator.Guide.ImageCompare1, BigSmallLocator.Guide.ImageCompare2, BigSmallLocator.Guide.ImageCompare3,
    BigSmallLocator.Guide.ImageCompare4] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:`ImgCompare_BigSmall_Guide_${t+1}.png`,clip:{
    // x: BigSmallLocator.Guide.left,
    //   y: BigSmallLocator.Guide.top,
    //  width: BigSmallLocator.Guide.width,
    //  height: BigSmallLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(
      _AcheckImage[t],
      BigSmallLocator.Guide.left,
      BigSmallLocator.Guide.top,
      BigSmallLocator.Guide.width,
      BigSmallLocator.Guide.height
      )
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  // await page.screenshot({path:'ImgCompare_BigSmall_Statistic_Point.png',clip:{x: BigSmallLocator.Statistic.left,
  //   y: BigSmallLocator.Statistic.top,
  //  width: BigSmallLocator.Statistic.width,
  //  height: BigSmallLocator.Statistic.height}})

  //Verify Statistic Result
  const _result1= await utils.findImage(
      BigSmallLocator.Statistic.ImageCompare1,
      BigSmallLocator.Statistic.left,
      BigSmallLocator.Statistic.top,
      BigSmallLocator.Statistic.width,
      BigSmallLocator.Statistic.height)
  await utils.shouldBeEqual(_result1.Val,true)    

  //Verify Statistic Point
  await utils.clickPos(BigSmallLocator.StatisticPoint.x,BigSmallLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
    BigSmallLocator.Statistic.ImageCompare2,
    BigSmallLocator.Statistic.left,
    BigSmallLocator.Statistic.top,
    BigSmallLocator.Statistic.width,
    BigSmallLocator.Statistic.height)
await utils.shouldBeEqual(_result2.Val,true)    

}

//

///////////////////////////////////////////////////////////




export const VerifyPosStake = async(_pos,_stake) => {
  const poststake = `${_pos}Stake`
    //   await page.screenshot({path:`${_stake}${_pos}.png`,clip:{x: BlackJackLocator[poststake].left,
    //   y: BlackJackLocator[poststake].top,
    //  width: BlackJackLocator[poststake].width,
    //  height: BlackJackLocator[poststake].height}})
    const _result = await utils.findImage(
    pathImageCompare + `Stake${_pos}` + path.sep  + `${_stake}.png`,
    BigSmallLocator[poststake].left,
    BigSmallLocator[poststake].top,
    BigSmallLocator[poststake].width,
    BigSmallLocator[poststake].height)
    await utils.shouldBeEqual(_result.Val,true)    
}


export const VerifyBetBlance = async(_stake) => {
    //   await page.screenshot({path:`${_stake}.png`,clip:{x: BlackJackLocator.Stake.left,
    //   y: BlackJackLocator.Stake.top,
    //  width: BlackJackLocator.Stake.width,
    //  height: BlackJackLocator.Stake.height}})
    const _result = await utils.findImage(
    pathImageCompare + 'BetBalance' + path.sep  + `${_stake}.png`,
    BigSmallLocator.Stake.left,
    BigSmallLocator.Stake.top,
    BigSmallLocator.Stake.width,
    BigSmallLocator.Stake.height)
    await utils.shouldBeEqual(_result.Val,true)    
}


export const VerifyChipColor_Pos2 = async(_chip) => {
  //   await page.screenshot({path:`${_chip}.png`,clip:{x: BlackJackLocator.Pos2.left,
  //   y: BlackJackLocator.Pos2.top,
  //  width: BlackJackLocator.Pos2.width,
  //  height: BlackJackLocator.Pos2.height}})
  const _result = await utils.findImage(
  pathImageCompare + 'ChipColorPos2' + path.sep  + `${_chip}.png`,
  BigSmallLocator.Pos2.left,
  BigSmallLocator.Pos2.top,
  BigSmallLocator.Pos2.width,
  BigSmallLocator.Pos2.height)
  await utils.shouldBeEqual(_result.Val,true)    
}

// Get Total Bet Ammount of all pos after click Deal
export const GetTotalBetAmount = async() => {
  const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"deal'));
  var res = String(_found).split("42/user/blackjack,");
  var obj = JSON.parse(res[1]);
  return obj[1].deal.totalAmount
}

// Get Total Bet ID of pos after click Deal
export const GetPosId = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal')
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj[1], `$..hands[?(@.pos==${_pos})]`);
  return _result[0].id
}

// Get Total Score of Pos of first round
export const GetFirstTotalScore = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj[1], `$..hands[?(@.pos==${_pos})]`);
  console.log(Math.max(..._result[0].total))
  return Math.max(..._result[0].total)
}

// Get current score of pos when hitting a card
export const GetHitScore = async(_pos) => { 
  let _foundhit = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"hit"')
  //console.log(_foundhit)
    if (_foundhit.includes(_pos) === false){
    await utils.sleep(3000)
    _foundhit = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"hit"')
  }
  const res = String(_foundhit).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  console.log(obj[1].hit.total[0])
  return obj[1].hit.total[0]
}

// Get winloss of pos (based on pos's id) after settled
export const GetWinlossPosID = async(_posid) => {
  const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"finish'));
  var last_found = _found.pop();
  const res = String(last_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  let _result = jp.query(obj[1], `$..winningHands[?(@.id==${_posid})].betwin`);
   _result = +_result || 0
   console.log(`${_posid} win : ${_result}`)
  return _result
}

// get In game Balance
export const GetInGamgeBalance = async() =>{
  let _result = await utils.getWsMessage('"red"')
  const res = String(_result).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  return obj[1].user.red
}

// Check Current Balacnce
export const GetBJUIBalance = async() =>{
  const uibalance= await utils.getUIBalance(BigSmallLocator.Balance.ImageCompare,BigSmallLocator.Balance.left,BigSmallLocator.Balance.top,BigSmallLocator.Balance.width,BigSmallLocator.Balance.height)
  console.log(`UI Balance : ${uibalance}`)
  return uibalance
}

// Get Total Score of Pos of first round
export const GetDealBalance = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  console.log(obj)
  const _result = jp.query(obj, `$..red`);
  console.log(_result[1])
  return Math.max(_result[0])
}
