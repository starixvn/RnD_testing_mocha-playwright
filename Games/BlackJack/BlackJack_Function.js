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
  await utils.sleep(500)
}

export const ClickCancel = async() => {
  await utils.clickPos(BlackJackLocator.Cancel.x,BlackJackLocator.Cancel.y )
  await utils.sleep(500)
}


export const CloseHistory = async() => {
  await utils.clickPos(BlackJackLocator.HistoryClose.x,BlackJackLocator.HistoryClose.y )
  await utils.sleep(500)
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

//Bet Deal
export const BetDeal = async (pos1,pos2,pos3) => {
  try {
      await utils.clickPos(BlackJackLocator.Deal.ex,BlackJackLocator.Deal.ey)
      await utils.wsWaitformsg('totalAmount',wsMessageReceived)
      await page.waitForTimeout(9000) // wait for options button enable
      if(pos3 != null){
        await utils.clickPos(BlackJackLocator[pos3].x,BlackJackLocator[pos3].y)
        await page.waitForTimeout(1000)
      }
      if (pos2 != null){
        await utils.clickPos(BlackJackLocator[pos2].x,BlackJackLocator[pos2].y)
        await page.waitForTimeout(1000)
      }
      if (pos1 != null){
        await utils.clickPos(BlackJackLocator[pos1].x,BlackJackLocator[pos1].y)
        await page.waitForTimeout(1000)
      }
  } catch (e) {
      console.error(e)
  }
}

export const VerifyDealerContent = async() => {
  const _result= await utils.findImage(
      BlackJackLocator.DealerContent.ImageCompare,
      BlackJackLocator.DealerContent.left,
      BlackJackLocator.DealerContent.top,
      BlackJackLocator.DealerContent.width,
      BlackJackLocator.DealerContent.height)
  await utils.shouldBeEqual(_result.Val,true)    
}

export const VerifyHistoryContent = async() => {
  // await page.screenshot({path:'ImgCompare_BlackJack_History.png',clip:{x: BlackJackLocator.History.left,
  //   y: BlackJackLocator.History.top,
  //  width: BlackJackLocator.History.width,
  //  height: BlackJackLocator.History.height}})
  const _result0= await utils.findImage(
      BlackJackLocator.History.ImageCompareHistory,
      BlackJackLocator.History.left,
      BlackJackLocator.History.top,
      BlackJackLocator.History.width,
      BlackJackLocator.History.height)
  await utils.shouldBeEqual(_result0.Val,true)    
}

export const VerifyGuideContent = async() => {
  let fx = config.setting.viewport.width /2
  let fy = config.setting.viewport.height /2
  let ty = 0
  let _AcheckImage = [ BlackJackLocator.Guide.ImageCompareGuide1, BlackJackLocator.Guide.ImageCompareGuide2, BlackJackLocator.Guide.ImageCompareGuide3,
    BlackJackLocator.Guide.ImageCompareGuide4, BlackJackLocator.Guide.ImageCompareGuide5, BlackJackLocator.Guide.ImageCompareGuide6] 
  for(let t = 0; t< _AcheckImage.length; t++){
    // await page.screenshot({path:`ImgCompare_BlackJack_Guide_${t+1}.png`,clip:{
    // x: BlackJackLocator.Guide.left,
    //   y: BlackJackLocator.Guide.top,
    //  width: BlackJackLocator.Guide.width,
    //  height: BlackJackLocator.Guide.height}})
    //  await utils.swipe(fx, fy, fx, ty) 
    const _result = await utils.findImage(
      _AcheckImage[t],
      BlackJackLocator.Guide.left,
      BlackJackLocator.Guide.top,
      BlackJackLocator.Guide.width,
      BlackJackLocator.Guide.height
      )
    await utils.swipe(fx, fy, fx, ty) 
    await utils.shouldBeEqual(_result.Val,true)
  
  }    
  
}

export const VerifyDefaultState = async() => {
//Check default pos and stakes, min & maxbet  
  const _result= await utils.findImage(
    BlackJackLocator.DefaultState.ImageCompare,
    BlackJackLocator.DefaultState.left,
    BlackJackLocator.DefaultState.top,
    BlackJackLocator.DefaultState.width,
    BlackJackLocator.DefaultState.height)
await utils.shouldBeEqual(_result.Val,true)    

  //Check default Chip
  const _chip= await utils.findImage(
    BlackJackLocator.DefaultChip.ImageCompare,
    BlackJackLocator.DefaultChip.left,
    BlackJackLocator.DefaultChip.top,
    BlackJackLocator.DefaultChip.width,
    BlackJackLocator.DefaultChip.height)
await utils.shouldBeEqual(_chip.Val,true)  
}

//Sliding chip bar and select chip icon
export const Sliding_Select_Chip = async(_chip) => {
  const _chipbar1 = [1,5,10,50,100]
  const _chipbar2 = [200,500,1000,2000]
  if (_chipbar2.includes(_chip) === true){
    await utils.swipe(950,630,0,630)
    await utils.sleep(1000)
     }
  else if (_chipbar1.includes(_chip) === true){
    await utils.swipe(405,630,1000,630)
    await utils.sleep(1000)
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
    const _result = await utils.findImage(
    pathImageCompare + `Stake${_pos}` + path.sep  + `${_stake}.png`,
    BlackJackLocator[poststake].left,
    BlackJackLocator[poststake].top,
    BlackJackLocator[poststake].width,
    BlackJackLocator[poststake].height)
    await utils.shouldBeEqual(_result.Val,true)    
}


export const VerifyBetBlance = async(_stake) => {
    //   await page.screenshot({path:`${_stake}.png`,clip:{x: BlackJackLocator.Stake.left,
    //   y: BlackJackLocator.Stake.top,
    //  width: BlackJackLocator.Stake.width,
    //  height: BlackJackLocator.Stake.height}})
    const _result = await utils.findImage(
    pathImageCompare + 'BetBalance' + path.sep  + `${_stake}.png`,
    BlackJackLocator.Stake.left,
    BlackJackLocator.Stake.top,
    BlackJackLocator.Stake.width,
    BlackJackLocator.Stake.height)
    await utils.shouldBeEqual(_result.Val,true)    
}


export const VerifyChipColor_Pos2 = async(_chip) => {
  //   await page.screenshot({path:`${_chip}.png`,clip:{x: BlackJackLocator.Pos2.left,
  //   y: BlackJackLocator.Pos2.top,
  //  width: BlackJackLocator.Pos2.width,
  //  height: BlackJackLocator.Pos2.height}})
  const _result = await utils.findImage(
  pathImageCompare + 'ChipColorPos2' + path.sep  + `${_chip}.png`,
  BlackJackLocator.Pos2.left,
  BlackJackLocator.Pos2.top,
  BlackJackLocator.Pos2.width,
  BlackJackLocator.Pos2.height)
  await utils.shouldBeEqual(_result.Val,true)    
}

export const GetTotalBetAmount = async() => {
  const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"deal'));
  var res = String(_found).split("42/user/blackjack,");
  var obj = JSON.parse(res[1]);
  return obj[1].deal.totalAmount
}

export const GetPosId = async(_pos) => {
  const _found = wsMessageReceived.filter(element => element.includes('42/user/blackjack,["BlackJack",{"deal'));
  const res = String(_found).split("42/user/blackjack,");
  const obj = JSON.parse(res[1]);
  console.log[obj]
  //console.log(jp.query(JSON.parse(res[1]),'$..hands[?(@.pos=="1")])'))
 //console.log(jp.query(obj,'$..hands[?(@.pos=="1")])'))


}


