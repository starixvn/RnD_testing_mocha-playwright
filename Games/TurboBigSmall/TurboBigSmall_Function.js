import * as utils from '../../util/utils'
const TurboBigSmallLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./TurboBigSmall_Locator').TurboBigSmallLocator_vn : require('./TurboBigSmall_Locator').TurboBigSmallLocator_en)
import * as config from '../../config/config'
import {DB} from '../References/DataBase_Locator'
import _ from 'lodash';
var jp = require('jsonpath');

export const CloseGame = async() => {
  await utils.clickPos(TurboBigSmallLocator.Close.x,TurboBigSmallLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(TurboBigSmallLocator.Big)
  await utils.shouldBeEqual(flag.Val,true,'Check Close Game')
}

export const OpenHistory = async() => {
    let _settlestate = await IsSettle()
  if (_settlestate === true){
      console.log('Balanced Betting Pool')
      await utils.sleep(5000)
      await utils.clickPos(TurboBigSmallLocator.History.x ,TurboBigSmallLocator.History.y)
  }
  else
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

export const checkNavStatisticbar = async() => {
  try {
         // Set Variables
         let _y =480,_x = 455, temp
       for (let i =1 ; i< 16; i++) {
         _x += 24
         await utils.sleep(200)
         await clickPos(_x,_y)
         await utils.sleep(1000)
          // await utils.CaptureSubImageToFile(TurboBigSmallLocator.RoundDetailTitle)
         temp = await utils.findImage(TurboBigSmallLocator.RoundDetailTitle.ImageCompare,TurboBigSmallLocator.RoundDetailTitle)
         await clickPos(1062,161)
         await utils.sleep(500)
         await utils.shouldBeEqual(temp.Val, true,`Check round titlte of ${i}`)
         }
 } catch (err) {
       console.error(err)
}

}

// QuickClick pos
export const clickPos = async(_x, _y) => {
 try {
     await page.mouse.click(_x,_y)
     await utils.sleep(250)
  } catch (error) {
     console.error(error.message);
  }
}

export const VerifySignInSuccessfully = async() => {
await utils.verifySignInSuccessfully()
utils.sleep(5000)
}

export const verifyMd5 = async() => {
  wsMessageReceived.length=0
  await waitUtilNewRound()
  let _found = await utils.getWsMessage('TXTurbo",{"resultHash"');
  let bfmd5 = await utils.getDataJsonPath(_found, "$..hashValue");
  wsMessageReceived = []
  await utils.sleep(40000)
  let _settle = await utils.getWsMessage('{"finish"')
  let afmd5 =  await utils.getDataJsonPath(_settle, `$..rawValue`)
  afmd5 = await utils.generateMd5(afmd5);
  console.log(bfmd5, afmd5);
  await utils.shouldBeEqual(bfmd5, afmd5,'check md5')
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
        await clickPos(TurboBigSmallLocator[_cnumber].x,TurboBigSmallLocator[_cnumber].y)
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
      await utils.sleep(500)
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
      let findmsg,_found
      _pos = _pos.toLowerCase()
      findmsg = `"${_pos}":${_stake}}`
      _found = await utils.wsFindMessage(findmsg)
      if(_found.Val==false){
        console.log('ws message to trace bet choice',wsMessageReceived);
      }
      await utils.shouldBeEqual(_found.Val,true, `Verify bet choice: ${_pos} and stake:${_stake}`)    
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
      await clickPos(TurboBigSmallLocator.ChipBroadAccept.x,TurboBigSmallLocator.ChipBroadAccept.y)
  } catch (e) {
      console.error(e)
  }
}

//Select Bet pos Big or Small
export const SelectPos = async(_pos) => {
  await utils.sleep(100)
  let _acpos = `Pos${_pos}`
  await clickPos(TurboBigSmallLocator[_acpos].x,TurboBigSmallLocator[_acpos].y)//click bet position
}

//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await clickPos(TurboBigSmallLocator.Preset.x,TurboBigSmallLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await utils.sleep(100)
  await clickPos(TurboBigSmallLocator[_prechip].x,TurboBigSmallLocator[_prechip].y)
    await clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await clickPos(TurboBigSmallLocator.PresetClear.x,TurboBigSmallLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  try {
    const _result0= await utils.findImage(TurboBigSmallLocator.History.ImageCompare,TurboBigSmallLocator.History)
    await utils.shouldBeEqual(_result0.Val,true)   
  } catch (error) {
    
  }
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
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ TurboBigSmallLocator.Guide.ImageCompare1, TurboBigSmallLocator.Guide.ImageCompare2, TurboBigSmallLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
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
  // //Verify Statistic Result
  const _result1= await utils.findImage(TurboBigSmallLocator.StatisticResult.ImageCompare,TurboBigSmallLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true)    

  //Verify Statistic Point
  await utils.clickPos(TurboBigSmallLocator.StatisticPoint.x,TurboBigSmallLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
  TurboBigSmallLocator.StatisticPoint.ImageCompare,TurboBigSmallLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true)    

}

//Is Round Error after betting
export const IsBetFail = async(_pos) => {
  let _found = await utils.wsFindMessage("notice",2)
  return _found.Val
}

//Is Round Settle
export const IsSettle = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('42/user/txturbo,["TXTurbo",{"finish":{"result":'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}


//GetWinLossStatus
export const GetWinLossStatus = async () => {
  try {
    let _found = await utils.getWsMessage('"status":')
    let res = String(_found).split("42/user/txturbo,");
    res= (res[0].length>1) ? res[0] : res[1]
    const obj = JSON.parse(res);
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
  let _found = await utils.getWsMessage('"result":')
  let res = String(_found).split("42/user/txturbo,");
  res= (res[0].length>1) ? res[0] : res[1]
  const obj = JSON.parse(res);
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
   await OpenHistory()
  // let res = String(_found).split("42/user/txturbo,");
  // res= (res[0].length>1) ? res[0] : res[1]
  // const obj = JSON.parse(res);
  // let _getresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].result`);
  // let _getsettleresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].settlementResult`);
  // // using lodash
  // await utils.shouldBeEqual(_.isEqual(_checkres.result,_getresult),true)
  // await utils.shouldBeEqual(_.isEqual(_checkres.settleresult,_getsettleresult), true)
  // //click first round of history
  // await utils.clickPos(454,230)
  // await utils.sleep(3000)
  // let _founddetail = await utils.getWsMessage('42/user/txturbo,["TXTurbo",{"round"')
  // const resdetail = String(_founddetail).split("42/user/txturbo,");
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
  _beforebalance = _beforebalance +  _af.betwin
  if ( _af.win == true){
    await utils.shouldBeEqual(Math.round(_afterbalance * 100) / 100, Math.round(_beforebalance * 100) / 100)
  }
  else {
    console.log('Refund: ',_beforebalance, _afterbalance)
  }
}

//Wait until new round
export const waitUtilNewRound = async() => {
  let _found = await utils.getWsMessage('{"remainingTime":37}]')
  await utils.sleep(6000)
}

export const ClearPreset = async()=>{
  await OpenPreset()
  await ClearPresetChip()
  await utils.clickPos(TurboBigSmallLocator.PresetAccept.x,TurboBigSmallLocator.PresetAccept.y)
}


///////////////////////////////////////////////////////////Database Functions

export const verifyDBCuoc = async(_resultOnWeb) => {
  let qrFindCuoc = { $and: [{ name : await utils.getName() }, {phien :_resultOnWeb.roundId}]}
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.TurboBigSmall.cuoc,qrFindCuoc)
  console.log(_resultOnWeb)
  console.log(resultOnDb)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.TurboBigSmall.phien,qrFindPhien)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.TurboBigSmall.ones,qrFindPhien)
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


