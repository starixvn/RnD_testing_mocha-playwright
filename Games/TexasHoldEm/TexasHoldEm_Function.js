import * as utils from '../../util/utils'
const TexasHoldEmLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./TexasHoldEm_Locator').TexasHoldEm_vn : require('./TexasHoldEm_Locator').TexasHoldEm_en)
import * as config from '../../config/config'
const path = require('path')
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "TexasHoldEm" + path.sep
var jp = require('jsonpath');
import {DB} from '../References/DataBase_Locator'


export const ReturnHome = async() => {
  await utils.clickPos(TexasHoldEmLocator.Menu.x,TexasHoldEmLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(TexasHoldEmLocator.Home.x,TexasHoldEmLocator.Home.y )
  await utils.sleep(3000)
}

export const OpenHistory = async() => {
  await utils.sleep(5000)
  await utils.clickPos(TexasHoldEmLocator.Menu.x,TexasHoldEmLocator.Menu.y )
  await utils.clickPos(TexasHoldEmLocator.History.x,TexasHoldEmLocator.History.y )
  await utils.sleep(500)
}

export const OpenGuide = async() => {
  await utils.clickPos(TexasHoldEmLocator.Menu.x,TexasHoldEmLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(TexasHoldEmLocator.Guide.x,TexasHoldEmLocator.Guide.y )
  await utils.sleep(100)

}

export const CloseGuide = async() => {
  await utils.clickPos(TexasHoldEmLocator.GuideClose.x,TexasHoldEmLocator.GuideClose.y )
  await utils.sleep(100)
}


export const CloseHistory = async() => {
    await utils.clickPos(TexasHoldEmLocator.PopupClose.x,TexasHoldEmLocator.PopupClose.y )
    await utils.clickPos(TexasHoldEmLocator.Menu.x,TexasHoldEmLocator.Menu.y )
}


//Get Settlement Result
export const getSettlementResult = async () => {
  try {
      let _found = await utils.getRowDataFromJS('texasholdempoker','finish')
      let settlementResult = await utils.getDataJsonPath(_found,`$..settlementResult`)
      return {ante: settlementResult.ante, call: settlementResult.call, turn: settlementResult.turn, river: settlementResult.river,}
      } catch (e) {
      console.error(e)
  }
}


//Check Settlement
export const checkSettlement = async (placebetfunc,args,_AAchoice="No") => {
  // PlaceBet
  let _bfbalance = await utils.getBalance()
  await placebetfunc.apply(this,args)
  // get settle result
  let settle_result = await getSettlementResult()
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


export const VerifySignInSuccessfully = async() => {
  let _result = await utils.wsFindMessage('["signedIn"]')
  await utils.shouldBeEqual(_result.Val,true)
  await utils.sleep(3000) //hard sleep
}


//PlaceBet
export const PlaceBet = async (stake,_double,_IsFollow,_IsTurn,_IsRiver,_IsReBet='NewBet') => {
  try {
      await utils.sleep(500)
      await Sliding_Select_Chip(stake)
      await utils.clickPos(TexasHoldEmLocator.ANTEODD.x,TexasHoldEmLocator.ANTEODD.y)//click bet position
      if(Boolean(_double))  {
        // console.log('click double stake');
        await utils.clickPos(TexasHoldEmLocator.Double.x,TexasHoldEmLocator.Double.y)
        stake = stake*2
      } 
      await utils.clickPos(TexasHoldEmLocator.Bet.x,TexasHoldEmLocator.Bet.y)//click bet button
      await utils.wsWaitMessage('"deal"')
       //////// FOLLOW
      if(Boolean(_IsFollow)){
        // console.log('click follow');
        await utils.sleep(3000)  
        await utils.clickPos(TexasHoldEmLocator.Bet.x,TexasHoldEmLocator.Bet.y)
        await utils.wsWaitMessage('endBet":2')
     }
      else if(_IsFollow.length < 1) {
        // console.log('click bo bai');
        await utils.sleep(3000)
        await utils.clickPos(TexasHoldEmLocator.Cancel.x,TexasHoldEmLocator.Cancel.y)  //xem bo bai
        await utils.sleep(2000)
        await utils.clickPos(TexasHoldEmLocator.Cancel.x,TexasHoldEmLocator.Cancel.y) //click new bet
      }
      //////// TURN
      if(Boolean(_IsTurn)){
        await utils.sleep(3000)  
        // console.log('chon turn');
        await utils.clickPos(TexasHoldEmLocator.Bet.x,TexasHoldEmLocator.Bet.y)
        await utils.wsWaitMessage(`"turn":${stake}}`)

      } 
      else if(_IsTurn.length < 1 && _IsFollow.length > 1){
        // console.log('bỏ turn xem bài');
        await utils.sleep(3000)
        await utils.clickPos(TexasHoldEmLocator.Cancel.x,TexasHoldEmLocator.Cancel.y)  //xem card skip Turn
      }

      //////// RIVER
      if(Boolean(_IsRiver)){
        await utils.sleep(3000)  
        // console.log('chon river');
        await utils.clickPos(TexasHoldEmLocator.Bet.x,TexasHoldEmLocator.Bet.y)
        await utils.wsWaitMessage(`"river":${stake}}`)

      } 
      else if(_IsRiver.length < 1 && _IsFollow.length > 1){
        // console.log('bỏ river xem bài');
        await utils.sleep(3000)
        await utils.clickPos(TexasHoldEmLocator.Cancel.x,TexasHoldEmLocator.Cancel.y)  //xem card skip River
      }
    //////// REBET
      if(_IsReBet == 'Rebet'){
        // console.log('Rebet');
        await utils.sleep(5000)
        await utils.clickPos(TexasHoldEmLocator.Bet.x,TexasHoldEmLocator.Bet.y)
      } 
      else if (_IsReBet != 'Rebet'&& _IsFollow.length > 1){
        // console.log('NewBet');
        await utils.sleep(5000)
        await utils.clickPos(TexasHoldEmLocator.Cancel.x,TexasHoldEmLocator.Cancel.y)  //click new bet
      }
  } catch (e) {
      console.error(e)
  }
}


export const VerifyHistoryContent = async() => {
  let res = await utils.wsFindMessage('"TexasHoldemPoker",{"history"')
  await utils.shouldBeEqual(res.Val, true,'Check History')
}

export const VerifyGuideContent = async() => {
  await utils.sleep(5000)
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ TexasHoldEmLocator.Guide.ImageCompare1, TexasHoldEmLocator.Guide.ImageCompare2, TexasHoldEmLocator.Guide.ImageCompare3,
    TexasHoldEmLocator.Guide.ImageCompare4, TexasHoldEmLocator.Guide.ImageCompare5, TexasHoldEmLocator.Guide.ImageCompare6] 
    for(let t = 0; t< _AcheckImage.length; t++){
    //   await page.screenshot({path:_AcheckImage[t],clip:{
    // x: TexasHoldEmLocator.Guide.left,
    //   y: TexasHoldEmLocator.Guide.top,
    //  width: TexasHoldEmLocator.Guide.width,
    //  height: TexasHoldEmLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],TexasHoldEmLocator.Guide)
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
    await utils.clickPos(TexasHoldEmLocator[`Chip${_chip}`].x,TexasHoldEmLocator[`Chip${_chip}`].y)  
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
export const VerifyBetStake = async(stake) => {
  const _found = await utils.getWsMessage('"TexasHoldemPoker",{"deal"');
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
