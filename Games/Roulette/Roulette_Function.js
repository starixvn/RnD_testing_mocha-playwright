import * as utils from '../../util/utils'
import * as config from '../../config/config'
let RouletteLocator = (process.env.npm_config_lang  == 'vn' ? require('./Roulette_Locator').RouletteLocator_vn : require('./Roulette_Locator').RouletteLocator_en)
import {DB} from '../References/DataBase_Locator'
import _ from 'lodash';
var jp = require('jsonpath')
const W3CWebSocket = require('websocket').w3cwebsocket;

export const CloseGame = async() => {
  await utils.clickPos(RouletteLocator.BtnHome.x,RouletteLocator.BtnHome.y )
  await utils.sleep(1000)
  // let flag = await utils.wsFindMessage('42/user/roulette,["Roulette",{"outgame"')
  // await utils.shouldBeEqual(flag.Val,true)

}

//Wait until new round
export const waitUtilNewRound = async() => {
  let _found = await utils.getWsMessage('42/user/roulette,["Roulette",{"remainingTime":59}]')
  await utils.sleep(14000)
  // /await utils.CaptureSubImageToFile(RouletteLocator.NewRound)
  // const _title= await utils.findImage(RouletteLocator.NewRound.ImageCompare,RouletteLocator.NewRound)
}

export const OpenHistory = async() => {
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      await utils.sleep(5000)
      await utils.clickPos(RouletteLocator.BtnHistory.x,RouletteLocator.BtnHistory.y)
  }
  else
  await utils.clickPos(RouletteLocator.BtnHistory.x,RouletteLocator.BtnHistory.y)
}

export const CloseHistory = async() => {
  await utils.clickPos(RouletteLocator.BtnHome.x,RouletteLocator.BtnHome.y )
}

export const OpenGuide = async() => {
  await utils.clickPos(RouletteLocator.BtnGuide.x,RouletteLocator.BtnGuide.y )
  await utils.sleep(1000)

}

export const CloseGuide = async() => {
  await utils.clickPos(RouletteLocator.BtnHome.x,RouletteLocator.BtnHome.y )
}

export const OpenStatistic = async() => {
  await utils.clickPos(RouletteLocator.BtnStatistic.x,RouletteLocator.BtnStatistic.y )
}

export const CloseStatistic = async() => {
  await utils.clickPos(RouletteLocator.BtnHome.x,RouletteLocator.BtnHome.y )
}


export const VerifySignInSuccessfully = async() => {
  let val=  await utils.wsFindMessage('42/user/roulette,["signedIn"]')
  await utils.shouldBeEqual(val.Val, true,'Can not open Roulette game')
}


//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='wait') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      await utils.sleep(100)
      //Reset chip
      await utils.swipe(245,658,600,658)
      await utils.sleep(50)
      await utils.swipe(245,658,600,658)
      await utils.sleep(50)
       //select chip
      const _cnumber = `Chip${_stake}`
      if(_cnumber =='Chip50'||_cnumber =='Chip100'||_cnumber =='Chip200'){
        await utils.swipe(471,658,49,658)
        await utils.sleep(200)
        await clickPos(RouletteLocator[_cnumber].x,RouletteLocator[_cnumber].y)
      }
      else if (_cnumber=='Chip500'||_cnumber=='Chip1000'||_cnumber=='Chip2000'){
        await utils.swipe(471,658,49,658)
        await utils.sleep(300)
        await utils.swipe(471,658,49,658)
        await utils.sleep(300)
        await clickPos(RouletteLocator[_cnumber].x,RouletteLocator[_cnumber].y)
      }
      else      
        await clickPos(RouletteLocator[_cnumber].x,RouletteLocator[_cnumber].y)
        await utils.sleep(300)
      // Select Pos
      await clickPos(RouletteLocator[_pos].x,RouletteLocator[_pos].y)
      await utils.sleep(100)
      //SubmitChip
      await clickPos(RouletteLocator.BtnAgree.x,RouletteLocator.BtnAgree.y)
      // Wait until betting success
      if (wait == 'wait')
          {
            _isfail = await IsBetFail()
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

          findmsg = _pos.toLowerCase()+`":${_stake}`
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
  await page.screenshot({path:RouletteLocator.History.ImageCompare,clip:{x: RouletteLocator.History.left,
    y: RouletteLocator.History.top,
   width: RouletteLocator.History.width,
   height: RouletteLocator.History.height}})
  // const _result0= await utils.findImage(RouletteLocator.History.ImageCompare,RouletteLocator.History)
  // await utils.shouldBeEqual(_result0.Val,true)    
}


export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ RouletteLocator.Guide.ImageCompare1, RouletteLocator.Guide.ImageCompare2, RouletteLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
    // x: RouletteLocator.Guide.left,
    //   y: RouletteLocator.Guide.top,
    //  width: RouletteLocator.Guide.width,
    //  height: RouletteLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],RouletteLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true,`Verify Guide content ${_AcheckImage[t]}`)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  await utils.sleep(2000)
//  await page.screenshot({path:RouletteLocator.StatisticResult.ImageCompare,clip:{x: RouletteLocator.StatisticResult.left,
//     y: RouletteLocator.StatisticResult.top,
//    width: RouletteLocator.StatisticResult.width,
//    height: RouletteLocator.StatisticResult.height}})
//    await utils.clickPos(RouletteLocator.StatisticPoint.x,RouletteLocator.StatisticPoint.y)
//    await page.screenshot({path:RouletteLocator.StatisticPoint.ImageCompare,clip:{x: RouletteLocator.StatisticPoint.left,
//     y: RouletteLocator.StatisticPoint.top,
//    width: RouletteLocator.StatisticPoint.width,
//    height: RouletteLocator.StatisticPoint.height}})
  // Verify Statistic Result
  const _result1= await utils.findImage(RouletteLocator.StatisticResult.ImageCompare,RouletteLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true,'Verify statistic result')    
  await utils.sleep(1000)
  //Verify Statistic Point
  await utils.clickPos(RouletteLocator.StatisticPoint.x,RouletteLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
    RouletteLocator.StatisticPoint.ImageCompare,RouletteLocator.StatisticPoint)
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
  let _found = wsMessageReceived.filter(element => element.includes('42/user/roulette,["Roulette",{"finish"'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}

//GetWinLossStatus
export const GetWinLossStatus = async () => {
  try {
      let _found = await utils.getWsMessage('42/user/roulette,["Roulette",{"status"')
      const res = String(_found).split("42/user/roulette,");
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
  let _found = await utils.getWsMessage('42/user/roulette,["Roulette",{"finish"')
  const res = String(_found).split("42/user/roulette,");
  const obj = JSON.parse(res[1]);
  let _roundid = jp.value(obj[1],`$..roundId`);
  let _result = jp.query(obj[1],`$..result`);
  let _settleresult = jp.query(obj[1],`$..settlementResult`);
  let _bigwin = jp.value(obj[1],`$..settlementResult.big`);
  let _choicewin = _bigwin
  if (_choicewin == true){
       _choicewin = process.env.npm_config_lang  == 'vn'?'Tài':'Big'
  }
  else {
    _choicewin = process.env.npm_config_lang  == 'vn'? 'Xỉu':'Small'
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
  await utils.sleep(3000)
  let _found = await utils.wsFindMessage('42/user/roulette,["Roulette",{"history"')
  await utils.shouldBeEqual(_found.Val,true)
  await CloseHistory() // close history
  wsMessageReceived =[]
   //check data
  // await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].win`),_checkres.win),true)
  // await utils.shouldBeEqual(_.isEqual(jp.value(objdetail[1],`$..[?(@.name=='${username}')].choice`),_checkres.betchoice),true)
}

export const CheckSettleBalance = async() => {
  let _beforebalance = await getUserBalance()
  let _af = await GetWinLossStatus()
  await utils.sleep(3000)
  let _afterbalance = await getUserBalance()
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
          temp = await utils.findImage(RouletteLocator.RoundDetailTitle.ImageCompare,RouletteLocator.RoundDetailTitle)
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

export const getUserBalance = async() =>{
  let url = config[env].urlWebsocket
  url = url.replace("roulette","bigsmall")
  let _origin = config[env].urlOrigin
  let {client, wsmsgbs} = await utils.createWSConnect(url,_origin) 
  await utils.sleep(3000)
  await utils.sendwsdata(client,'40/user/taixiu,')
  await utils.sendwsdata(client,`42/user/taixiu,["signin",{"isAuthenticated":true,"username":"${username}","language":"vi-VN","ss":"${session}","isSSO":true,"time":"2021-03-22T09:16:12.371Z"}]`)
  await utils.sendwsdata(client,'42/user/taixiu,["inGame"]')
  let red= await utils.returnMachedtData(wsmsgbs,'gameConfigs')
  const res = String(red).split("42/user/taixiu,");
  const obj = JSON.parse(res[1]);
  let balance = jp.value(obj[1],`$..user.red`);
  console.log(balance);
  await client.close()
  return balance
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
