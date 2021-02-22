import * as utils from '../../util/utils'
import {BlackJackLocator} from './BlackJack_Locator'
import * as config from '../../config/config'
const chai = require('chai')
const expect = chai.expect

export const OpenFromLobby = async() => {
  await utils.sleep(1000)
  await utils.swipe(config.setting.viewport.width/2, config.setting.viewport.height/2,config.setting.viewport.width/2 - 500, config.setting.viewport.height/2)
  await utils.sleep(1000)
  await utils.clickPos(BlackJackLocator.BlackJack_icon.x,BlackJackLocator.BlackJack_icon.y )
  await utils.sleep(6000)
}

export const ReturnHome = async() => {
  await utils.clickPos(BlackJackLocator.More_icon.x,BlackJackLocator.More_icon.y )
  await utils.sleep(500)
  await utils.clickPos(BlackJackLocator.Home_icon.x,BlackJackLocator.Home_icon.y )
}

export const OpenHistory = async() => {
  await utils.clickPos(BlackJackLocator.More_icon.x,BlackJackLocator.More_icon.y )
  await utils.sleep(500)
  await utils.clickPos(BlackJackLocator.History_icon.x,BlackJackLocator.History_icon.y )
}

export const OpenQuestion = async() => {
  await utils.clickPos(BlackJackLocator.More_icon.x,BlackJackLocator.More_icon.y )
  await utils.sleep(500)
  await utils.clickPos(BlackJackLocator.Question_icon.x,BlackJackLocator.Question_icon.y )
}

export const ClosePopup = async() => {
  await utils.clickPos(BlackJackLocator.Popup_closeicon.x,BlackJackLocator.Popup_closeicon.y )
  await utils.sleep(500)
}


export const verifySignInSuccessfully = async() => {
  let _result = await utils.wsFindMessage('user/blackjack,["signedIn"]')
  console.log(_result.Val)
  expect(_result.Val).to.equal(true)
}


//PlaceBet
export const PlaceBet = async (stake,pos) => {
  try {
      const _cnumber = `Coin${stake}`
      await utils.clickPos(BlackJackLocator[_cnumber].ex,BlackJackLocator[_cnumber].ey) //click coin
      await utils.clickPos(BlackJackLocator[pos].ex,BlackJackLocator[pos].ey)//click bet position
  } catch (e) {
      console.error(e)
  }
}

//PlaceBet
export const CancelBet = async (pos1,pos2,pos3) => {
  try {
    if(pos3 != null){
      await utils.clickPos(BlackJackLocator.Cancel_Pos3.ex,BlackJackLocator.Cancel_Pos3.ey)
      await page.waitForTimeout(1000)
    }
    if (pos2 != null){
      await utils.clickPos(BlackJackLocator.Cancel_Pos2.ex,BlackJackLocator.Cancel_Pos2.ey)
      await page.waitForTimeout(1000)
    }
    if (pos1 != null){
      await utils.clickPos(BlackJackLocator.Cancel_Pos1.ex,BlackJackLocator.Cancel_Pos1.ey)
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
        await utils.clickPos(BlackJackLocator[pos3].ex,BlackJackLocator[pos3].ey)
        await page.waitForTimeout(1000)
      }
      if (pos2 != null){
        await utils.clickPos(BlackJackLocator[pos2].ex,BlackJackLocator[pos2].ey)
        await page.waitForTimeout(1000)
      }
      if (pos1 != null){
        await utils.clickPos(BlackJackLocator[pos1].ex,BlackJackLocator[pos1].ey)
        await page.waitForTimeout(1000)
      }
  } catch (e) {
      console.error(e)
  }
}


