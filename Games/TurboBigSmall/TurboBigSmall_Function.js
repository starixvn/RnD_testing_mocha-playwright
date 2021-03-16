import * as utils from '../../util/utils'
import {TurboBigSmallLocator} from './TurboBigSmall_Locator'
import * as config from '../../config/config'
import * as GameLobbyFunc from '../GameLobby_Function'
var jp = require('jsonpath');

export const CloseGame = async() => {
  await utils.clickPos(TurboBigSmallLocator.Close.x,TurboBigSmallLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(TurboBigSmallLocator.Big)
  await utils.shouldBeEqual(flag.Val,true)
}

export const OpenHistory = async() => {
  await utils.clickPos(TurboBigSmallLocator.History.x ,TurboBigSmallLocator.History.y)
  await utils.sleep(500)

}

export const CloseHistory = async() => {
  await utils.clickPos(TurboBigSmallLocator.HistoryClose.x,TurboBigSmallLocator.HistoryClose.y )
  await utils.sleep(500) 
}

export const OpenGuide = async() => {
  await utils.clickPos(TurboBigSmallLocator.Guide.x,TurboBigSmallLocator.Guide.y )
  await utils.sleep(500)
}

export const CloseGuide = async() => {
  await utils.clickPos(TurboBigSmallLocator.GuideClose.x,TurboBigSmallLocator.GuideClose.y )
  await utils.sleep(500)
}

export const OpenStatistic = async() => {
  await utils.clickPos(TurboBigSmallLocator.Statistic.x,TurboBigSmallLocator.Statistic.y )
  await utils.sleep(500)

}

export const CloseStatistic = async() => {
  await utils.clickPos(TurboBigSmallLocator.StatisticClose.x,TurboBigSmallLocator.StatisticClose.y )
  await utils.sleep(500)
}

export const OpenPreset = async() => {
  await utils.clickPos(TurboBigSmallLocator.Preset.x,TurboBigSmallLocator.Preset.y )
  await utils.sleep(500)

}

export const ClosePreset = async() => {
  await utils.clickPos(TurboBigSmallLocator.PresetClose.x,TurboBigSmallLocator.PresetClose.y )
  await utils.sleep(500)
}


export const VerifySignInSuccessfully = async() => {
  // Verify TurboBigSmall Title
  const _title= await utils.findImage(TurboBigSmallLocator.Title.ImageCompare,TurboBigSmallLocator.Title)
  await utils.shouldBeEqual(_title.Val,true)  
  //Verify Big
  const _big= await utils.findImage(TurboBigSmallLocator.Big.ImageCompare,TurboBigSmallLocator.Big)
  await utils.shouldBeEqual(_big.Val,true)  
  // Verify Small
  const _small= await utils.findImage(TurboBigSmallLocator.Small.ImageCompare,TurboBigSmallLocator.Small)
  await utils.shouldBeEqual(_small.Val,true)  
  // Verify odd
  const _odd= await utils.findImage(TurboBigSmallLocator.Odds.ImageCompare,TurboBigSmallLocator.Odds)
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
        await utils.clickPos(TurboBigSmallLocator[_cnumber].x,TurboBigSmallLocator[_cnumber].y)
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
      //console.log('Verify Stake: ',_pos,': ',_stake)
      //Precondition convert Big --> tai, Small --> xiu
      let findmsg,_found
      if (_pos == "Big"){
          findmsg = `42/user/txturbo,["TXTurbo",{"ownBets":{"big":${_stake}}`
          _found = await utils.wsFindMessage(findmsg)
          }

       else if(_pos == "Small"){
        findmsg = `42/user/txturbo,["TXTurbo",{"ownBets":{"small":${_stake}}`
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
    let _found = await utils.getWsMessage('42/user/txturbo,["TXTurbo",{"status":')
    const res = String(_found).split("42/user/txturbo,");
    const obj = JSON.parse(res[1]);
    let _result = jp.query(obj[1],`$..win`);
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
  await utils.sleep(1000)
  let _found, _result
  _result = wsMessageReceived.filter(element => element.includes(`42/user/txturbo,["TXTurbo",{"endBet":-1,"notice":"${_msg}"}]`));
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
      await utils.clickPos(TurboBigSmallLocator.ChipBroadClear.x,TurboBigSmallLocator.ChipBroadClear.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Close Bet Chip
export const CloseChipBoard = async () => {
  try {
      await utils.clickPos(TurboBigSmallLocator.ChipBroadClose.x,TurboBigSmallLocator.ChipBroadClose.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//SubmitChip
export const SubmitChip = async () => {
  try {
      await utils.clickPos(TurboBigSmallLocator.ChipBroadAccept.x,TurboBigSmallLocator.ChipBroadAccept.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Select Bet pos Big or Small
export const SelectPos = async(_pos) => {
  let _acpos = `Pos${_pos}`
  await utils.clickPos(TurboBigSmallLocator[_acpos].x,TurboBigSmallLocator[_acpos].y)//click bet position
}

//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await utils.clickPos(TurboBigSmallLocator.Preset.x,TurboBigSmallLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await utils.clickPos(TurboBigSmallLocator[_prechip].x,TurboBigSmallLocator[_prechip].y)
  await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await utils.clickPos(TurboBigSmallLocator.PresetClear.x,TurboBigSmallLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:'ImgCompare_TurboBigSmall_History.png',clip:{x: TurboBigSmallLocator.History.left,
  //   y: TurboBigSmallLocator.History.top,
  //  width: TurboBigSmallLocator.History.width,
  //  height: TurboBigSmallLocator.History.height}})
  const _result0= await utils.findImage(TurboBigSmallLocator.History.ImageCompare,TurboBigSmallLocator.History)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  // await page.screenshot({path:'ImgCompare_TurboBigSmall_Preset.png',clip:{x: TurboBigSmallLocator.Preset.left,
  //   y: TurboBigSmallLocator.Preset.top,
  //  width: TurboBigSmallLocator.Preset.width,
  //  height: TurboBigSmallLocator.Preset.height}})
  const _result0= await utils.findImage(TurboBigSmallLocator.Preset.ImageCompare, TurboBigSmallLocator.Preset)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyGuideContent = async() => {
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ TurboBigSmallLocator.Guide.ImageCompare1, TurboBigSmallLocator.Guide.ImageCompare2, TurboBigSmallLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:`ImgCompare_TurboBigSmall_Guide_${t+1}.png`,clip:{
    // x: TurboBigSmallLocator.Guide.left,
    //   y: TurboBigSmallLocator.Guide.top,
    //  width: TurboBigSmallLocator.Guide.width,
    //  height: TurboBigSmallLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],TurboBigSmallLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  // await page.screenshot({path:'ImgCompare_TurboBigSmall_StatisticResult.png',clip:{x: TurboBigSmallLocator.StatisticResult.left,
  //   y: TurboBigSmallLocator.StatisticResult.top,
  //  width: TurboBigSmallLocator.StatisticResult.width,
  //  height: TurboBigSmallLocator.StatisticResult.height}})
  //  await utils.clickPos(TurboBigSmallLocator.StatisticPoint.x,TurboBigSmallLocator.StatisticPoint.y)
  //  await page.screenshot({path:'ImgCompare_TurboBigSmall_StatisticPoint.png',clip:{x: TurboBigSmallLocator.StatisticPoint.left,
  //   y: TurboBigSmallLocator.StatisticPoint.top,
  //  width: TurboBigSmallLocator.StatisticPoint.width,
  //  height: TurboBigSmallLocator.StatisticPoint.height}})
  //Verify Statistic Result
  const _result1= await utils.findImage(TurboBigSmallLocator.StatisticResult.ImageCompare,TurboBigSmallLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true)    

  //Verify Statistic Point
  await utils.clickPos(TurboBigSmallLocator.StatisticPoint.x,TurboBigSmallLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
  TurboBigSmallLocator.StatisticPoint.ImageCompare,TurboBigSmallLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true)    

}

//Is Round Error after betting
export const IsBetFail = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('42/user/txturbo,["TXTurbo",{"endBet":-1,"notice'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}

export const CheckSettleBalance = async(_beforebalance) => {
  let d= await GetWinLossResult()
  console.log('Is Win: ',d.win, d.stake)
  await utils.sleep(2000)
  let _afterbalance = await GameLobbyFunc.getBalance()
  console.log('Compare Balance: ',_afterbalance,_beforebalance,_beforebalance + d.stake)
}


export const GetBalanceAfterBet = async () => {
  try {
    let _found = await utils.getWsMessage('42/user/txturbo,["TXTurbo",{"ownBets"')
    const res = String(_found).split("42/user/txturbo,");
    const obj = JSON.parse(res[1]);
    let _result = jp.query(obj,'$..user[red]');
       return _result[0]
      } catch (e) {
      console.error(e)
  }
}



///////////////////////////////////////////////////////////

