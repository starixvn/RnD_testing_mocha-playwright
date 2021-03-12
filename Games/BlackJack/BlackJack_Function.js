import * as utils from '../../util/utils'
import {BlackJackLocator} from './BlackJack_Locator'
import * as config from '../../config/config'
const path = require('path')
const pathImageCompare =path.join(__dirname, '../../') + "ImageCompare" + path.sep + "BlackJack" + path.sep
var jp = require('jsonpath');

export const ReturnHome = async() => {
  await utils.clickPos(BlackJackLocator.Menu.x,BlackJackLocator.Menu.y )
  await utils.sleep(500)
  await utils.clickPos(BlackJackLocator.Home.x,BlackJackLocator.Home.y )
  await utils.sleep(1000)
  let flag = await utils.findImage(GameLobbyLocator.AccountName)
  await utils.shouldBeEqual(flag.Val,true)
}

export const OpenHistory = async() => {
  await utils.clickPos(BlackJackLocator.Menu.x,BlackJackLocator.Menu.y )
  await utils.sleep(500)
  await utils.clickPos(BlackJackLocator.History.x,BlackJackLocator.History.y )
  await utils.sleep(500)

}

export const OpenGuide = async() => {
  await utils.clickPos(BlackJackLocator.Menu.x,BlackJackLocator.Menu.y )
  await utils.sleep(500)
  await utils.clickPos(BlackJackLocator.Guide.x,BlackJackLocator.Guide.y )
  await utils.sleep(500)

}

export const CloseGuide = async() => {
  await utils.clickPos(BlackJackLocator.GuideClose.x,BlackJackLocator.GuideClose.y )
  await utils.sleep(500)
}

export const ClickDeal = async() => {
  await utils.clickPos(BlackJackLocator.Deal.x,BlackJackLocator.Deal.y )
  await utils.sleep(7000)
}

export const ClickCancel = async() => {
  await utils.clickPos(BlackJackLocator.Cancel.x,BlackJackLocator.Cancel.y )
  await utils.sleep(500)
}


export const CloseHistory = async() => {
    await utils.clickPos(BlackJackLocator.HistoryClose.x,BlackJackLocator.HistoryClose.y )
  await utils.sleep(500)
}

export const StandCard = async() => {
  try {
    await utils.sleep(500)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(500)
    const _Stand= await utils.findImage(BlackJackLocator.Stand.ImageCompare,BlackJackLocator.Stand)
      if (_Stand.Val === true){
        console.log('Stand')
        await utils.clickPos(BlackJackLocator.Stand.x,BlackJackLocator.Stand.y)
        await utils.sleep(500)
      }
      else
      console.log('Stand button could not be found')
    } catch (error) {
      console.log(error)
    }
  
}

export const HitCard = async() => {
  try {
    await utils.sleep(500)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(500)
    const _Hit= await utils.findImage(BlackJackLocator.Hit.ImageCompare,BlackJackLocator.Hit)
      if (_Hit.Val === true){
        await utils.clickPos(BlackJackLocator.Hit.x,BlackJackLocator.Hit.y)
        await utils.sleep(500)
      }
      else
      console.log('Hit button could not be found')
  } catch (error) {
    console.log(error)
  }
}

export const NewRound = async() => {
  try {
    await utils.sleep(1000)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(1000)
    const _Newbet= await utils.findImage(BlackJackLocator.New.ImageCompare,BlackJackLocator.New)
      if (_Newbet.Val === true){
        console.log('New Bet')
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
    await utils.sleep(1000)
    await page.mouse.move(BlackJackLocator.Stake.left,BlackJackLocator.Stake.top);
    await utils.sleep(1000)
    const _Rebet= await utils.findImage(BlackJackLocator.Renew.ImageCompare,BlackJackLocator.Renew)
      if (_Rebet.Val === true){
        console.log('ReBet')
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
      // const _cnumber = `Chip${stake}`
      // await utils.clickPos(BlackJackLocator[_cnumber].x,BlackJackLocator[_cnumber].y) //click coin
      await SelectPos(pos)
      //await utils.clickPos(BlackJackLocator[pos].x,BlackJackLocator[pos].y)//click bet position
  } catch (e) {
      console.error(e)
  }
}

//PlaceBet
export const CancelBet = async (_pos) => {
  try {
    if(_pos == 'Pos3'){
      await utils.clickPos(BlackJackLocator.Pos3Cancel.x,BlackJackLocator.Pos3Cancel.y)
      await page.waitForTimeout(1000)
    }
    if (_pos == 'Pos2'){
      await utils.clickPos(BlackJackLocator.Pos2Cancel.x,BlackJackLocator.Pos2Cancel.y)
      await page.waitForTimeout(1000)
    }
    if (_pos == 'Pos1'){
      await utils.clickPos(BlackJackLocator.Pos1Cancel.x,BlackJackLocator.Pos1Cancel.y)
      await page.waitForTimeout(1000)
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
                  console.log(`Stand card pos ${_pos}`)
                  await StandCard()
                  break
                }
              
          }
          else if (_currentscore < 21)
           {
            console.log(`hit card pos ${_pos}`)
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
          console.log(`hit card pos ${_pos}`)
          await utils.sleep(1000)
          await HitCard()
          await utils.sleep(3000)
          _currentscore = await GetHitScore(_pos)
          console.log(_currentscore)
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
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:`ImgCompare_BlackJack_Guide_${t+1}.png`,clip:{
    // x: BlackJackLocator.Guide.left,
    //   y: BlackJackLocator.Guide.top,
    //  width: BlackJackLocator.Guide.width,
    //  height: BlackJackLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(_AcheckImage[t],BlackJackLocator.Guide)
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
  const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"deal'));
  var res = String(_found).split("42/user/blackjack,");
  var obj = JSON.parse(res[1]);
  return obj[1].deal.totalAmount
}

// Get ID of pos after click Deal
export const GetPosId = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal')
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj[1], `$..hands[?(@.pos==${_pos})]`);
  return _result[0].id
}

// Get Bet stake of pos
export const GetPosBet = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal')
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj[1], `$..hands[?(@.pos==${_pos})]`);
  return _result[0].bet
}


// Get Total Score of Pos of first round
export const GetFirstTotalScore = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj[1], `$..hands[?(@.pos==${_pos})]`);
  console.log('First Score: ',Math.max(..._result[0].total))
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
  console.log('Hit card score: ',obj[1].hit.total[0])
  return obj[1].hit.total[0]
}

// Get winloss of pos (based on pos's id) after settled
export const GetWinlossPosID = async(_posid) => {
  const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"finish'));
  var last_found = _found.pop();
  const res = String(last_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  let _result = jp.query(obj[1], `$..winningHands[?(@.id==${_posid})].betwin`);
   _result = +_result || 0
   console.log(`${_posid} win : ${_result}`)
  return _result
}

// get In game Balance
export const GetInGamgeBalance = async() =>{
  let _result = await utils.getWsMessage('"red"')
  const res = String(_result).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  return obj[1].user.red
}

// Check Current Balacnce
export const GetBJUIBalance = async() =>{
  const uibalance= await utils.getUIBalance(BlackJackLocator.Balance.ImageCompare,BlackJackLocator.Balance.left,BlackJackLocator.Balance.top,BlackJackLocator.Balance.width,BlackJackLocator.Balance.height)
  // await page.reload();
  // await utils.sleep(5000)
  // const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  // const res = String(_found).split("42/user/blackjack,");
  // const obj = JSON.parse(res[1]);
  // const _result = jp.query(obj, "$[1]['user']['red']");
  // console.log(`Reload Balance: ${_result[0]}`)
  // return _result[0]
  console.log(`UI Balance: ${uibalance}`)
  return uibalance
}

// Get Total Score of Pos of first round
export const GetDealBalance = async(_pos) => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  const _result = jp.query(obj, "$[1]['user']['red']");
  console.log(`Balance after Deal: ${_result[0]}`)
  return _result[0]
  }


  // Is dealer BlackJack
export const IsDealerBLackJack = async() => {
  const _found = await utils.getWsMessage('42/user/blackjack,["BlackJack",{"deal');
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  let _result = jp.query(obj[1], "$..dealer[1]");
  console.log('dealer', _result)
  if (Object.keys(_result).length > 0){
    return true
  }
  else
    return false
}