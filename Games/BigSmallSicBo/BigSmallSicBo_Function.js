import * as utils from '../../util/utils'
const BigSmallSicboLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./BigSmallSicBo_Locator').BigSmallSicboLocator_vn : require('./BigSmallSicBo_Locator').BigSmallSicboLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
import _ from 'lodash';
let wsbigsmallsb = '42/user/sicbo,["SicBo"'


export const _clickPos = async(_locator) => {
  await utils.clickPos(_locator.x,_locator.y )
}


export const CloseGame = async() => {
  await _clickPos(BigSmallSicboLocator.Menu)
  await utils.sleep(1000)
  await _clickPos(BigSmallSicboLocator.Home)
  await utils.sleep(3000)
  let flag = await utils.imageShouldNotDisplay(BigSmallSicboLocator.Big)
  await utils.shouldBeEqual(flag.Val,true, `Verify Game is closed successfully`)

}

export const OpenHistory = async() => {
  await _clickPos(BigSmallSicboLocator.Menu)
  await utils.sleep(1000)
  await _clickPos(BigSmallSicboLocator.History)
}

export const CloseHistory = async() => {
  await _clickPos(BigSmallSicboLocator.HistoryClose)
  await utils.sleep(500)
}

export const OpenGuide = async() => {
  await _clickPos(BigSmallSicboLocator.Menu)
  await utils.sleep(1000)
  await _clickPos(BigSmallSicboLocator.Guide)
}

export const CloseGuide = async() => {
  await _clickPos(BigSmallSicboLocator.GuideClose)
  await utils.sleep(500)
}


export const VerifySignInSuccessfully = async() => {
  // // Verify Big
  // // await utils.CaptureSubImageToFile(BigSmallSicboLocator.Big)
  // const _big= await utils.findImage(BigSmallSicboLocator.Big.ImageCompare,BigSmallSicboLocator.Big)
  // await utils.shouldBeEqual(_big.Val,true)  
  // // Verify Small
  // // await utils.CaptureSubImageToFile(BigSmallSicboLocator.Small)

  // const _small= await utils.findImage(BigSmallSicboLocator.Small.ImageCompare,BigSmallSicboLocator.Small)
  // await utils.shouldBeEqual(_small.Val,true)  
  // // Verify AnyTriple
  // // await utils.CaptureSubImageToFile(BigSmallSicboLocator.AnyTriple)

  // const _triple= await utils.findImage(BigSmallSicboLocator.AnyTriple.ImageCompare,BigSmallSicboLocator.AnyTriple)
  // await utils.shouldBeEqual(_triple.Val,true)  
  // // Check Default Chip
  // // const _defaultchip= await utils.findImage(BigSmallSicboLocator.ChipBroad.ImageCompare1,BigSmallSicboLocator.ChipBroad)
  // // await utils.shouldBeEqual(_defaultchip.Val,true) 
  // // Verify specific number bettype in table
  // let _Aspecific = ['Specific1','Specific2','Specific3','Specific4','Specific5','Specific6']
  // for (let i of _Aspecific){
  //   // await utils.CaptureSubImageToFile(BigSmallSicboLocator[i])

  //   let found1= await utils.findImage(BigSmallSicboLocator[i].ImageCompare,BigSmallSicboLocator[i])
  //   await utils.shouldBeEqual(found1.Val,true) 
  // }
  // // Verify total point bettypes in table
  // let _Atotal = ['Total4','Total5','Total6','Total7','Total8','Total9','Total10','Total11','Total12','Total13','Total14','Total15','Total16','Total17']
  // for (let i of _Atotal){
  //   // await utils.CaptureSubImageToFile(BigSmallSicboLocator[i])
  //   let found2= await utils.findImage(BigSmallSicboLocator[i].ImageCompare,BigSmallSicboLocator[i])
  //   await utils.shouldBeEqual(found2.Val,true) 
  // }
  let _result = await utils.wsFindMessage('["signedIn"]')
  await utils.shouldBeEqual(_result.Val,true)

  }

//Sliding chip bar and select chip icon
export const Sliding_Select_Chip = async(_chip) => {
  const _chipbar1 = [1,5,10,50,100]
  const _chipbar2 = [200,500,1000,2000]
  if (_chipbar2.includes(_chip) === true){
    await utils.swipe(900,630,0,630)
    await utils.sleep(50)
     }
  else if (_chipbar1.includes(_chip) === true){
    await utils.swipe(405,630,1000,630)
    await utils.sleep(50)
   }
    await utils.clickPos(BigSmallSicboLocator[`Chip${_chip}`].x,BigSmallSicboLocator[`Chip${_chip}`].y)  
  }

  export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    wsMessageReceived = []
    await Sliding_Select_Chip(_chip)
    await utils.clickPos(BigSmallSicboLocator[`${_choice1}`].x,BigSmallSicboLocator[`${_choice1}`].y)
    await utils.sleep(200)
    await utils.clickPos(BigSmallSicboLocator[`${_choice2}`].x, BigSmallSicboLocator[`${_choice2}`].y)
    let _result = await utils.wsFindMessage(ermsg,20)
    expect(_result.Val).to.equal(true)
}


//PlaceBet
export const PlaceBet = async (_pos,_stake,wait='yes') => {
  try {
    let _isfail
    for (let t = 0;  t< config.setting.loop; t++)
     {
      wsMessageReceived = []
      //Select Chip
      await Sliding_Select_Chip(_stake)
      //Select pos
      await utils.clickPos(BigSmallSicboLocator[_pos].x,BigSmallSicboLocator[_pos].y)
      //wait _clickPos(`${BigSmallSicboLocator}[${_pos}]`)
      // loop if place bet fail
      if (wait == 'yes'){
        _isfail = await IsBetFail()
      }
      else {
        _isfail = false
      }
      if (_isfail === false )
      {
        break
      }
          }   
  } catch (e) {
      console.error(e)
  }
}

export const verifyBetPosStake = async(_pos,_stake) => {
  let betchoice
  if (_pos == 'AnyTriple'){
    betchoice = 'anyTriple' 
  }
  else{
    betchoice =_pos.toLowerCase()
  }  
  let _found = await utils.getWsMessage(`${wsbigsmallsb},{"ownBets":`)
  await utils.shouldBeEqual(_found.includes(`"${betchoice}":${_stake}`), true,`Verify bet choice : ${_pos} and stake : ${_stake} `)
}

// Verify error msg
export const VerifyErrorMessage = async(_msg) => {
  await utils.sleep(1000)
  let  _result =await utils.wsFindMessage(`${_msg}`,2);
  await utils.shouldBeEqual(_result.Val,true,'Verify error message')
}

export const VerifyHistoryContent = async() => {
  await OpenHistory()
  await utils.sleep(2000)
  // await page.screenshot({path:BigSmallSicboLocator.History.ImageCompare,clip:{x: BigSmallSicboLocator.History.left,
  //   y: BigSmallSicboLocator.History.top,
  //  width: BigSmallSicboLocator.History.width,
  //  height: BigSmallSicboLocator.History.height}})

  const _result0= await utils.findImage(BigSmallSicboLocator.History.ImageCompare,BigSmallSicboLocator.History)
  await utils.shouldBeEqual(_result0.Val,true)    
  await CloseHistory()
}

export const VerifyGuideContent = async() => {
  await OpenGuide()
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ BigSmallSicboLocator.Guide.ImageCompare1, BigSmallSicboLocator.Guide.ImageCompare2, BigSmallSicboLocator.Guide.ImageCompare3,
    BigSmallSicboLocator.Guide.ImageCompare4,BigSmallSicboLocator.Guide.ImageCompare5] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:_AcheckImage[t],clip:{
    // x: BigSmallSicboLocator.Guide.left,
    //   y: BigSmallSicboLocator.Guide.top,
    //  width: BigSmallSicboLocator.Guide.width,
    //  height: BigSmallSicboLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],BigSmallSicboLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
     }  
  await CloseGuide()
}

//Wait until new round
export const waitUtilNewRound = async() => {
  wsMessageReceived = []
  let _found = await utils.getWsMessage('42/user/sicbo,["SicBo",{"remainingTime":57}')
  await utils.sleep(8000)
  console.log('new round ready')
}


//Is Round Error after betting
export const IsBetFail = async() => {
  let _found = await utils.wsFindMessage("notice",2)
  // console.log('betfail: ', _found.Val)
  return _found.Val
}

const getRawData = async(_mes) => {
  try {
      let raw = await utils.getWsMessage(_mes)
      if(raw === null) return null
      else {
          raw = raw.split("42/user/sicbo,");
            return raw[1]
      }
  } catch (error) {
      console.log(error.message)
      return null
  }
}

//Get Settlement Result
export const getSettlementResult = async () => {
  try {
      let _time = new Date().toISOString()
      let _status = await getRawData(`${wsbigsmallsb},{"status":`)
      let _finish = await getRawData(`${wsbigsmallsb},{"finish":`)
      let _win = await utils.getDataJsonPath(_status,`$..win`)
      let _betstake = await utils.getDataJsonPath(_status,`$..bet`)
      let _settlement = await utils.getDataJsonPath(_finish,`$..settlementResult`)
      let _choicewin = await utils.getKeysByValue(_settlement,true)
      let _roundId = await utils.getDataJsonPath(_finish,`$..roundId`)
      let _result = await utils.getDataJsonPath(_finish,`$..result`)
      let _stakewin
      if(_win ==true){
        _stakewin = _betstake
      }
      else{
        _stakewin = 0
      }

      return {win: _win , betstake: _betstake ,choicewin:  _choicewin, roundId: _roundId, stakewin: _stakewin, result: _result, time: _time}
      } catch (e) {
      console.error(e)
  }
}

//Check Settlement
export const checkSettlement = async (placebetfunc,args) => {
  try {
      // PlaceBet
      await placebetfunc.apply(this,args)
      let _beforebalance = await utils.getBalance()
      // get settle result
      let settle_result = await getSettlementResult()
      await utils.sleep(2000)
      let _afbalance = await utils.getBalance()
      //check balance
      await utils.shouldBeEqual(_beforebalance + settle_result.stakewin,_afbalance, `verify balance`) 
     } catch (e) {
      console.error(e)
  }
}


//Check Round History
export const CheckRoundHistory = async(_settleresult) => {
  await OpenHistory()
  await utils.sleep(3000)
  let _result = await getRawData(`${wsbigsmallsb},{"history"`)
  let _roundresult = await utils.getDataJsonPath(_result,`$..[?(@.phien==${_settleresult.roundId})]`)
  let _settlement =_roundresult.settlementResult
  let _choicewin = await utils.getKeysByValue(_settlement,true)
  // Check choice win
  await utils.shouldBeEqual(_.isEqual(_settleresult.choicewin,_choicewin),true)
  /// check bet win
  await utils.shouldBeEqual(_.isEqual(_settleresult.stakewin,_roundresult.betwin),true)
  await CloseHistory() // close history
  await utils.sleep(3000)
}

// export const CheckSettleBalance = async() => {
//   let _beforebalance = await utils.getBalance()
//   let _af = await GetWinLossStatus()
//   console.log('Is Win: ',_af.win, _af.betwin)
//   await utils.sleep(1000)
//   let _afterbalance = await utils.getBalance()
//   _beforebalance = _beforebalance +  _af.betwin
//   if ( _af.win == true){
//     await utils.shouldBeEqual(Math.round(_afterbalance * 100) / 100, Math.round(_beforebalance * 100) / 100)
//   }
//   else {
//     console.log('Refund: ',_beforebalance, _afterbalance)
//   }
// }


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
