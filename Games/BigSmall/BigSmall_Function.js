import * as utils from '../../util/utils'
import {BigSmallLocator} from './BigSmall_Locator'
import {DB} from './../DataBase_Locator'
import * as config from '../../config/config'
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
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      console.log('Balanced Betting Pool')
      await utils.sleep(5000)
      await utils.clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y)
  }
  else
  await utils.clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y)
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
      await utils.sleep(500)
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
      else {
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

//VerifyBetStake
export const VerifyBetStake = async (_pos,_stake) => {
  try {
    //console.log('Verify Bet Stake: ',_pos,'Stake: ',_stake)
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
  await OpenPreset()
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

//GetWinLossStatus
export const GetWinLossStatus = async () => {
  try {
      let _found = await utils.getWsMessage('42/user/taixiu,["taixiu",{"status":')
      const res = String(_found).split("42/user/taixiu,");
      const obj = JSON.parse(res[1]);
      let _result = jp.value(obj[1],`$..win`);
      let _gbetchoice = jp.value(obj[1],`$..winningByChoices`)
      let _betwin
      if (_result == 'false'){
        _betwin = 0  //rule cân cửa
      }
      else
      {
        _betwin = jp.value(obj, `$..bet`);
      }
      let _betchoice = Object.keys(_gbetchoice)[0]
      return {win: _result , betwin: _betwin ,betchoice:  _betchoice}
      
  } catch (e) {
      console.error(e)
  }
}

//Get Settle Result
export const GetSettleResult = async(_stake=null) => {
  let _time = new Date().toISOString()
  let _found = await utils.getWsMessage('42/user/taixiu,["taixiu",{"finish":{"result":')
  const res = String(_found).split("42/user/taixiu,");
  const obj = JSON.parse(res[1]);
  let _roundid = jp.value(obj[1],`$..roundId`);
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
  // Get bet win stake
  let _getwinstake = await GetWinLossStatus()
  return { 
            result : _result , 
            roundId : _roundid,
            settleresult : _settleresult, 
            choicewin : _choicewin, 
            win: _getwinstake.win ,
            betwin : _getwinstake.betwin, 
            time: _time, 
            betchoice: _getwinstake.betchoice, 
            stake: _stake 
          }
}

//Check Round History
export const CheckRoundHistory = async() => {
  let _checkres = await GetSettleResult()
  await OpenHistory()
  await utils.sleep(3000)
  let _found = await utils.getWsMessage('42/user/taixiu,["taixiu",{"history"')
  const res = String(_found).split("42/user/taixiu,");
  const obj = JSON.parse(res[1]);
  let _getresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].result`);
  let _getsettleresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].settlementResult`);
  // using lodash
  await utils.shouldBeEqual(_.isEqual(_checkres.result,_getresult),true)
  await utils.shouldBeEqual(_.isEqual(_checkres.settleresult,_getsettleresult), true)
  // Check Round History Detail
  //click first round of history
  await utils.clickPos(454,230)
  await utils.sleep(3000)
  let _founddetail = await utils.getWsMessage('42/user/taixiu,["taixiu",{"round"')
  const resdetail = String(_founddetail).split("42/user/taixiu,");
  const objdetail = JSON.parse(resdetail[1]);
  let username =  await utils.getName()
   //check data
   await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].win`),_checkres.win),true)
   await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].choice`),_checkres.betchoice),true)
  await CloseHistory() // close round detail
  await CloseHistory() // close history
}

export const CheckSettleBalance = async() => {
  let _beforebalance = await utils.getBalance()
  let _af = await GetWinLossStatus()
  console.log('Is Win: ',_af.win, _af.betwin)
  await utils.sleep(1000)
  let _afterbalance = await utils.getBalance()
  _beforebalance = _beforebalance +  _af.betwin
  if ( _af.win == true){
    await utils.shouldBeEqual(Math.round(_afterbalance * 100) / 100, Math.round(_beforebalance * 100) / 100)
  }
  else {
    console.log('Refund: ',_beforebalance, _afterbalance)
  }
}


///////////////////////////////////////////////////////////Database Functions

export const verifyDBCuoc = async(_resultOnWeb) => {
  let qrFindCuoc = { $and: [{ name : await utils.getName() }, {phien :_resultOnWeb.roundId}]}
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BigSmall.cuoc,qrFindCuoc)
  // Verify _id is existed
  await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
  // Verify phien
  await utils.shouldBeEqual(resultOnDb.phien,_resultOnWeb.roundId)
  // // Verify win
  // await utils.shouldBeEqual(resultOnDb.win,_resultOnWeb.win)
  //Verify uid is existed
  await utils.shouldBeEqual(("uid" in resultOnDb),true,"uid column is not existed")
  // Verify MemberId
  await utils.shouldBeEqual(resultOnDb.memberId.toString(),await utils.getMemberId())
  // Verify name
  await utils.shouldBeEqual(resultOnDb.name,await utils.getName())
  // Verify siteId (hard code on Local)
  await utils.shouldBeEqual(resultOnDb.siteId,'4100300')
  // Verify betwin
  let netwin
  if(resultOnDb.win == true){
    netwin = _resultOnWeb.betwin -resultOnDb.amount
  }
  else{
    netwin = 0
  }
  await utils.shouldBeEqual(parseFloat(resultOnDb.betwin).toFixed(1),parseFloat(netwin).toFixed(1))
  // Verify time
  await utils.shouldBeEqual(
      (Math.abs(new Date(_resultOnWeb.time) -new Date(resultOnDb.time))/1000) < 60,
      true,"Settle time is incorrect")
  // Verify thanhtoan
  await utils.shouldBeEqual(resultOnDb.thanhtoan,true)
  //Verify Choice
  await utils.shouldBeEqual(resultOnDb.choice,_resultOnWeb.betchoice)
  // Table taixiu_cuocs - column win (true/false)
  await utils.shouldBeEqual(resultOnDb.win,_resultOnWeb.win)
  // Table taixiu_cuocs - column refund
  await utils.shouldBeEqual(("refund" in resultOnDb),true,"refund column is not existed")
  // Table taixiu_cuocs - column amount
  await utils.shouldBeEqual(("amount" in resultOnDb),true,"amount column is not existed")
}

export const verifyDBPhien = async(_resultOnWeb)=>{
  let qrFindPhien = { id :_resultOnWeb.roundId }
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BigSmall.phien,qrFindPhien)
  // Verify column _id is existed
  await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
  // Verify id
  await utils.shouldBeEqual(resultOnDb.id,_resultOnWeb.roundId)
  // Verify result
  await utils.shouldBeEqual(_.isEqual(resultOnDb.result,_resultOnWeb.result[0]),true)
  // Verify time
  await utils.shouldBeEqual(
      (Math.abs(new Date(_resultOnWeb.time) -new Date(resultOnDb.time))/1000) < 60,
      true,"Time is incorrect")
  // Verify Settlement result
  await utils.shouldBeEqual(_.isEqual(resultOnDb.settlementResult, _resultOnWeb.settleresult[0]),true)
}

export const verifyDBOnes = async(_resultOnWeb)=>{
  let qrFindPhien = { $and: [{ name : await utils.getName() }, {phien :_resultOnWeb.roundId}]}
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BigSmall.ones,qrFindPhien)
  // Verify column _id is existed
  await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
  // Verify phien
  await utils.shouldBeEqual(resultOnDb.phien,_resultOnWeb.roundId)
    //Verify uid is existed
    await utils.shouldBeEqual(("uid" in resultOnDb),true,"uid column is not existed")
  // Verify time
  await utils.shouldBeEqual(
      (Math.abs(new Date(_resultOnWeb.time) -new Date(resultOnDb.time))/1000) < 60,
      true,"Time is incorrect")
  // Verify amount
  await utils.shouldBeEqual(("amount" in resultOnDb),true,"amount column is not existed")    
  // Verify betwin
  let netwin
  if(resultOnDb.win == true){
    netwin = _resultOnWeb.betwin -resultOnDb.amount
  }
  else{
    netwin = 0
  }
  await utils.shouldBeEqual(parseFloat(resultOnDb.betwin).toFixed(1),parseFloat(netwin).toFixed(1))
  //Verify Choice
  await utils.shouldBeEqual(resultOnDb.choice,_resultOnWeb.betchoice)
  //Verify member id
  await utils.shouldBeEqual(Number(resultOnDb.memberId),Number(await utils.getMemberId()))
   //Verify name
   await utils.shouldBeEqual(resultOnDb.name,await utils.getName())
   // Verify odds
  await utils.shouldBeEqual(("odds" in resultOnDb),true,"odds column is not existed")    
   // Verify refund
   await utils.shouldBeEqual(("refund" in resultOnDb),true,"refund column is not existed")   
  // Verify siteid
  await utils.shouldBeEqual(("siteId" in resultOnDb),true,"siteId column is not existed")   
  // Verify thanhtoan
  await utils.shouldBeEqual(("thanhtoan" in resultOnDb),true,"thanhtoan column is not existed")   
  // Verify total amount
  await utils.shouldBeEqual(("totalAmount" in resultOnDb),true,"totalAmount: column is not existed")   
  // // Verify win ăn hành rule cân cửa
  // await utils.shouldBeEqual(resultOnDb.win,_resultOnWeb.win)
}
