import * as utils from '../../util/utils'
import * as config from '../../config/config'
let SpecialSedieLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./SpecialSedie_Locator').SpecialSedieLocator_vn : require('./SpecialSedie_Locator').SpecialSedieLocator_en)
import {DB} from '../References/DataBase_Locator'
import _ from 'lodash';
var jp = require('jsonpath')

export const CloseGame = async() => {
  await utils.clickPos(SpecialSedieLocator.CloseGame.x,SpecialSedieLocator.CloseGame.y )
}

//Wait until new round
export const waitUtilNewRound = async() => {
  let _found = await utils.getWsMessage('42/user/specialsedie,["SpecialSeDie",{"remainingTime":39}]')
  await utils.sleep(9000)
  // /await utils.CaptureSubImageToFile(SpecialSedieLocator.NewRound)
  // const _title= await utils.findImage(SpecialSedieLocator.NewRound.ImageCompare,SpecialSedieLocator.NewRound)
}

export const OpenHistory = async() => {
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      await utils.sleep(5000)
  }
  await utils.clickPos(SpecialSedieLocator.History.x,SpecialSedieLocator.History.y)
}

export const CloseHistory = async() => {
  await utils.clickPos(334,707 )
}

export const OpenGuide = async() => {
  await utils.clickPos(SpecialSedieLocator.BtnGuide.x,SpecialSedieLocator.BtnGuide.y )
  await utils.sleep(1000)

}

export const CloseGuide = async() => {
  await utils.clickPos(SpecialSedieLocator.BtnHome.x,SpecialSedieLocator.BtnHome.y )
}

export const OpenStatistic = async() => {
  await utils.clickPos(SpecialSedieLocator.BtnStatistic.x,SpecialSedieLocator.BtnStatistic.y )
}

export const CloseStatistic = async() => {
  await utils.clickPos(SpecialSedieLocator.BtnHome.x,SpecialSedieLocator.BtnHome.y )
}


export const VerifySignInSuccessfully = async() => {
  let val=  await utils.wsFindMessage('42/user/specialsedie,["signedIn"]')
  await utils.shouldBeEqual(val.Val, true,'Can not open SpecialSedie game')
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await utils.clickPos(SpecialSedieLocator.PresetClear.x,SpecialSedieLocator.PresetClear.y)
}


//Preset Chip
export const PresetChip = async(_chip,_clear='clear') => {
  await utils.clickPos(SpecialSedieLocator.Preset.x,SpecialSedieLocator.Preset.y)
  const _prechip = `PresetChip${_chip}`
  //Clear preset chip --> return 0
  if (_clear == 'clear'){
    await ClearPresetChip()
  }
  await utils.sleep(2000)
  await utils.clickPos(SpecialSedieLocator[_prechip].x,SpecialSedieLocator[_prechip].y)
  await utils.clickPos(SpecialSedieLocator.PresetAccept.x,SpecialSedieLocator.PresetAccept.y)//click Accept
}

//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='wait') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      await utils.sleep(100)
      await utils.clickPos(SpecialSedieLocator[_pos].x,SpecialSedieLocator[_pos].y)
      // if stake = null --> place bet without select any chip (in this case user have set preset chip before)
      if (_stake != null)
      {
        const _cnumber = `Chip${_stake}`
        await utils.clickPos(SpecialSedieLocator[_cnumber].x,SpecialSedieLocator[_cnumber].y)
        await utils.sleep(100)
      }
         //SubmitChip
      await utils.clickPos(SpecialSedieLocator.ChipBroadAccept.x,SpecialSedieLocator.ChipBroadAccept.y)
      // Wait until betting success
      if (wait == 'wait'){
        _isfail = await IsBetFail()
      }
      else {
        _isfail = false
      }
      await utils.sleep(200)
      if (_isfail === false )
      {
        await utils.sleep(200)
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
          findmsg = `"${_pos}":${_stake}`
          console.log(findmsg);
          _found = await utils.wsFindMessage(findmsg,5)
       if(_found.Val==false){
         console.log('ws message to trace bet choice',wsMessageReceived);
       }
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


export const VerifyHistoryContent = async() => {
  await utils.sleep(2000)
  await page.screenshot({path:SpecialSedieLocator.History.ImageCompare,clip:{x: SpecialSedieLocator.History.left,
    y: SpecialSedieLocator.History.top,
   width: SpecialSedieLocator.History.width,
   height: SpecialSedieLocator.History.height}})
  // const _result0= await utils.findImage(SpecialSedieLocator.History.ImageCompare,SpecialSedieLocator.History)
  // await utils.shouldBeEqual(_result0.Val,true)    
}


export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ SpecialSedieLocator.Guide.ImageCompare1, SpecialSedieLocator.Guide.ImageCompare2, SpecialSedieLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
    // x: SpecialSedieLocator.Guide.left,
    //   y: SpecialSedieLocator.Guide.top,
    //  width: SpecialSedieLocator.Guide.width,
    //  height: SpecialSedieLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],SpecialSedieLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true,`Verify Guide content ${_AcheckImage[t]}`)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  await utils.sleep(2000)
//  await page.screenshot({path:SpecialSedieLocator.StatisticResult.ImageCompare,clip:{x: SpecialSedieLocator.StatisticResult.left,
//     y: SpecialSedieLocator.StatisticResult.top,
//    width: SpecialSedieLocator.StatisticResult.width,
//    height: SpecialSedieLocator.StatisticResult.height}})
//    await utils.clickPos(SpecialSedieLocator.StatisticPoint.x,SpecialSedieLocator.StatisticPoint.y)
//    await page.screenshot({path:SpecialSedieLocator.StatisticPoint.ImageCompare,clip:{x: SpecialSedieLocator.StatisticPoint.left,
//     y: SpecialSedieLocator.StatisticPoint.top,
//    width: SpecialSedieLocator.StatisticPoint.width,
//    height: SpecialSedieLocator.StatisticPoint.height}})
  // Verify Statistic Result
  const _result1= await utils.findImage(SpecialSedieLocator.StatisticResult.ImageCompare,SpecialSedieLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true,'Verify statistic result')    
  await utils.sleep(1000)
  //Verify Statistic Point
  await utils.clickPos(SpecialSedieLocator.StatisticPoint.x,SpecialSedieLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
    SpecialSedieLocator.StatisticPoint.ImageCompare,SpecialSedieLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true,'Verify statistic point')    
}


//Is Round Error after betting
export const IsBetFail = async() => {
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
  let _found = wsMessageReceived.filter(element => element.includes('42/user/specialsedie,["SpecialSeDie",{"finish"'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}

//GetWinLossStatus
export const GetWinLossStatus = async () => {
  try {
      let _found = await utils.getWsMessage('42/user/specialsedie,["SpecialSeDie",{"status"')
      const res = String(_found).split("42/user/specialsedie,");
      console.log(res[1]);
      const obj = JSON.parse(res[1]);
      let _result = jp.value(obj[1],`$..win`);
      let _gbetchoice = jp.value(obj[1],`$..winningByChoices`)
      let  _betwin
      if (_result==false){
        _betwin = 0
      }
      else{
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
  let _found = await utils.getWsMessage('42/user/specialsedie,["SpecialSedie",{"finish"')
  const res = String(_found).split("42/user/specialsedie,");
  const obj = JSON.parse(res[1]);
  let _roundid = jp.value(obj[1],`$..roundId`);
  let _result = jp.query(obj[1],`$..result`);
  let _settleresult = jp.query(obj[1],`$..settlementResult`);
  let _bigwin = jp.value(obj[1],`$..settlementResult.big`);
  let _choicewin = _bigwin
  if (_choicewin == true){
       _choicewin = process.env.npm_config_cf_lang  == 'vn'?'Tài':'Big'
  }
  else {
    _choicewin = process.env.npm_config_cf_lang  == 'vn'? 'Xỉu':'Small'
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
  await utils.sleep(1000)
  let _found = await utils.wsFindMessage('42/user/specialsedie,["SpecialSeDie",{"history"')
  await utils.shouldBeEqual(_found.Val,true)
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
  console.log(_af,_beforebalance,_afterbalance);
  await utils.shouldBeEqual(Math.round(_afterbalance * 100) / 100, Math.round(_beforebalance * 100) / 100,'Check Settle Balance')
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
          temp = await utils.findImage(SpecialSedieLocator.RoundDetailTitle.ImageCompare,SpecialSedieLocator.RoundDetailTitle)
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
   } catch (error) {
      console.error(error.message);
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
