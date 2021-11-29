import * as utils from '../../util/utils'
const FourGuardiansLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./FourGuardians_Locator').FourGuardiansLocator_vn : require('./FourGuardians_Locator').FourGuardiansLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
import _ from 'lodash';
let wsbigsmallsb = '42/user/fourguardians,["FourGuardians"'


export const _clickPos = async(_locator) => {
  await utils.clickPos(_locator.x,_locator.y )
}


export const CloseGame = async() => {
  await _clickPos(FourGuardiansLocator.Menu)
  await utils.sleep(1000)
  await _clickPos(FourGuardiansLocator.Home)
  await utils.sleep(2000)
  let flag = await utils.imageShouldNotDisplay(FourGuardiansLocator.Title)
  await utils.shouldBeEqual(flag.Val,true, `Verify Game is closed successfully`)

}

export const OpenHistory = async() => {
  await _clickPos(FourGuardiansLocator.Menu)
  await utils.sleep(500)
  await _clickPos(FourGuardiansLocator.History)
  await utils.sleep(1000)
}

export const ClosePopUp = async() => {
  await _clickPos(FourGuardiansLocator.ClosePopUp)
  await utils.sleep(500)
}

export const OpenGuide = async() => {
  await _clickPos(FourGuardiansLocator.Menu)
  await utils.sleep(500)
  await _clickPos(FourGuardiansLocator.Guide)
  await utils.sleep(1000)
}

export const OpenPlayLineDetail = async() => {
  await _clickPos(FourGuardiansLocator.PayLine)
  await utils.sleep(500)
}

export const VerifySignInSuccessfully = async() => {
   await utils.findImage(FourGuardiansLocator.Title.ImageCompare,FourGuardiansLocator.Title).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check Title')
  })
   // Check default round id is blank
   await utils.findImage(FourGuardiansLocator.RoundId.ImageCompare,FourGuardiansLocator.RoundId).then((res)=>
   {
     utils.shouldBeEqual(res.Val, true,'Check RoundID is blank')
   })
  }


//PlaceBet
export const PlaceBet = async (line,_stake) => {
  try {
      await OpenPlayLineDetail()
      await SelectPayline(line)
      await _clickPos(FourGuardiansLocator.ConfirmLine)
      await SelectStake(_stake)
      await _clickPos(FourGuardiansLocator.Sprin)
  } catch (e) {
      console.error(e)
  }
}

export const VerifyHistoryContent = async() => {
  await OpenHistory()
  // await page.screenshot({path:FourGuardiansLocator.History.ImageCompare,clip:{x: FourGuardiansLocator.History.left,
  //   y: FourGuardiansLocator.History.top,
  //  width: FourGuardiansLocator.History.width,
  //  height: FourGuardiansLocator.History.height}})
  await utils.findImage(FourGuardiansLocator.History.ImageCompare,FourGuardiansLocator.History).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check History')
  }) 
  await ClosePopUp()
}

export const VerifyGuideContent = async() => {
  await OpenGuide()
  await utils.sleep(1000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  for(let t = 1; t<= 9 ; t++){
    // await page.screenshot({path:`ImgCompare_FourGuardians_Guide_${t}.png`,clip:{x: FourGuardiansLocator.Guide.left,
    //   y: FourGuardiansLocator.Guide.top,
    //  width: FourGuardiansLocator.Guide.width,
    //  height: FourGuardiansLocator.Guide.height}})
   // await utils.swipe(fx, fy, fx, ty) 
   let imagecompare = `ImageCompare${t}`
   let _result = await utils.findImage(FourGuardiansLocator.Guide[imagecompare],FourGuardiansLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
   await utils.shouldBeEqual(_result.Val,true)
     }  
  await ClosePopUp()
}

export const SelectPayline = async(line) => {
  await _clickPos(FourGuardiansLocator.UnSelectLine)
  // line = All, Odd and Even
  line === 'All' ?  await _clickPos(FourGuardiansLocator.AllLine) : line === 'Odd'?  await _clickPos(FourGuardiansLocator.OddLine) :line === 'Even'? await _clickPos(FourGuardiansLocator.EvenLine):await _clickPos(FourGuardiansLocator[line])
  await utils.sleep(500)
}

export const SelectStake= async(stake) => {
  await _clickPos(FourGuardiansLocator.Stake)
  // stake = 0.1 | 1 |5
  stake === 0.1 ?  await _clickPos(FourGuardiansLocator.Stake0_1) : stake === 1 ?  await _clickPos(FourGuardiansLocator.Stake1) : await _clickPos(FourGuardiansLocator.Stake5)
}


export const VerifyLeftPayline = async() => {
  // await page.screenshot({path:FourGuardiansLocator.LeftPayLine.ImageCompare,clip:{x: FourGuardiansLocator.LeftPayLine.left,
  //   y: FourGuardiansLocator.LeftPayLine.top,
  //  width: FourGuardiansLocator.LeftPayLine.width,
  //  height: FourGuardiansLocator.LeftPayLine.height}})
  await utils.findImage(FourGuardiansLocator.LeftPayLine.ImageCompare,FourGuardiansLocator.LeftPayLine).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check History')
  }) 
}

export const VerifyRightPayline = async() => {
  // await page.screenshot({path:FourGuardiansLocator.RightPayLine.ImageCompare,clip:{x: FourGuardiansLocator.RightPayLine.left,
  //   y: FourGuardiansLocator.RightPayLine.top,
  //  width: FourGuardiansLocator.RightPayLine.width,
  //  height: FourGuardiansLocator.RightPayLine.height}})
  await utils.findImage(FourGuardiansLocator.RightPayLine.ImageCompare,FourGuardiansLocator.RightPayLine).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check right payline')
  }) 
}

export const VerifyPaylineDetail = async() => {
  await OpenPlayLineDetail()
  // await page.screenshot({path:FourGuardiansLocator.PayLineDetail.ImageCompare,clip:{x: FourGuardiansLocator.PayLineDetail.left,
  //   y: FourGuardiansLocator.PayLineDetail.top,
  //  width: FourGuardiansLocator.PayLineDetail.width,
  //  height: FourGuardiansLocator.PayLineDetail.height}})
  await utils.findImage(FourGuardiansLocator.PayLineDetail.ImageCompare,FourGuardiansLocator.PayLineDetail).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check default payline')
  }) 
  await ClosePopUp()
}

export const VerifyPaylinelOdd = async() => {
  await OpenPlayLineDetail()
  await SelectPayline('Odd')
 // await _clickPos(FourGuardiansLocator.OddLine)
  // await page.screenshot({path:'VerifyPaylineDetailOdd.png',clip:{x: FourGuardiansLocator.PayLineDetail.left,
  //   y: FourGuardiansLocator.PayLineDetail.top,
  //  width: FourGuardiansLocator.PayLineDetail.width,
  //  height: FourGuardiansLocator.PayLineDetail.height}})
  await utils.findImage(FourGuardiansLocator.PayLineDetailOdd.ImageCompare,FourGuardiansLocator.PayLineDetailOdd).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check odd payline')
  }) 
  await _clickPos(FourGuardiansLocator.ConfirmLine)
  await utils.findImage(FourGuardiansLocator.PayLine.ImageCompare13,FourGuardiansLocator.PayLine).then((pl13)=>
  {
    utils.shouldBeEqual(pl13.Val, true,'Check odd payline')
  }) 
}

export const VerifyPaylineEven = async() => {
  await OpenPlayLineDetail()
  await SelectPayline('Even')
  // await _clickPos(FourGuardiansLocator.EvenLine)
  // await page.screenshot({path:'VerifyPaylineDetailEven.png',clip:{x: FourGuardiansLocator.PayLineDetail.left,
  //   y: FourGuardiansLocator.PayLineDetail.top,
  //  width: FourGuardiansLocator.PayLineDetail.width,
  //  height: FourGuardiansLocator.PayLineDetail.height}})
  await utils.findImage(FourGuardiansLocator.PayLineDetailEven.ImageCompare,FourGuardiansLocator.PayLineDetailEven).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check even payline')
  }) 
  await _clickPos(FourGuardiansLocator.ConfirmLine)
  await utils.findImage(FourGuardiansLocator.PayLine.ImageCompare12,FourGuardiansLocator.PayLine).then((pl12)=>
  {
    utils.shouldBeEqual(pl12.Val, true,'Check odd payline')
  }) 
}

export const VerifyPaylineAll = async() => {
  await OpenPlayLineDetail()
  await SelectPayline('All')
  //await _clickPos(FourGuardiansLocator.AllLine)
  // await page.screenshot({path:'VerifyPaylineDetailAll.png',clip:{x: FourGuardiansLocator.PayLineDetail.left,
  //   y: FourGuardiansLocator.PayLineDetail.top,
  //  width: FourGuardiansLocator.PayLineDetail.width,
  //  height: FourGuardiansLocator.PayLineDetail.height}})
  await utils.findImage(FourGuardiansLocator.PayLineDetailAll.ImageCompare,FourGuardiansLocator.PayLineDetailAll).then((res)=>
  {
    utils.shouldBeEqual(res.Val, true,'Check all payline')
  }) 
  await _clickPos(FourGuardiansLocator.ConfirmLine)
  await utils.findImage(FourGuardiansLocator.PayLine.ImageCompare25,FourGuardiansLocator.PayLine).then((pl25)=>
  {
    utils.shouldBeEqual(pl25.Val, true,'Check all payline')
  }) 
}

const getRawData = async(_mes) => {
  try {
      let raw = await utils.getWsMessage(_mes)
      if(raw === null) return null
      else {
          raw = raw.split("42/user/fourguardians,");
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
      let _status = await getRawData(`${wsbigsmallsb},{"endBet":`)
      let _finish = await getRawData(`${wsbigsmallsb},{"finish":`)
      let _red = await utils.getDataJsonPath(_status,`$..red`)
      let _betstake = await utils.getDataJsonPath(_status,`$..endBet`)
      let _freespin = await utils.getDataJsonPath(_status,`$..freeSpin`)
      let _roundId = await utils.getDataJsonPath(_finish,`$..roundId`)
      let _betfreespin = await utils.getDataJsonPath(_finish,`$..betByFreeSpin`)
      let _result = await utils.getDataJsonPath(_finish,`$..result`)
      let _settlementResult = await utils.getDataJsonPath(_finish,`$..settlementResult`)
      let _betWin = await utils.getDataJsonPath(_finish,`$..betWin`)
      let _bigWin = await utils.getDataJsonPath(_finish,`$..bigWin`)
      let _totalfreesprin = await utils.getDataJsonPath(_finish,`$..totalOfFreeSpins`)
      let _winline = await utils.getDataJsonPath(_finish,`$..payline`)
      return {red: _red, time: _time,betstake: _betstake,roundId: _roundId, result:_result, settlementResult : _settlementResult,betWin: _betWin, bigWin: _bigWin, totalfreesprin: _totalfreesprin, winline: _winline}
      } catch (e) {
      console.error(e)
  }
}

//Check Settlement
export const checkSettlement = async (placebetfunc,args) => {
      // PlaceBet
      await placebetfunc.apply(this,args)
      // get settle result
      let settle_result = await getSettlementResult()
      await utils.sleep(3000)
      let _afbalance = await utils.getBalance()
      //check balance
      await utils.shouldBeEqual(settle_result.red + settle_result.betWin,_afbalance, `verify balance`) 
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
