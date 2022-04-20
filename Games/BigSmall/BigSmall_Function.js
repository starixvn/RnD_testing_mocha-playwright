import * as utils from '../../util/utils'
import * as config from '../../config/config'
let BigSmallLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./BigSmall_Locator').BigSmallLocator_vn : require('./BigSmall_Locator').BigSmallLocator_en)
import {DB} from '../References/DataBase_Locator'
import _ from 'lodash';
import { login_local } from '../References/MemberSite_Function';
var jp = require('jsonpath')

export const CloseGame = async() => {
  await utils.clickPos(BigSmallLocator.Close.x,BigSmallLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(BigSmallLocator.Big)
  await utils.shouldBeEqual(flag.Val,true)

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

//Wait until new round
export const waitUtilNewRound = async() => {
  let _found = await utils.getWsMessage('"remainingTime":61}]')
  await utils.sleep(11000)
  // /await utils.CaptureSubImageToFile(BigSmallLocator.NewRound)
  // const _title= await utils.findImage(BigSmallLocator.NewRound.ImageCompare,BigSmallLocator.NewRound)
}

export const OpenHistory = async() => {
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      await utils.sleep(5000)
      await utils.clickPos(BigSmallLocator.History.x,BigSmallLocator.History.y)
  }
  else
  await utils.clickPos(BigSmallLocator.History.x,BigSmallLocator.History.y)
}

export const CloseHistory = async() => {
  await utils.clickPos(BigSmallLocator.HistoryClose.x,BigSmallLocator.HistoryClose.y )
}

export const OpenGuide = async() => {
  await utils.clickPos(BigSmallLocator.Guide.x,BigSmallLocator.Guide.y )
  await utils.sleep(1000)

}

export const CloseGuide = async() => {
  await utils.clickPos(BigSmallLocator.GuideClose.x,BigSmallLocator.GuideClose.y )
}

export const OpenStatistic = async() => {
  await utils.clickPos(BigSmallLocator.Statistic.x,BigSmallLocator.Statistic.y )
}

export const CloseStatistic = async() => {
  await utils.clickPos(BigSmallLocator.StatisticClose.x,BigSmallLocator.StatisticClose.y )
}

export const OpenPreset = async() => {
  await clickPos(BigSmallLocator.Preset.x,BigSmallLocator.Preset.y)
}

export const ClosePreset = async() => {
  await clickPos(BigSmallLocator.PresetClose.x,BigSmallLocator.PresetClose.y )
}


export const verifyMd5 = async() => {
  wsMessageReceived = []
  await waitUtilNewRound()
  let _found = await utils.getWsMessage("resultHash");
  let bfmd5 = await utils.getDataJsonPath(_found, "$..hashValue");
  wsMessageReceived = []
  await utils.sleep(40000)
  let _settle = await utils.getWsMessage('["BigSmall",{"finish"')
  let afmd5 =  await utils.getDataJsonPath(_settle, `$..rawValue`)
  afmd5 = await utils.generateMd5(afmd5);
  console.log(bfmd5, afmd5);
  await utils.shouldBeEqual(bfmd5, afmd5,'check md5')
}


export const VerifySignInSuccessfully = async() => {
  // const _big= await utils.findImage(BigSmallLocator.Big.ImageCompare,BigSmallLocator.Big)
  // await utils.shouldBeEqual(_big.Val,true,'Check big')  
  // const _small= await utils.findImage(BigSmallLocator.Small.ImageCompare,BigSmallLocator.Small)
  // await utils.shouldBeEqual(_small.Val,true,'Check small')  
  let found =await utils.wsFindMessage('signedIn')
  await utils.shouldBeEqual(found.Val, true,'Check login success')
  utils.sleep(5000)
}


//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='wait') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      await utils.sleep(100)
      await clickPos(BigSmallLocator[`Pos${_pos}`].x,BigSmallLocator[`Pos${_pos}`].y)//click bet position
      // if stake = null --> place bet without select any chip (in this case user have set preset chip before)
      if (_stake != null)
          {
            const _cnumber = `Chip${_stake}`
            await clickPos(BigSmallLocator[`Chip${_stake}`].x,BigSmallLocator[`Chip${_stake}`].y)
          }
      //SubmitChip
      await clickPos(BigSmallLocator.ChipBroadAccept.x,BigSmallLocator.ChipBroadAccept.y)
      // Wait until betting success
      if (wait == 'wait')
          {
            _isfail = await IsBetFail(_pos,_stake)
          }
      // set _isfail value to exit loop
      else 
          {
            _isfail = false
          }
      //exit loop if bet success
      if (_isfail === false )
          {
            await utils.sleep(100)
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
      let findmsg,_found
      _pos = _pos.toLowerCase()
      findmsg = `"${_pos}":${_stake}}`
     _found = await utils.wsFindMessage(findmsg,3)
      //  if(_found.Val==false){
      //    console.log('ws message to trace bet choice',wsMessageReceived);
      //  }
       await utils.shouldBeEqual(_found.Val,true, `Verify bet choice : ${_pos} and stake : ${_stake} `)    
   } catch (e) {
      console.error(e)
  }
}


// Verify error msg
export const VerifyErrorMessage = async(_msg) => {
  await utils.sleep(1000)
  let  _result =await utils.wsFindMessage(`${_msg}`,2);
  await utils.shouldBeEqual(_result.Val,true,'Verify error message')
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

//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await OpenPreset()
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await clickPos(BigSmallLocator[_prechip].x,BigSmallLocator[_prechip].y)
  await clickPos(BigSmallLocator.PresetAccept.x,BigSmallLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await clickPos(BigSmallLocator.PresetClear.x,BigSmallLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  await utils.sleep(2000)
  await page.screenshot({path:BigSmallLocator.History.ImageCompare,clip:{x: BigSmallLocator.History.left,
    y: BigSmallLocator.History.top,
   width: BigSmallLocator.History.width,
   height: BigSmallLocator.History.height}})
  // const _result0= await utils.findImage(BigSmallLocator.History.ImageCompare,BigSmallLocator.History)
  // await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  await utils.sleep(2000)
  // await page.screenshot({path:BigSmallLocator.Preset.ImageCompare,clip:{x: BigSmallLocator.Preset.left,
  //   y: BigSmallLocator.Preset.top,
  //  width: BigSmallLocator.Preset.width,
  //  height: BigSmallLocator.Preset.height}})
  const _result0= await utils.findImage(BigSmallLocator.Preset.ImageCompare, BigSmallLocator.Preset)
  await utils.shouldBeEqual(_result0.Val,true,`Verify Preset content`)    
}

export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ BigSmallLocator.Guide.ImageCompare1, BigSmallLocator.Guide.ImageCompare2, BigSmallLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
    // x: BigSmallLocator.Guide.left,
    //   y: BigSmallLocator.Guide.top,
    //  width: BigSmallLocator.Guide.width,
    //  height: BigSmallLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],BigSmallLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true,`Verify Guide content ${_AcheckImage[t]}`)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  await utils.sleep(2000)
//  await page.screenshot({path:BigSmallLocator.StatisticResult.ImageCompare,clip:{x: BigSmallLocator.StatisticResult.left,
//     y: BigSmallLocator.StatisticResult.top,
//    width: BigSmallLocator.StatisticResult.width,
//    height: BigSmallLocator.StatisticResult.height}})
//    await utils.clickPos(BigSmallLocator.StatisticPoint.x,BigSmallLocator.StatisticPoint.y)
//    await page.screenshot({path:BigSmallLocator.StatisticPoint.ImageCompare,clip:{x: BigSmallLocator.StatisticPoint.left,
//     y: BigSmallLocator.StatisticPoint.top,
//    width: BigSmallLocator.StatisticPoint.width,
//    height: BigSmallLocator.StatisticPoint.height}})
  // Verify Statistic Result
  const _result1= await utils.findImage(BigSmallLocator.StatisticResult.ImageCompare,BigSmallLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true,'Verify statistic result')    
  await utils.sleep(1000)
  //Verify Statistic Point
  await utils.clickPos(BigSmallLocator.StatisticPoint.x,BigSmallLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
    BigSmallLocator.StatisticPoint.ImageCompare,BigSmallLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true,'Verify statistic point')    
}


//Is Round Error after betting
export const IsBetFail = async(_pos,_stake) => {
  let _found = await utils.wsFindMessage("notice",2)
  //console.log('bet fai: ',_found.Val,'pos: ', _pos,'stake: ',_stake)
  return _found.Val
  // let _found = wsMessageReceived.filter(element => element.includes(`42/user/taixiu,["taixiu",{"endBet":-1,"betChoice":"${_pos}","notice"`));
  // if (_found.length > 0){
  //   return true
  // }
  // else
  // return false
}

//Is Round Settle
export const IsSettle = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('{"finish":{"result":'));
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
      let res = String(_found).split("42/user/taixiu,");
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
  let _found = await utils.getWsMessage('"result"')
  let res = String(_found).split("42/user/taixiu,");
  res= (res[0].length>1) ? res[0] : res[1]
  const obj = JSON.parse(res);
  let _roundid = jp.value(obj[1],`$..roundId`);
  let _result = jp.query(obj[1],`$..result`);
  let _settleresult = jp.query(obj[1],`$..settlementResult`);
  let _bigwin = jp.value(obj[1],`$..settlementResult.big`);
  let _choicewin = _bigwin
  if (_choicewin == true){
       _choicewin = process.env.npm_config_cf_lang  == 'vn'?'Tài':'Big'
  }
  else {
    _choicewin = process.env.npm_configcf_cf_lang  == 'vn'? 'Xỉu':'Small'
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
  wsMessageReceived.length=0
  await OpenHistory()

  // let _found = await utils.getWsMessage('history')
   let _found = await utils.findImage(BigSmallLocator.History)
  // console.log('history',_found.Val);
  await utils.shouldBeEqual(_found.Val, true,'check history image')

  // const res = String(_found).split("42/user/taixiu,");
  // const obj = JSON.parse(_found);
  // let _getresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].result`);
  // let _getsettleresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].settlementResult`);
  // // using lodash
  // await utils.shouldBeEqual(_.isEqual(_checkres.result,_getresult),true)
  // await utils.shouldBeEqual(_.isEqual(_checkres.settleresult,_getsettleresult), true)



  // Check Round History Detail
  // //click first round of history
  // await utils.clickPos(454,230)
  // await utils.sleep(3000)
  // let _founddetail = await utils.getWsMessage('42/user/taixiu,["taixiu",{"round"')
  // const resdetail = String(_founddetail).split("42/user/taixiu,");
  // const objdetail = JSON.parse(resdetail[1]);
  // let username =  await utils.getName()
  // await CloseHistory() // close round detail
  await CloseHistory() // close history
  wsMessageReceived =[]
   //check data
  // await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].win`),_checkres.win),true)
  // await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].choice`),_checkres.betchoice),true)
}

export const CheckSettleBalance = async() => {
  let _beforebalance = await utils.getBalance()
  let _af = await GetWinLossStatus()
  await utils.sleep(3000)
  let _afterbalance = await utils.getBalance()
  _beforebalance = _beforebalance +  _af.betwin
  if ( _af.win == true){
    await utils.shouldBeEqual(Math.round(_afterbalance * 100) / 100, Math.round(_beforebalance * 100) / 100,'Check Settle Balance')
  }
  else {
    console.log('Refund: ',_beforebalance, _afterbalance)
  }
  await utils.sleep(8000)
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
          temp = await utils.findImage(BigSmallLocator.RoundDetailTitle.ImageCompare,BigSmallLocator.RoundDetailTitle)
          await clickPos(1062,161)
          await utils.sleep(500)
          await utils.shouldBeEqual(temp.Val, true,`Check round titlte of ${i}`)
          }
  } catch (err) {
        console.error(err)
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
