import * as utils from '../../util/utils'
import {TurboOddEvenLocator} from './TurboOddEven_Locator'
import * as config from '../../config/config'
import * as GameLobbyFunc from '../GameLobby_Function'
var jp = require('jsonpath');

export const CloseGame = async() => {
  await utils.clickPos(TurboOddEvenLocator.Close.x,TurboOddEvenLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(TurboOddEvenLocator.Even)
  await utils.shouldBeEqual(flag.Val,true)
}

export const OpenHistory = async() => {
  await utils.clickPos(TurboOddEvenLocator.History.x ,TurboOddEvenLocator.History.y)
  await utils.sleep(500)

}

export const CloseHistory = async() => {
  await utils.clickPos(TurboOddEvenLocator.HistoryClose.x,TurboOddEvenLocator.HistoryClose.y )
  await utils.sleep(500) 
}

export const OpenGuide = async() => {
  await utils.clickPos(TurboOddEvenLocator.Guide.x,TurboOddEvenLocator.Guide.y )
  await utils.sleep(500)
}

export const CloseGuide = async() => {
  await utils.clickPos(TurboOddEvenLocator.GuideClose.x,TurboOddEvenLocator.GuideClose.y )
  await utils.sleep(500)
}

export const OpenStatistic = async() => {
  await utils.clickPos(TurboOddEvenLocator.Statistic.x,TurboOddEvenLocator.Statistic.y )
  await utils.sleep(500)

}

export const CloseStatistic = async() => {
  await utils.clickPos(TurboOddEvenLocator.StatisticClose.x,TurboOddEvenLocator.StatisticClose.y )
  await utils.sleep(500)
}

export const OpenPreset = async() => {
  await utils.clickPos(TurboOddEvenLocator.Preset.x,TurboOddEvenLocator.Preset.y )
  await utils.sleep(500)

}

export const ClosePreset = async() => {
  await utils.clickPos(TurboOddEvenLocator.PresetClose.x,TurboOddEvenLocator.PresetClose.y )
  await utils.sleep(500)
}


export const VerifySignInSuccessfully = async() => {
  // Verify TurboOddEven Title
  // await page.screenshot({path:TurboOddEvenLocator.Title.ImageCompare,clip:{x: TurboOddEvenLocator.Title.left,
  //   y: TurboOddEvenLocator.Title.top,
  //  width: TurboOddEvenLocator.Title.width,
  //  height: TurboOddEvenLocator.Title.height}})
  const _title= await utils.findImage(TurboOddEvenLocator.Title.ImageCompare,TurboOddEvenLocator.Title)
  await utils.shouldBeEqual(_title.Val,true)  
  //Verify Odd
  // await page.screenshot({path:TurboOddEvenLocator.Odd.ImageCompare,clip:{x: TurboOddEvenLocator.Odd.left,
  //   y: TurboOddEvenLocator.Odd.top,
  //  width: TurboOddEvenLocator.Odd.width,
  //  height: TurboOddEvenLocator.Odd.height}})
  const _odd= await utils.findImage(TurboOddEvenLocator.Odd.ImageCompare,TurboOddEvenLocator.Odd)
  await utils.shouldBeEqual(_odd.Val,true)  
  // Verify Even
  // await page.screenshot({path:TurboOddEvenLocator.Even.ImageCompare,clip:{x: TurboOddEvenLocator.Even.left,
  //   y: TurboOddEvenLocator.Even.top,
  //  width: TurboOddEvenLocator.Even.width,
  //  height: TurboOddEvenLocator.Even.height}})
  const _even= await utils.findImage(TurboOddEvenLocator.Even.ImageCompare,TurboOddEvenLocator.Even)
  await utils.shouldBeEqual(_even.Val,true)  
  // Verify odds
  // await page.screenshot({path:TurboOddEvenLocator.Odds.ImageCompare,clip:{x: TurboOddEvenLocator.Odds.left,
  //   y: TurboOddEvenLocator.Odds.top,
  //  width: TurboOddEvenLocator.Odds.width,
  //  height: TurboOddEvenLocator.Odds.height}})
  const _odds = await utils.findImage(TurboOddEvenLocator.Odds.ImageCompare,TurboOddEvenLocator.Odds)
  await utils.shouldBeEqual(_odds.Val,true)  
}


//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='wait') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      await utils.sleep(100)
      await SelectPos(_pos)  //Big or Small
      await utils.sleep(100)
      // if stake = null --> place bet without select any chip (in this case user have set preset chip before)
      if (_stake != null)
      {
        const _cnumber = `Chip${_stake}`
        await utils.clickPos(TurboOddEvenLocator[_cnumber].x,TurboOddEvenLocator[_cnumber].y)
        await utils.sleep(100)
      }
         //SubmitChip
      await SubmitChip()
      // Wait until betting success
      if (wait == 'wait'){
        _isfail = await IsBetFail()
      }
      else if (wait == 'nowait'){
        _isfail = false
      }
      await utils.sleep(100)
      if (_isfail === false )
      {
        break
      }
    }   
  } catch (e) {
      console.error(e)
  }
}

//Clear Chip
export const VerifyBetStake = async (_pos,_stake) => {
  try {
      //console.log('Verify Stake: ',_pos,': ',_stake)
      //Precondition convert Big --> tai, Small --> xiu
      let findmsg,_found
      if (_pos == "Even"){
          findmsg = `{"clturbo":{"clturbo":{"red_me_chan":${_stake}}}`
          _found = await utils.wsFindMessage(findmsg)
          }

       else if(_pos == "Odd"){
          findmsg = `{"clturbo":{"clturbo":{"red_me_le":${_stake}}}`
          _found = await utils.wsFindMessage(findmsg)
       }
      await utils.shouldBeEqual(_found.Val,true)    
  } catch (e) {
      console.error(e)
  }
}

//
export const GetWinLossResult = async () => {
  try {
      let _found = await utils.getWsMessage('{"clturbo":{"status":{"win":')
      const obj = JSON.parse(_found);
      let _result = jp.query(obj, `$..win`);
      let _betstake
      if (_result == 'false'){
        _betstake = 0
      }
      else
      {
        let _astake = jp.query(obj, `$..bet`);
        _betstake = _astake[0]
      }
      return {win: _result[0], stake: _betstake }
      
  } catch (e) {
      console.error(e)
  }
}

// Verify error msg
export const VerifyErrorMessage = async(_msg) => {
  await utils.sleep(500)
  let _found, _result
  _result = wsMessageReceived.filter(element => element.includes(`{"clturbo":{"err":"${_msg}"}}`));
  if (_result.length > 0)
  {
    _found = true
  }
  else {
    _found = false
  }
  await utils.shouldBeEqual(_found,true)
}


//Clear Chip
export const ClearChip = async () => {
  try {
      await utils.clickPos(TurboOddEvenLocator.ChipBroadClear.x,TurboOddEvenLocator.ChipBroadClear.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Close Bet Chip
export const CloseChipBoard = async () => {
  try {
      await utils.clickPos(TurboOddEvenLocator.ChipBroadClose.x,TurboOddEvenLocator.ChipBroadClose.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//SubmitChip
export const SubmitChip = async () => {
  try {
      await utils.clickPos(TurboOddEvenLocator.ChipBroadAccept.x,TurboOddEvenLocator.ChipBroadAccept.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Select Bet pos Big or Small
export const SelectPos = async(_pos) => {
  let _acpos = `Pos${_pos}`
  await utils.clickPos(TurboOddEvenLocator[_acpos].x,TurboOddEvenLocator[_acpos].y)//click bet position
}

//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await utils.clickPos(TurboOddEvenLocator.Preset.x,TurboOddEvenLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await utils.clickPos(TurboOddEvenLocator[_prechip].x,TurboOddEvenLocator[_prechip].y)
  await utils.clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await utils.clickPos(TurboOddEvenLocator.PresetClear.x,TurboOddEvenLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:'ImgCompare_TurboOddEven_History.png',clip:{x: TurboOddEvenLocator.History.left,
  //   y: TurboOddEvenLocator.History.top,
  //  width: TurboOddEvenLocator.History.width,
  //  height: TurboOddEvenLocator.History.height}})
  const _result0= await utils.findImage(TurboOddEvenLocator.History.ImageCompare,TurboOddEvenLocator.History)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  // await page.screenshot({path:'ImgCompare_TurboOddEven_Preset.png',clip:{x: TurboOddEvenLocator.Preset.left,
  //   y: TurboOddEvenLocator.Preset.top,
  //  width: TurboOddEvenLocator.Preset.width,
  //  height: TurboOddEvenLocator.Preset.height}})
  const _result0= await utils.findImage(TurboOddEvenLocator.Preset.ImageCompare, TurboOddEvenLocator.Preset)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyGuideContent = async() => {
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ TurboOddEvenLocator.Guide.ImageCompare1, TurboOddEvenLocator.Guide.ImageCompare2, TurboOddEvenLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:`ImgCompare_TurboOddEven_Guide_${t+1}.png`,clip:{
    // x: TurboOddEvenLocator.Guide.left,
    //   y: TurboOddEvenLocator.Guide.top,
    //  width: TurboOddEvenLocator.Guide.width,
    //  height: TurboOddEvenLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],TurboOddEvenLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  // await page.screenshot({path:'ImgCompare_TurboOddEven_StatisticResult.png',clip:{x: TurboOddEvenLocator.StatisticResult.left,
  //   y: TurboOddEvenLocator.StatisticResult.top,
  //  width: TurboOddEvenLocator.StatisticResult.width,
  //  height: TurboOddEvenLocator.StatisticResult.height}})
  //  await utils.clickPos(TurboOddEvenLocator.StatisticPoint.x,TurboOddEvenLocator.StatisticPoint.y)
  //  await page.screenshot({path:'ImgCompare_TurboOddEven_StatisticPoint.png',clip:{x: TurboOddEvenLocator.StatisticPoint.left,
  //   y: TurboOddEvenLocator.StatisticPoint.top,
  //  width: TurboOddEvenLocator.StatisticPoint.width,
  //  height: TurboOddEvenLocator.StatisticPoint.height}})
  //Verify Statistic Result
  const _result1= await utils.findImage(TurboOddEvenLocator.StatisticResult.ImageCompare,TurboOddEvenLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true)    

  //Verify Statistic Point
  await utils.clickPos(TurboOddEvenLocator.StatisticPoint.x,TurboOddEvenLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
  TurboOddEvenLocator.StatisticPoint.ImageCompare,TurboOddEvenLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true)    

}

//Is Round Error after betting
export const IsBetFail = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('{"clturbo":{"err'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}

export const CheckSettleBalance = async(_beforebalance) => {
  let d= await GetWinLossResult()
  console.log('Is Win: ',d.win, d.stake)
  await utils.sleep(500)
  let _afterbalance = await GameLobbyFunc.getBalance()
  console.log('Compare Balance: ',_afterbalance,_beforebalance,_beforebalance + d.stake)
}


export const GetBalanceAfterBet = async () => {
  try {
      let _found = await utils.getWsMessage('{"clturbo":{"clturbo":{"red_me_')
      const obj = JSON.parse(_found);
      let _result = jp.query(obj, `$..red`);
       return _result[0]
      } catch (e) {
      console.error(e)
  }
}



///////////////////////////////////////////////////////////

