import * as utils from '../../util/utils'
const TurboOddEvenLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./TurboOddEven_Locator').TurboOddEvenLocator_vn : require('./TurboOddEven_Locator').TurboOddEvenLocator_en)
import * as config from '../../config/config'
import {DB} from '../References/DataBase_Locator'
var jp = require('jsonpath');
import _ from 'lodash';


// QuickClick pos
export const clickPos = async(_x, _y) => {
  try {
      await page.mouse.click(_x,_y)
      await utils.sleep(250)
   } catch (error) {
      console.error(error.message);
   }
 }

export const CloseGame = async() => {
  await clickPos(TurboOddEvenLocator.Close.x,TurboOddEvenLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(TurboOddEvenLocator.Even)
  await utils.shouldBeEqual(flag.Val,true)
}

export const OpenHistory = async() => {
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      console.log('Balanced Betting Pool')
      await utils.sleep(5000)
      await clickPos(TurboOddEvenLocator.History.x ,TurboOddEvenLocator.History.y)
  }
  else
  await clickPos(TurboOddEvenLocator.History.x ,TurboOddEvenLocator.History.y)
  await utils.sleep(500)
}

//Is Round Settle
export const IsSettle = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('42/user/oeturbo,["OETurbo",{"finish":{"result":'));
    if (_found.length > 0){
    return true
  }
  else
  return false
}


export const CloseHistory = async() => {
  await clickPos(TurboOddEvenLocator.HistoryClose.x,TurboOddEvenLocator.HistoryClose.y )
  await utils.sleep(500) 
}

export const OpenGuide = async() => {
  await clickPos(TurboOddEvenLocator.Guide.x,TurboOddEvenLocator.Guide.y )
  await utils.sleep(500)
}

export const CloseGuide = async() => {
  await clickPos(TurboOddEvenLocator.GuideClose.x,TurboOddEvenLocator.GuideClose.y )
  await utils.sleep(500)
}

export const OpenStatistic = async() => {
  await clickPos(TurboOddEvenLocator.Statistic.x,TurboOddEvenLocator.Statistic.y )
  await utils.sleep(500)

}

export const CloseStatistic = async() => {
  await clickPos(TurboOddEvenLocator.StatisticClose.x,TurboOddEvenLocator.StatisticClose.y )
  await utils.sleep(500)
}

export const OpenPreset = async() => {
  await clickPos(TurboOddEvenLocator.Preset.x,TurboOddEvenLocator.Preset.y )
  //await utils.sleep(200)

}

export const ClosePreset = async() => {
  await clickPos(TurboOddEvenLocator.PresetClose.x,TurboOddEvenLocator.PresetClose.y )
  //await utils.sleep(200)
}

//Wait until new round
export const waitUtilNewRound = async() => {
  // const _title= await utils.findImage(TurboOddEvenLocator.NewRound.ImageCompare,TurboOddEvenLocator.NewRound)
  let _found = await utils.getWsMessage('42/user/oeturbo,["OETurbo",{"remainingTime":36}]')
  await utils.sleep(6000)
  // await utils.CaptureSubImageToFile(TurboOddEvenLocator.NewRound)
  // console.log('new round ready')
}

export const VerifySignInSuccessfully = async() => {
  //capture screenshot
  // await utils.sleep(10000)
  // await utils.CaptureSubImageToFile(TurboOddEvenLocator.Title)
  // await utils.CaptureSubImageToFile(TurboOddEvenLocator.Odd)
  // await utils.CaptureSubImageToFile(TurboOddEvenLocator.Even)
  // await utils.CaptureSubImageToFile(TurboOddEvenLocator.Odds)
  // Verify TurboOddEven Title
  const _title= await utils.findImage(TurboOddEvenLocator.Title.ImageCompare,TurboOddEvenLocator.Title)
  await utils.shouldBeEqual(_title.Val,true)  
  //Verify Odd
  const _odd= await utils.findImage(TurboOddEvenLocator.Odd.ImageCompare,TurboOddEvenLocator.Odd)
  await utils.shouldBeEqual(_odd.Val,true)  
  // // Verify Even
  const _even= await utils.findImage(TurboOddEvenLocator.Even.ImageCompare,TurboOddEvenLocator.Even)
  await utils.shouldBeEqual(_even.Val,true)  
  // // Verify odds
  const _odds = await utils.findImage(TurboOddEvenLocator.Odds.ImageCompare,TurboOddEvenLocator.Odds)
  await utils.shouldBeEqual(_odds.Val,true)  
}


export const ClearPreset = async()=>{
  await OpenPreset()
  await ClearPresetChip()
  await clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)
}


//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='wait') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      await utils.sleep(300)
      await SelectPos(_pos)  //Big or Small
      // if stake = null --> place bet without select any chip (in this case user have set preset chip before)
      if (_stake != null)
      {
        const _cnumber = `Chip${_stake}`
        await clickPos(TurboOddEvenLocator[_cnumber].x,TurboOddEvenLocator[_cnumber].y)
      }
         //SubmitChip
      await SubmitChip()
      // Wait until betting success
      if (wait == 'wait'){
        _isfail = await IsBetFail(_pos.toLowerCase())
      }
      else {
        _isfail = false
      }
      await utils.sleep(200)
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
      let findmsg,_found
      _pos = _pos.toLowerCase()
      findmsg = `"${_pos}":${_stake}}`
     _found = await utils.wsFindMessage(findmsg,2)
      await utils.shouldBeEqual(_found.Val,true,`verify ${_pos} and ${_stake}`)    
  } catch (e) {
      console.error(e)
  }
}


// Verify error msg
export const VerifyErrorMessage = async(_msg) => {
    await utils.sleep(1000)
    let  _result =await utils.wsFindMessage(`${_msg}`,5);
    await utils.shouldBeEqual(_result.Val,true,'Verify error message')
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
  } catch (e) {
      console.error(e)
  }
}

//Select Bet pos Big or Small
export const SelectPos = async(_pos) => {
  await utils.sleep(100)
  let _acpos = `Pos${_pos}`
  await clickPos(TurboOddEvenLocator[_acpos].x,TurboOddEvenLocator[_acpos].y)//click bet position
}

//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await clickPos(TurboOddEvenLocator.Preset.x,TurboOddEvenLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await utils.sleep(100)
  await clickPos(TurboOddEvenLocator[_prechip].x,TurboOddEvenLocator[_prechip].y)
  await clickPos(TurboOddEvenLocator.PresetAccept.x,TurboOddEvenLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await clickPos(TurboOddEvenLocator.PresetClear.x,TurboOddEvenLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:TurboOddEvenLocator.History.ImageCompare,clip:{x: TurboOddEvenLocator.History.left,
  //   y: TurboOddEvenLocator.History.top,
  //  width: TurboOddEvenLocator.History.width,
  //  height: TurboOddEvenLocator.History.height}})
  const _result0= await utils.findImage(TurboOddEvenLocator.History.ImageCompare,TurboOddEvenLocator.History)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  // await page.screenshot({path:TurboOddEvenLocator.Preset.ImageCompare,clip:{x: TurboOddEvenLocator.Preset.left,
  //   y: TurboOddEvenLocator.Preset.top,
  //  width: TurboOddEvenLocator.Preset.width,
  //  height: TurboOddEvenLocator.Preset.height}})
  const _result0= await utils.findImage(TurboOddEvenLocator.Preset.ImageCompare, TurboOddEvenLocator.Preset)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ TurboOddEvenLocator.Guide.ImageCompare1, TurboOddEvenLocator.Guide.ImageCompare2, TurboOddEvenLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
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
  // await page.screenshot({path:TurboOddEvenLocator.StatisticResult.ImageCompare,clip:{x: TurboOddEvenLocator.StatisticResult.left,
  //   y: TurboOddEvenLocator.StatisticResult.top,
  //  width: TurboOddEvenLocator.StatisticResult.width,
  //  height: TurboOddEvenLocator.StatisticResult.height}})
  //  await utils.clickPos(TurboOddEvenLocator.StatisticPoint.x,TurboOddEvenLocator.StatisticPoint.y)
  //  await page.screenshot({path:TurboOddEvenLocator.StatisticPoint.ImageCompare,clip:{x: TurboOddEvenLocator.StatisticPoint.left,
  //   y: TurboOddEvenLocator.StatisticPoint.top,
  //  width: TurboOddEvenLocator.StatisticPoint.width,
  //  height: TurboOddEvenLocator.StatisticPoint.height}})
  // //Verify Statistic Result
  const _result1= await utils.findImage(TurboOddEvenLocator.StatisticResult.ImageCompare,TurboOddEvenLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true)    

  // //Verify Statistic Point
  await utils.clickPos(TurboOddEvenLocator.StatisticPoint.x,TurboOddEvenLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
  TurboOddEvenLocator.StatisticPoint.ImageCompare,TurboOddEvenLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true)    

}

//Is Round Error after betting
export const IsBetFail = async(_pos) => {
  let _found = await utils.wsFindMessage("notice",2)
  return _found.Val
}

//GetWinLossStatus
export const GetWinLossStatus = async () => {
  try {
    let _found = await utils.getWsMessage('42/user/oeturbo,["OETurbo",{"status":')
    const res = String(_found).split("42/user/oeturbo,");
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
  let _found = await utils.getWsMessage('42/user/oeturbo,["OETurbo",{"finish":{"result":')
  const res = String(_found).split("42/user/oeturbo,");
  const obj = JSON.parse(res[1]);
  let _roundid = jp.value(obj[1],`$..roundId`);
  let _result = jp.query(obj[1],`$..result`);
  let _settleresult = jp.query(obj[1],`$..settlementResult`);
  let _oddwin = jp.value(obj[1],`$..settlementResult.even`);
  let _choicewin = _oddwin
  if (_choicewin == true){
    _choicewin = 'Chẵn'
  }
  else {
    _choicewin = 'Lẻ'
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
  await utils.sleep(1000)
  let _found = await utils.getWsMessage('42/user/oeturbo,["OETurbo",{"history"')
  const res = String(_found).split("42/user/oeturbo,");
  const obj = JSON.parse(res[1]);
  let _getresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].result`);
  let _getsettleresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].settlementResult`);
  // using lodash
  await utils.shouldBeEqual(_.isEqual(_checkres.result,_getresult),true)
  await utils.shouldBeEqual(_.isEqual(_checkres.settleresult,_getsettleresult), true)
    // //click first round of history
    // await utils.clickPos(454,230)
    // await utils.sleep(3000)
    // let _founddetail = await utils.getWsMessage('42/user/oeturbo,["OETurbo",{"round"')
    // const resdetail = String(_founddetail).split("42/user/oeturbo,");
    // const objdetail = JSON.parse(resdetail[1]);
    // let username =  await utils.getName()
    //  //check data
    //  await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].win`),_checkres.win),true)
    //  await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].choice`),_checkres.betchoice),true)
    // await CloseHistory() // close round detail
    await CloseHistory() // close history
    wsMessageReceived =[]
 }


export const CheckSettleBalance = async() => {
  let _beforebalance = await utils.getBalance()
  let _af = await GetWinLossStatus()
  console.log('Is Win: ',_af.win, _af.betwin)
  await utils.sleep(3000)
  let _afterbalance = await utils.getBalance()
  console.log('betwin', _beforebalance , _af.betwin)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.TurboOddEven.cuoc,qrFindCuoc)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.TurboOddEven.phien,qrFindPhien)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.TurboOddEven.ones,qrFindPhien)
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
  // // Verify win
  // await utils.shouldBeEqual(resultOnDb.win,_resultOnWeb.win)
}
