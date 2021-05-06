import * as utils from '../../util/utils'
import {BlackJackLocator} from './BlackJack_Locator'
import * as config from '../../config/config'
const path = require('path')
const pathImageCompare =path.join(__dirname, '../../') + "ImageCompare" + path.sep + "BlackJack" + path.sep
var jp = require('jsonpath');
import {DB} from './../DataBase_Locator'


export const ReturnHome = async() => {
  await utils.clickPos(BlackJackLocator.Menu.x,BlackJackLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(BlackJackLocator.Home.x,BlackJackLocator.Home.y )
  await utils.sleep(3000)
  let flag = await utils.imageShouldNotDisplay(BlackJackLocator.DealerContent)
  await utils.shouldBeEqual(flag.Val,true,'Verfiy game is closed successfully')
}

export const OpenHistory = async() => {
  await utils.clickPos(BlackJackLocator.Menu.x,BlackJackLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(BlackJackLocator.History.x,BlackJackLocator.History.y )
  await utils.sleep(100)

}

export const OpenGuide = async() => {
  await utils.clickPos(BlackJackLocator.Menu.x,BlackJackLocator.Menu.y )
  await utils.sleep(100)
  await utils.clickPos(BlackJackLocator.Guide.x,BlackJackLocator.Guide.y )
  await utils.sleep(100)

}

export const CloseGuide = async() => {
  await utils.clickPos(BlackJackLocator.GuideClose.x,BlackJackLocator.GuideClose.y )
  await utils.sleep(100)
}

export const ClickDeal = async() => {
  await utils.clickPos(BlackJackLocator.Deal.x,BlackJackLocator.Deal.y )
  await utils.sleep(8000)
}

export const ClickCancel = async() => {
  await utils.clickPos(BlackJackLocator.Cancel.x,BlackJackLocator.Cancel.y )
  await utils.sleep(100)
}


export const CloseHistory = async() => {
    await utils.clickPos(BlackJackLocator.HistoryClose.x,BlackJackLocator.HistoryClose.y )
  await utils.sleep(500)
}

export const StandCard = async() => {
  try {
    await utils.sleep(100)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(500)
    const _Stand= await utils.findImage(BlackJackLocator.Stand.ImageCompare,BlackJackLocator.Stand)
      if (_Stand.Val === true){
       // console.log('Stand')
        await utils.clickPos(BlackJackLocator.Stand.x,BlackJackLocator.Stand.y)
        await utils.sleep(1000)
      }
      else
      console.log('Stand button could not be found')
    } catch (error) {
      console.log(error)
    }
  
}

export const HitCard = async() => {
  try {
    await utils.sleep(100)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(500)
    const _Hit= await utils.findImage(BlackJackLocator.Hit.ImageCompare,BlackJackLocator.Hit)
      if (_Hit.Val === true){
        await utils.clickPos(BlackJackLocator.Hit.x,BlackJackLocator.Hit.y)
        await utils.sleep(1000)
      }
      else
      console.log('Hit button could not be found')
  } catch (error) {
    console.log(error)
  }
}

export const NewRound = async() => {
  try {
    await utils.sleep(100)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(1000)
    const _Newbet= await utils.findImage(BlackJackLocator.New.ImageCompare,BlackJackLocator.New)
      if (_Newbet.Val === true){
        //console.log('New Bet')
        wsMessageReceived = []
        await utils.clickPos(BlackJackLocator.New.x,BlackJackLocator.New.y)
        await utils.sleep(3000)
      }
      else
      console.log('New Bet button could not be found')
  } catch (error) {
    console.log(error)
  }
}

export const Rebet = async() => {
  try {
    await utils.sleep(100)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(1000)
    const _Rebet= await utils.findImage(BlackJackLocator.Renew.ImageCompare,BlackJackLocator.Renew)
      if (_Rebet.Val === true){
        //console.log('ReBet')
        wsMessageReceived = []
        await utils.clickPos(BlackJackLocator.Renew.x,BlackJackLocator.Renew.y)
        await utils.sleep(3000)
      }
      else
      console.log('Rebet button could not be found')
    
  } catch (error) {
    console.log(error)
  }
 
}

export const VerifySignInSuccessfully = async() => {
  let _result = await utils.wsFindMessage('user/blackjack,["signedIn"]')
  await utils.shouldBeEqual(_result.Val,true)
}


//PlaceBet
export const PlaceBet = async (stake,pos) => {
  try {
      await utils.sleep(500)
      await Sliding_Select_Chip(stake)
      await SelectPos(pos)
  } catch (e) {
      console.error(e)
  }
}

//PlaceBet
export const CancelBet = async (_pos) => {
  try {
    if(_pos == 'Pos3'){
      await utils.clickPos(BlackJackLocator.Pos3Cancel.x,BlackJackLocator.Pos3Cancel.y)
      await page.waitForTimeout(500)
    }
    if (_pos == 'Pos2'){
      await utils.clickPos(BlackJackLocator.Pos2Cancel.x,BlackJackLocator.Pos2Cancel.y)
      await page.waitForTimeout(500)
    }
    if (_pos == 'Pos1'){
      await utils.clickPos(BlackJackLocator.Pos1Cancel.x,BlackJackLocator.Pos1Cancel.y)
      await page.waitForTimeout(500)
    }
  } catch (e) {
      console.error(e)
  }
}

//Bet Settle
export const BetSettle_HitCardUntilOver15 = async (_pos) => {
  try {
        let isdealerbj = await IsDealerBLackJack()
        let _currentscore = 0  
        const _result = await GetFirstTotalScore(_pos)
        for (let i = 0; i < 4; i++){
          if (isdealerbj ==true){
            break
          }
          if (_result >= 15 || _currentscore >= 15 )
            { 
              if (_result == 21 )
                 break              
              else if (_currentscore < 21) {
                  //console.log(`Stand card pos ${_pos}`)
                  await StandCard()
                  break
                }
              
          }
          else if (_currentscore < 21)
           {
            //console.log(`hit card pos ${_pos}`)
            await HitCard()
            await utils.sleep(3000) //wait for wsmsg
            _currentscore = await GetHitScore(_pos)
          }  
      }
      
  } catch (e) {
      console.error(e)
  }
}

export const BetSettle_HitToQuizzed = async (_pos) => {
  try {
      let isdealerbj = await IsDealerBLackJack()
      let _currentscore = 0 
      const _result = await GetFirstTotalScore(_pos)
      for (let i = 0; i < 4; i++){  
        if (isdealerbj ==true){
          break
        }
        if (_result >= 21 ||_currentscore >= 21)
        {
          break
        }
        else
        {
          //console.log(`hit card pos ${_pos}`)
          await utils.sleep(1000)
          await HitCard()
          await utils.sleep(3000)
          _currentscore = await GetHitScore(_pos)
          //console.log(_currentscore)
        }
      }
  } catch (e) {
      console.error(e)
  }
}

export const VerifyDealerContent = async() => {
  const _result= await utils.findImage(BlackJackLocator.DealerContent.ImageCompare,BlackJackLocator.DealerContent)
  await utils.shouldBeEqual(_result.Val,true)    
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:'ImgCompare_BlackJack_History.png',clip:{x: BlackJackLocator.History.left,
  //   y: BlackJackLocator.History.top,
  //  width: BlackJackLocator.History.width,
  //  height: BlackJackLocator.History.height}})
  const _result0= await utils.findImage(BlackJackLocator.History.ImageCompare,BlackJackLocator.History)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyGuideContent = async() => {
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ BlackJackLocator.Guide.ImageCompare1, BlackJackLocator.Guide.ImageCompare2, BlackJackLocator.Guide.ImageCompare3,
    BlackJackLocator.Guide.ImageCompare4, BlackJackLocator.Guide.ImageCompare5, BlackJackLocator.Guide.ImageCompare6] 
  for(let t of _AcheckImage){
    // await page.screenshot({path:t,clip:{
    // x: BlackJackLocator.Guide.left,
    //   y: BlackJackLocator.Guide.top,
    //  width: BlackJackLocator.Guide.width,
    //  height: BlackJackLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(t,BlackJackLocator.Guide)
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }    
  
}

export const VerifyDefaultState = async() => {
//Check default pos and stakes, min & maxbet  
  const _result= await utils.findImage(BlackJackLocator.DefaultState.ImageCompare,BlackJackLocator.DefaultState)
await utils.shouldBeEqual(_result.Val,true)    

  //Check default Chip
  const _chip= await utils.findImage(BlackJackLocator.DefaultChip.ImageCompare,BlackJackLocator.DefaultChip)
await utils.shouldBeEqual(_chip.Val,true)  
}

//Sliding chip bar and select chip icon
export const Sliding_Select_Chip = async(_chip) => {
  const _chipbar1 = [1,5,10,50,100]
  const _chipbar2 = [200,500,1000,2000]
  if (_chipbar2.includes(_chip) === true){
    await utils.swipe(950,630,0,630)
    await utils.sleep(500)
     }
  else if (_chipbar1.includes(_chip) === true){
    await utils.swipe(405,630,1000,630)
    await utils.sleep(500)
   }
    await utils.clickPos(BlackJackLocator[`Chip${_chip}`].x,BlackJackLocator[`Chip${_chip}`].y)  
  }

//Select Bet pos
export const SelectPos = async(_pos) => {
  await utils.clickPos(BlackJackLocator[_pos].x,BlackJackLocator[_pos].y)//click bet position
}

export const VerifyPosStake = async(_pos,_stake) => {
  const poststake = `${_pos}Stake`
    //   await page.screenshot({path:`${_stake}${_pos}.png`,clip:{x: BlackJackLocator[poststake].left,
    //   y: BlackJackLocator[poststake].top,
    //  width: BlackJackLocator[poststake].width,
    //  height: BlackJackLocator[poststake].height}})
    const _result = await utils.findImage(pathImageCompare + `Stake${_pos}` + path.sep  + `${_stake}.png`,BlackJackLocator[poststake])
    await utils.shouldBeEqual(_result.Val,true)    
}


export const VerifyBetBlance = async(_stake) => {
    //   await page.screenshot({path:`${_stake}.png`,clip:{x: BlackJackLocator.Stake.left,
    //   y: BlackJackLocator.Stake.top,
    //  width: BlackJackLocator.Stake.width,
    //  height: BlackJackLocator.Stake.height}})
    const _result = await utils.findImage(pathImageCompare + 'BetBalance' + path.sep  + `${_stake}.png`,BlackJackLocator.Stake)
   await utils.shouldBeEqual(_result.Val,true)    
}


export const VerifyChipColor_Pos2 = async(_chip) => {
  //   await page.screenshot({path:`${_chip}.png`,clip:{x: BlackJackLocator.Pos2.left,
  //   y: BlackJackLocator.Pos2.top,
  //  width: BlackJackLocator.Pos2.width,
  //  height: BlackJackLocator.Pos2.height}})
  const _result = await utils.findImage(pathImageCompare + 'ChipColorPos2' + path.sep  + `${_chip}.png`,BlackJackLocator.Pos2)
  await utils.shouldBeEqual(_result.Val,true)    
}

// Get Total Bet Ammount of all pos after click Deal
export const GetTotalBetAmount = async() => {
  //const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"deal'));
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal')
  var res = String(_found).split("42/user/blackjack,");
  var obj = JSON.parse(res[1]);
  return obj[1].deal.totalAmount
}

// Get ID of pos after click Deal
export const GetPosId = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal')
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.value(obj[1], `$..hands[?(@.pos==${_pos})].id`);
  return _result
}

// Get Bet stake of pos
export const GetPosBet = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal')
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.value(obj[1], `$..hands[?(@.pos==${_pos})].bet`);
  return _result
}


// Get Total Score of Pos of first round
export const GetFirstTotalScore = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj[1], `$..hands[?(@.pos==${_pos})]`);
  //console.log('First Score: ',Math.max(..._result[0].total))
  return Math.max(..._result[0].total)
}

// Get current score of pos when hitting a card
export const GetHitScore = async(_pos) => { 
  let _foundhit = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"hit"')
  //console.log(_foundhit)
    if (_foundhit.includes(_pos) === false){
    await utils.sleep(3000)
    _foundhit = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"hit"')
  }
  const res = String(_foundhit).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  // console.log('Hit card score: ',obj[1].hit.total[0])
  return obj[1].hit.total[0]
}

// Get Total Score of Pos of first round
export const GetDealBalance = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.value(obj, "$[1]['user']['red']");
  //console.log(`Balance after Deal: ${_result[0]}`)
  return _result
  }


  // Is dealer BlackJack
export const IsDealerBLackJack = async() => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  let _result = jp.query(obj[1], "$..dealer[1]");
 // console.log('dealer', _result)
  if (Object.keys(_result).length > 0){
    return true
  }
  else
    return false
}

// Get winloss of pos (based on pos's id) after settled
export const GetSettleResultByPosID = async(_posid) => {
  // const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"finish'));
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"finish');
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


///////////////////////////////////////////////////////////Database Functions

export const verifyDBCuoc = async(_resultOnWeb) => {
  let qrFindCuoc = { $and: [{ name : await utils.getName() }, {phien :_resultOnWeb.roundId}]}
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BlackJack.cuoc,qrFindCuoc)
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
  await utils.shouldBeEqual(parseFloat(resultOnDb.betwin).toFixed(1),parseFloat( _resultOnWeb.betwin).toFixed(1))
  // Verify pos
  await utils.shouldBeEqual(resultOnDb.pos,_resultOnWeb.pos)
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
  let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.BlackJack.phien,qrFindPhien)
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
