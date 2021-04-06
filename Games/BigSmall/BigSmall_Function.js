import * as utils from '../../util/utils'
import {BigSmallLocator} from './BigSmall_Locator'
import * as config from '../../config/config'
import * as GameLobbyFunc from '../GameLobby_Function'
import _ from 'lodash';
var jp = require('jsonpath');

export const CloseGame = async() => {
  await utils.clickPos(BigSmallLocator.Close.x,BigSmallLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(BigSmallLocator.Big)
  await utils.shouldBeEqual(flag.Val,true)

}

export const OpenHistory = async() => {
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      console.log('Balanced Betting Pool')
      await utils.sleep(5000)
      await utils.clickPos(BigSmallLocator.History.x,BigSmallLocator.History.y)
  }
  else
  await utils.clickPos(BigSmallLocator.History.x,BigSmallLocator.History.y)
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
    const _title= await utils.findImage(BigSmallLocator.Title.ImageCompare,BigSmallLocator.Title)
    await utils.shouldBeEqual(_title.Val,true)  
  // Verify Big
  const _big= await utils.findImage(BigSmallLocator.Big.ImageCompare,BigSmallLocator.Big)
  await utils.shouldBeEqual(_big.Val,true)  
  // Verify Small
  const _small= await utils.findImage(BigSmallLocator.Small.ImageCompare,BigSmallLocator.Small)
  await utils.shouldBeEqual(_small.Val,true)  
  // Verify odd
  const _odd= await utils.findImage(BigSmallLocator.Odds.ImageCompare,BigSmallLocator.Odds)
  await utils.shouldBeEqual(_odd.Val,true)  
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
      await utils.sleep(500)
      // if stake = null --> place bet without select any chip (in this case user have set preset chip before)
      if (_stake != null)
      {
        const _cnumber = `Chip${_stake}`
        await utils.clickPos(BigSmallLocator[_cnumber].x,BigSmallLocator[_cnumber].y)
        await utils.sleep(500)
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
      await utils.sleep(1000)
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
    //console.log('Verify Bet Stake: ',_pos,'Stake: ',_stake)
      //Precondition convert Big --> tai, Small --> xiu
      let findmsg,_found
      if (_pos == "Big"){
          findmsg = `42/user/taixiu,["taixiu",{"ownBets":{"big":${_stake}}`
          _found = await utils.wsFindMessage(findmsg)
       }

       else if(_pos == "Small"){
          findmsg = `42/user/taixiu,["taixiu",{"ownBets":{"small":${_stake}}`
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
      let _found = await utils.getWsMessage('42/user/taixiu,["taixiu",{"status":')
      const res = String(_found).split("42/user/taixiu,");
      const obj = JSON.parse(res[1]);
      let _result = jp.query(obj[1],`$..win`);
      let _betstake
      if (_result == 'false'){
        _betstake = 0
      }
      else
      {
        let _astake = jp.query(obj[1], `$..bet`);
        _betstake = _astake[0]
      }
      return {win: _result[0], stake: _betstake }
      
  } catch (e) {
      console.error(e)
  }
}

// Verify error msg
export const VerifyErrorMessage = async(_msg) => {
  await utils.sleep(1000)
  let _found, _result
  _result = wsMessageReceived.filter(element => element.includes(`42/user/taixiu,["taixiu",{"endBet":-1,"notice":"${_msg}"}]`));
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

//Select Bet pos Big or Small
export const SelectPos = async(_pos) => {
  let _acpos = `Pos${_pos}`
  await utils.clickPos(BigSmallLocator[_acpos].x,BigSmallLocator[_acpos].y)//click bet position
}

//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await utils.clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await utils.clickPos(BigSmallLocator[_prechip].x,BigSmallLocator[_prechip].y)
  await utils.clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await utils.clickPos(BigSmallLocator.PresetClear.x,BigSmallLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:'ImgCompare_BigSmall_History.png',clip:{x: BigSmallLocator.History.left,
  //   y: BigSmallLocator.History.top,
  //  width: BigSmallLocator.History.width,
  //  height: BigSmallLocator.History.height}})
  const _result0= await utils.findImage(BigSmallLocator.History.ImageCompare,BigSmallLocator.History)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  // await page.screenshot({path:'ImgCompare_BigSmall_Preset.png',clip:{x: BigSmallLocator.Preset.left,
  //   y: BigSmallLocator.Preset.top,
  //  width: BigSmallLocator.Preset.width,
  //  height: BigSmallLocator.Preset.height}})
  const _result0= await utils.findImage(BigSmallLocator.Preset.ImageCompare, BigSmallLocator.Preset)
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
    const _result = await utils.findImage(_AcheckImage[t],BigSmallLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
//  await page.screenshot({path:'ImgCompare_BigSmall_StatisticResult.png',clip:{x: BigSmallLocator.StatisticResult.left,
//     y: BigSmallLocator.StatisticResult.top,
//    width: BigSmallLocator.StatisticResult.width,
//    height: BigSmallLocator.StatisticResult.height}})
//    await utils.clickPos(BigSmallLocator.StatisticPoint.x,BigSmallLocator.StatisticPoint.y)
//    await page.screenshot({path:'ImgCompare_BigSmall_StatisticPoint.png',clip:{x: BigSmallLocator.StatisticPoint.left,
//     y: BigSmallLocator.StatisticPoint.top,
//    width: BigSmallLocator.StatisticPoint.width,
//    height: BigSmallLocator.StatisticPoint.height}})
  //// Verify Statistic Result
  const _result1= await utils.findImage(BigSmallLocator.StatisticResult.ImageCompare,BigSmallLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true)    

  //Verify Statistic Point
  await utils.clickPos(BigSmallLocator.StatisticPoint.x,BigSmallLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
    BigSmallLocator.StatisticPoint.ImageCompare,BigSmallLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true)    

}

//Is Round Error after betting
export const IsBetFail = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('42/user/taixiu,["taixiu",{"endBet":-1,"notice'));
  // const res = String(_found).split("42/user/taixiu,");
  // const obj = JSON.parse(res[1]);
  if (_found.length > 0){
    return true
  }
  else
  return false
}

//Is Round Settle
export const IsSettle = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('42/user/taixiu,["taixiu",{"finish":{"result":'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}

//Get Settle Result
export const GetSettleResult = async() => {
  let _found = await utils.getWsMessage('42/user/taixiu,["taixiu",{"finish":{"result":')
  const res = String(_found).split("42/user/taixiu,");
  const obj = JSON.parse(res[1]);
  let _roundid = jp.query(obj[1],`$..roundId`);
  let _result = jp.query(obj[1],`$..result`);
  let _settleresult = jp.query(obj[1],`$..settlementResult`);
  let _bigwin = jp.value(obj[1],`$..settlementResult.big`);
  let _choicewin = _bigwin
  if (_choicewin == true){
    _choicewin = 'Tài'
  }
  else {
    _choicewin = 'Xỉu'
  }
  return { result : _result , roundid : _roundid[0], settleresult : _settleresult, choicewin : _choicewin}
}

//Check Round History
export const CheckRoundHistory = async() => {
  let _checkres = await GetSettleResult()
  await OpenHistory()
  await utils.sleep(3000)
  let _found = await utils.getWsMessage('42/user/taixiu,["taixiu",{"history"')
  const res = String(_found).split("42/user/taixiu,");
  const obj = JSON.parse(res[1]);
  let _getresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundid})].result`);
  let _getsettleresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundid})].settlementResult`);
  // using lodash
  await utils.shouldBeEqual(_.isEqual(_checkres.result,_getresult),true)
  await utils.shouldBeEqual(_.isEqual(_checkres.settleresult,_getsettleresult), true)
  await CloseHistory()
}

export const CheckSettleBalance = async() => {
  let _beforebalance = await utils.getBalance()
  let _af = await GetWinLossResult()
  console.log('Is Win: ',_af.win, _af.stake)
  await utils.sleep(1000)
  let _afterbalance = await utils.getBalance()
  _beforebalance = _beforebalance +  _af.stake
  await utils.shouldBeEqual(Math.round(_afterbalance * 100) / 100, Math.round(_beforebalance * 100) / 100)
  console.log('Compare Balance: ',_afterbalance,_beforebalance)
}


///////////////////////////////////////////////////////////

