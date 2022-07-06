import * as utils from '../../util/utils'
import * as config from '../../config/config'
let BitCoinLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./BitCoin_Locator').BitCoinLocator_vn : require('./BitCoin_Locator').BitCoinLocator_en)
import {DB} from '../References/DataBase_Locator'
import _ from 'lodash';
var jp = require('jsonpath')

export const CloseGame = async() => {
  await utils.clickPos(BitCoinLocator.Close.x,BitCoinLocator.Close.y )
  await utils.sleep(1000)
  let flag = await utils.imageShouldNotDisplay(BitCoinLocator.Big)
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
  let _found = await utils.getWsMessage('"remainingTime":119}]',120)
  console.log('new round ready');
  await utils.sleep(15000)
}

export const OpenHistory = async() => {
  let _settlestate = await IsSettle()
  if (_settlestate === true){
      await utils.sleep(5000)
      await utils.clickPos(BitCoinLocator.History.x,BitCoinLocator.History.y)
  }
  else
  await utils.clickPos(BitCoinLocator.History.x,BitCoinLocator.History.y)
}

export const CloseHistory = async() => {
  await utils.clickPos(BitCoinLocator.HistoryClose.x,BitCoinLocator.HistoryClose.y )
}

export const OpenGuide = async() => {
  await utils.clickPos(BitCoinLocator.Guide.x,BitCoinLocator.Guide.y )
  await utils.sleep(1000)

}

export const CloseGuide = async() => {
  await utils.clickPos(BitCoinLocator.GuideClose.x,BitCoinLocator.GuideClose.y )
}

export const OpenStatistic = async() => {
  await utils.clickPos(BitCoinLocator.Statistic.x,BitCoinLocator.Statistic.y )
}

export const CloseStatistic = async() => {
  await utils.clickPos(BitCoinLocator.StatisticClose.x,BitCoinLocator.StatisticClose.y )
}

export const OpenPreset = async() => {
  await clickPos(BitCoinLocator.Preset.x,BitCoinLocator.Preset.y)
}

export const ClosePreset = async() => {
  await clickPos(BitCoinLocator.PresetClose.x,BitCoinLocator.PresetClose.y )
}


export const VerifySignInSuccessfully = async() => {
  await utils.verifySignInSuccessfully()
}


//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='wait') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      await utils.sleep(100)
      await clickPos(BitCoinLocator[_pos].x,BitCoinLocator[_pos].y)//click bet position
      //Select chip
      await utils.sleep(100)
      let chip =`Chip${_stake}`
      await utils.clickPos(BitCoinLocator[chip].x,BitCoinLocator[chip].y)
      await utils.clickPos(BitCoinLocator.ChipBroadAccept.x,BitCoinLocator.ChipBroadAccept.y)
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
     _found = await utils.wsFindMessage(findmsg,2)
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
      await utils.clickPos(BitCoinLocator.ChipBroadClear.x,BitCoinLocator.ChipBroadClear.y)
      await page.waitForTimeout(500)
  } catch (e) {
      console.error(e)
  }
}

//Close Bet Chip
export const CloseChipBoard = async () => {
  try {
      await utils.clickPos(BitCoinLocator.ChipBroadClose.x,BitCoinLocator.ChipBroadClose.y)
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
  await clickPos(BitCoinLocator[_prechip].x,BitCoinLocator[_prechip].y)
  await clickPos(BitCoinLocator.PresetAccept.x,BitCoinLocator.PresetAccept.y)//click Accept
}

//Clear Preset Chip
export const ClearPresetChip = async() => {
  await clickPos(BitCoinLocator.PresetClear.x,BitCoinLocator.PresetClear.y)
}

export const VerifyHistoryContent = async() => {
  await utils.sleep(2000)
  await page.screenshot({path:BitCoinLocator.History.ImageCompare,clip:{x: BitCoinLocator.History.left,
    y: BitCoinLocator.History.top,
   width: BitCoinLocator.History.width,
   height: BitCoinLocator.History.height}})
  // const _result0= await utils.findImage(BitCoinLocator.History.ImageCompare,BitCoinLocator.History)
  // await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyPresetContent = async() => {
  await utils.sleep(2000)
  // await page.screenshot({path:BitCoinLocator.Preset.ImageCompare,clip:{x: BitCoinLocator.Preset.left,
  //   y: BitCoinLocator.Preset.top,
  //  width: BitCoinLocator.Preset.width,
  //  height: BitCoinLocator.Preset.height}})
  const _result0= await utils.findImage(BitCoinLocator.Preset.ImageCompare, BitCoinLocator.Preset)
  await utils.shouldBeEqual(_result0.Val,true,`Verify Preset content`)    
}

export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ BitCoinLocator.Guide.ImageCompare1, BitCoinLocator.Guide.ImageCompare2, BitCoinLocator.Guide.ImageCompare3] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
    // x: BitCoinLocator.Guide.left,
    //   y: BitCoinLocator.Guide.top,
    //  width: BitCoinLocator.Guide.width,
    //  height: BitCoinLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],BitCoinLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true,`Verify Guide content ${_AcheckImage[t]}`)
  
  }  
  
}

export const VerifyStatisticContent = async() => {
  await utils.sleep(2000)
//  await page.screenshot({path:BitCoinLocator.StatisticResult.ImageCompare,clip:{x: BitCoinLocator.StatisticResult.left,
//     y: BitCoinLocator.StatisticResult.top,
//    width: BitCoinLocator.StatisticResult.width,
//    height: BitCoinLocator.StatisticResult.height}})
//    await utils.clickPos(BitCoinLocator.StatisticPoint.x,BitCoinLocator.StatisticPoint.y)
//    await page.screenshot({path:BitCoinLocator.StatisticPoint.ImageCompare,clip:{x: BitCoinLocator.StatisticPoint.left,
//     y: BitCoinLocator.StatisticPoint.top,
//    width: BitCoinLocator.StatisticPoint.width,
//    height: BitCoinLocator.StatisticPoint.height}})
  // Verify Statistic Result
  const _result1= await utils.findImage(BitCoinLocator.StatisticResult.ImageCompare,BitCoinLocator.StatisticResult)
  await utils.shouldBeEqual(_result1.Val,true,'Verify statistic result')    
  await utils.sleep(1000)
  //Verify Statistic Point
  await utils.clickPos(BitCoinLocator.StatisticPoint.x,BitCoinLocator.StatisticPoint.y)
  const _result2= await utils.findImage(
    BitCoinLocator.StatisticPoint.ImageCompare,BitCoinLocator.StatisticPoint)
  await utils.shouldBeEqual(_result2.Val,true,'Verify statistic point')    
}


//Is Round Error after betting
export const IsBetFail = async(_pos,_stake) => {
  let _found = await utils.wsFindMessage("notice",2)
  return _found.Val
}

//Is Round Settle
export const IsSettle = async() => {
  let _found = wsMessageReceived.filter(element => element.includes('finish'));
  if (_found.length > 0){
    return true
  }
  else
  return false
}

//GetWinLossStatus
export const GetWinLossStatus = async () => {
  try {
      let rawData = await utils.getWsMessage('status',180);
      let _result = await utils.getDataJsonPath(rawData, "$..win");
      let _gbetchoice = await utils.getDataJsonPath(rawData, "$..winningByChoices");
      let _betwin
      if (_result == 'false'){
        _betwin = 0  //rule cân cửa
      }
      else
      {
        _betwin = await utils.getDataJsonPath(rawData, "$..bet")
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
  let rawData = await utils.getRowDataFromJS("bitcoinmaster", 'finish');
  let _roundid = await utils.getDataJsonPath(rawData, "$..roundId");
  let _result = await utils.getDataJsonPath(rawData, "$..result");
  let _settleresult =  await utils.getDataJsonPath(rawData, "$..settlementResult");
  // Get bet win stake
  let _getwinstake = await GetWinLossStatus()
  return { 
            result : _result , 
            roundId : _roundid,
            settleresult : _settleresult, 
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
  let _found = await utils.getWsMessage('42/user/bitcoinmaster,["BitcoinMaster",{"history"')
  const res = String(_found).split("42/user/bitcoinmaster,");
  const obj = JSON.parse(res[1]);
  let _getresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].result`);
  let _getsettleresult = jp.query(obj[1],`$..betLogs[?(@.phien==${_checkres.roundId})].settlementResult`);
  // using lodash
  await utils.shouldBeEqual(_.isEqual(_checkres.result,_getresult),true)
  await utils.shouldBeEqual(_.isEqual(_checkres.settleresult,_getsettleresult), true)
  // Check Round History Detail
  // //click first round of history
  // await utils.clickPos(454,230)
  // await utils.sleep(3000)
  // let _founddetail = await utils.getWsMessage('42/user/bitcoinmaster,["BitcoinMaster",{"round"')
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
          temp = await utils.findImage(BitCoinLocator.RoundDetailTitle.ImageCompare,BitCoinLocator.RoundDetailTitle)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BitCoin.cuoc,qrFindCuoc)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BitCoin.phien,qrFindPhien)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BitCoin.ones,qrFindPhien)
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
