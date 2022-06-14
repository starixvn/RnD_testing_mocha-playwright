import * as utils from '../../util/utils'
const CasinoHPokerLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./CasinoHPoker_Locator').CasinoHPoker_vn : require('./CasinoHPoker_Locator').CasinoHPoker_en)
import * as config from '../../config/config'
const path = require('path')
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "CasinoHPoker" + path.sep
var jp = require('jsonpath');
import {DB} from '../References/DataBase_Locator'


export const ReturnHome = async() => {
  await utils.clickPos(CasinoHPokerLocator.Menu.x,CasinoHPokerLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(CasinoHPokerLocator.Home.x,CasinoHPokerLocator.Home.y )
  await utils.sleep(3000)
  let flag = await utils.imageShouldNotDisplay(CasinoHPokerLocator.DealerContent)
  await utils.shouldBeEqual(flag.Val,true,'Verfiy game is closed successfully')
}

export const OpenHistory = async() => {
  await utils.sleep(5000)
  await utils.clickPos(CasinoHPokerLocator.Menu.x,CasinoHPokerLocator.Menu.y )
  await utils.clickPos(CasinoHPokerLocator.History.x,CasinoHPokerLocator.History.y )
  await utils.sleep(500)
}

export const OpenGuide = async() => {
  await utils.clickPos(CasinoHPokerLocator.Menu.x,CasinoHPokerLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(CasinoHPokerLocator.Guide.x,CasinoHPokerLocator.Guide.y )
  await utils.sleep(100)

}

export const CloseGuide = async() => {
  await utils.clickPos(CasinoHPokerLocator.GuideClose.x,CasinoHPokerLocator.GuideClose.y )
  await utils.sleep(100)
}


export const CloseHistory = async() => {
    await utils.clickPos(CasinoHPokerLocator.PopupClose.x,CasinoHPokerLocator.PopupClose.y )
    await utils.clickPos(CasinoHPokerLocator.Menu.x,CasinoHPokerLocator.Menu.y )
}

const getRawData = async(_mes) => {
  try {
    return await utils.getRowDataFromJS('casinoholdempoker',_mes)
  } catch (error) {
      console.log(error.message)
      return null
  }
}

//Get Settlement Result
export const getSettlementResult = async () => {
  try {
      let _status = await getRawData("endBet")
      let _finish = await getRawData(`{"finish"`)
      let _totalAmount = await utils.getDataJsonPath(_status,`$..totalAmount`)
      let _betchoices = await utils.getDataJsonPath(_status,`$..choices`)
      let _md5 = await utils.getDataJsonPath(_finish,`$..md5.key.rawValue`)
      let _settlementResult = await utils.getDataJsonPath(_finish,`$..settlementResult`)
       return {totalAmount:_totalAmount, betchoices:_betchoices,md5:_md5, settlementResult:_settlementResult }
      } catch (e) {
      console.error(e)
  }
}


//Check Settlement
export const checkSettlement = async (placebetfunc,args,_AAchoice="No",_CheckMD5='Yes') => {
  wsMessageReceived.length=0
  // PlaceBet
  let _bfbalance = await utils.getBalance()
  let _stringmd5 = await placebetfunc.apply(this,args)
  // get settle result
  let settle_result = await getSettlementResult()
  if (_stringmd5 != '' && _CheckMD5 =='Yes') {
    let hashmd5 = await utils.generateMd5(settle_result.md5)
    console.log(_stringmd5,hashmd5);
    await utils.shouldBeEqual(_stringmd5,hashmd5,'Check MD5')
  }
  await utils.sleep(3000)
  let _afbalance = await utils.getBalance()
  //check balance
  if(args[2]=="Double" && _AAchoice=="No")
  {
    await utils.shouldBeEqual((args[0]*3)*2,settle_result.totalAmount) 
  }
  else if(args[2]!="Double" && _AAchoice=="No")
  {
    await utils.shouldBeEqual(args[0]*3,settle_result.totalAmount) 
  }
  await utils.shouldBeEqual((settle_result.settlementResult.ante +  settle_result.settlementResult.aa +  settle_result.settlementResult.call)+(_bfbalance - settle_result.totalAmount), _afbalance) 
  // await utils.shouldBeEqual(settle_result.red + settle_result.betWin,_afbalance, `verify balance`) 
}


export const NewBet = async() => {
  console.log('click newbet');
    await utils.sleep(1000)
    await utils.clickPos(CasinoHPokerLocator.Newbet.x,CasinoHPokerLocator.Newbet.y)
    await utils.sleep(1000)
}

export const Rebet = async() => {
  console.log('click Rebet');
  await utils.clickPos(CasinoHPokerLocator.Rebet.x,CasinoHPokerLocator.Rebet.y)
}

export const VerifySignInSuccessfully = async() => {
  let _result = await utils.wsFindMessage('"signedIn"')
  await utils.shouldBeEqual(_result.Val,true)
}

export const getMD5string = async () => {
  let _found = await utils.getRowDataFromJS("casinoholdempoker", "deal");
  let _md5 = await utils.getDataJsonPath(_found, "$..md5.key");
  return _md5;
};

//PlaceBet
export const PlaceBet = async (stake,pos,_double="NoDouble",hitCard="HitCard", _follow="Follow",_cancel="NoCancel",_swap='noSwap') => {
  try {
      let stringmd5
      await utils.sleep(500)
      await Sliding_Select_Chip(stake)
      await utils.clickPos(CasinoHPokerLocator[pos].x,CasinoHPokerLocator[pos].y)//click bet position
      if (_double == "Double")  {
        console.log('click double stake');
        await utils.sleep(1000)
        await utils.clickPos(CasinoHPokerLocator.Double.x,CasinoHPokerLocator.Double.y)
      } 
      if (hitCard == "HitCard")  {
        console.log('click hit card');
        await utils.sleep(3000)
        await utils.clickPos(CasinoHPokerLocator.Bet.x,CasinoHPokerLocator.Bet.y)
        await utils.sleep(3000)
        stringmd5 = await getMD5string();
        if (_swap == "Swap") {
          console.log("click swap");
          await utils.sleep(3000);
          await utils.clickPos(CasinoHPokerLocator.Bet.x, CasinoHPokerLocator.Bet.y);
        } else {
          console.log("no swap click cancel");
          await utils.sleep(3000);
          await utils.clickPos(
            CasinoHPokerLocator.Cancel.x,
            CasinoHPokerLocator.Cancel.y
          );
        }
      } 
     
      if (_follow == "Follow")  {
        console.log('click follow card');
        await utils.sleep(8000)
        await utils.clickPos(CasinoHPokerLocator.Bet.x,CasinoHPokerLocator.Bet.y)
      } 
      if (_cancel == "Cancel") {
        await utils.sleep(8000)
        console.log('click cancel button');
        await utils.clickPos(CasinoHPokerLocator.Cancel.x,CasinoHPokerLocator.Cancel.y)
      }
   
      return stringmd5
  } catch (e) {
      console.error(e)
  }
}

export const VerifyDealerContent = async() => {
  // await utils.sleep(30000)
  // await utils.CaptureSubImageToFile(CasinoHPokerLocator.DealerContent)
  // await utils.CaptureSubImageToFile(CasinoHPokerLocator.ANTEODD)
  // await utils.CaptureSubImageToFile(CasinoHPokerLocator.AAODD)
  let _result= await utils.findImage(CasinoHPokerLocator.DealerContent.ImageCompare,CasinoHPokerLocator.DealerContent)
  await utils.shouldBeEqual(_result.Val,true,'check dealer content')   
  _result= await utils.findImage(CasinoHPokerLocator.ANTEODD.ImageCompare,CasinoHPokerLocator.ANTEODD)
  await utils.shouldBeEqual(_result.Val,true,'check ANTEODD content')  
  _result= await utils.findImage(CasinoHPokerLocator.AAODD.ImageCompare,CasinoHPokerLocator.AAODD)
  await utils.shouldBeEqual(_result.Val,true,'check AAODD content')    
}

export const VerifyHistoryContent = async() => {
  let res = await utils.wsFindMessage('42/user/casinoholdempoker,["CasinoHoldemPoker",{"history"')
  await utils.shouldBeEqual(res.Val, true,'Check History')
}

export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ CasinoHPokerLocator.Guide.ImageCompare1, CasinoHPokerLocator.Guide.ImageCompare2, CasinoHPokerLocator.Guide.ImageCompare3,
    CasinoHPokerLocator.Guide.ImageCompare4, CasinoHPokerLocator.Guide.ImageCompare5, CasinoHPokerLocator.Guide.ImageCompare6] 
    for(let t = 0; t< _AcheckImage.length; t++){
    //   await page.screenshot({path:_AcheckImage[t],clip:{
    // x: CasinoHPokerLocator.Guide.left,
    //   y: CasinoHPokerLocator.Guide.top,
    //  width: CasinoHPokerLocator.Guide.width,
    //  height: CasinoHPokerLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],CasinoHPokerLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }    
  
}

//Sliding chip bar and select chip icon
export const Sliding_Select_Chip = async(_chip) => {
  const _chipbar1 = [1,5,10,50,100]
  const _chipbar2 = [200,500,1000,2000]
  if (_chipbar2.includes(_chip) === true){
    await utils.swipe(877,630,420,630)
    await utils.sleep(500)
     }
  else if (_chipbar1.includes(_chip) === true){
    await utils.swipe(420,630,877,630)
    await utils.sleep(500)
   }
    await utils.clickPos(CasinoHPokerLocator[`Chip${_chip}`].x,CasinoHPokerLocator[`Chip${_chip}`].y)  
  }

// Get ID of pos after click Deal
export const GetRoundId= async() => {
  const _found = await utils.getWsMessage('42/user/casinoholdempoker,["CasinoHoldemPoker",{"deal')
  const res = String(_found).split("42/user/casinoholdempoker,");
  const obj = JSON.parse(res[1]);
  const _result = jp.value(obj[1], `$..roundId`);
  return _result
}


// Get winloss of pos (based on pos's id) after settled
export const GetSettleResultByPosID = async(_posid) => {
  // const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"finish'));
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"finish');
  if(_found === null){
    console.log(`can not get finish data`)
  }
  //var last_found = _found.pop();
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  let _betwin = jp.value(obj[1], `$..winningHands[?(@.id==${_posid})].betwin`);
  _betwin = +_betwin || 0
  let _settleresult = jp.value(obj[1], `$..settlementResult`);
   return { betwin : _betwin , settleresult : _settleresult}
}


//Check Round History
export const CheckRoundHistory = async(_rid,_settleresult,_betstake,_winloss) => {
  await OpenHistory()
  await utils.sleep(3000)
  let _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"history"')
  if(_found === null){
    console.log(`can not get history data`)
  }
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  let _getbetstake = jp.value(obj[1],`$..betLogs[?(@.id==${_rid})].bet`);
  let _getsettleresult = jp.value(obj[1],`$..betLogs[?(@.id==${_rid})].settlementResult`);
  let _getwinloss = jp.value(obj[1],`$..betLogs[?(@.id==${_rid})].betwin`)
  // check
  await utils.shouldBeEqual(_betstake,_getbetstake, 'Verify Bet Stake')
  await utils.shouldBeEqual(_settleresult,_getsettleresult,'Verify Settlement result')
  await utils.shouldBeEqual(_winloss,_getwinloss,'Verify win loss')
  await CloseHistory()
}

export const CheckSettleBalance = async(_expectBalance) => {
  await utils.sleep(4000)
  let _settledbalance = await utils.getBalance()
  let _val1 = Math.round(_settledbalance * 100) / 100
  let _val2 = Math.round(_expectBalance * 100) / 100
  await utils.shouldBeEqual(_val1,_val2,`Check settle balance: current balance ${_val1} and expected balance ${_val2}`)
}
