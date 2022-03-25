import * as utils from '../../util/utils'
const ThreeCardsLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./ThreeCards_Locator').ThreeCardsLocator_vn : require('./ThreeCards_Locator').ThreeCardsLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `42/user/threecards,["ThreeCards",{"remainingTime":39}]`




export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/threecards,["signedIn"]')
    expect(_result.Val).to.equal(true)
}

export const verifyBetChoice = async() => {
    // await waitUtilNewRound()
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.Red)
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.Black)
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.Diamonds)
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.Hearts)
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.Spades)
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.Clubs)
    let _result = await utils.findImage(ThreeCardsLocator.Red)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(ThreeCardsLocator.Black)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(ThreeCardsLocator.Diamonds)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(ThreeCardsLocator.Hearts)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(ThreeCardsLocator.Spades)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(ThreeCardsLocator.Clubs)
    expect(_result.Val).to.equal(true)
}

export const openHistory = async() => {
    await utils.sleep(5000)
    await utils.clickPos(ThreeCardsLocator.History.x, ThreeCardsLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(1000)
    // await utils.CaptureSubImageToFile(ThreeCardsLocator.History)
    // let flag = await utils.findImage(ThreeCardsLocator.History)
    // await utils.shouldBeEqual(flag.Val,true)
    let res = await utils.wsFindMessage('42/user/threecards,["ThreeCards",{"history"')
    await utils.shouldBeEqual(res.Val, true,'Check History')
}

export const closeHistory = async() => {
    await utils.clickPos(ThreeCardsLocator.HistoryClose.x, ThreeCardsLocator.HistoryClose.y)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage(remainingTime)
    await utils.sleep(9000)
}

export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    await utils.sleep(1000)
    wsMessageReceived = []
    await utils.clickPos(ThreeCardsLocator[`Chip${_chip}`].x,ThreeCardsLocator[`Chip${_chip}`].y)
    await utils.clickPos(ThreeCardsLocator[`${_choice1}`].x,ThreeCardsLocator[`${_choice1}`].y)
    await utils.sleep(200)
    await utils.clickPos(ThreeCardsLocator[`${_choice2}`].x, ThreeCardsLocator[`${_choice2}`].y)
    let _result = await utils.wsFindMessage(ermsg,20)
    expect(_result.Val).to.equal(true)
  }

export const selectChip = async(_chip=1)=>{
    /*  Param Explained:
        _chip : input chip amount will be selected, by default = 1
    */
    try {
        const _chipbar1 = [1,5,10,50,100]
        const _chipbar2 = [200,500,1000,2000]
        if (_chipbar2.includes(_chip) === true){
            await utils.swipe(ThreeCardsLocator.ChipBroad.x,ThreeCardsLocator.ChipBroad.y,0,ThreeCardsLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(ThreeCardsLocator.ChipBroad.x,ThreeCardsLocator.ChipBroad.y,ThreeCardsLocator.ChipBroad.x+500,ThreeCardsLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(ThreeCardsLocator[`Chip${_chip}`].x,ThreeCardsLocator[`Chip${_chip}`].y) 

    } catch (error) {
        console.log(error.message)
    }
}
const getBalance = async() => {
    return await utils.getBalance()
}

const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        if(raw === null) return null
        else {
            raw = raw.split("42/user/threecards,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const getUserResult = async() => {
    try {
        let rawData = await getRawData(`42/user/threecards,["ThreeCards",{"status":{"winningByChoices`)
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
//Place bet multiple choices and check settle
export const verifySettlementMultipleChoices = async(_choices,_chip) => {
    await waitUtilNewRound()
    await selectChip(_chip)
    // Select All Choices
    for(let i of _choices){
        await utils.clickPos(ThreeCardsLocator[`${i}`].x,ThreeCardsLocator[`${i}`].y)
        }
    await utils.sleep(1000)
    let currentBalance = await getBalance()
    // Get Settle
    wsMessageReceived = []
    let status = await getUserResult()
    let balance = currentBalance +  status.bet
    await utils.sleep(5000)
    currentBalance = await getBalance()
    // Verify Balance on UI
    // console.log('actual Balance: ' + currentBalance)
    let rs = (Math.abs(currentBalance-balance) <= 0.01) ? true : false;
    // console.log(Math.abs(currentBalance-balance))
    await utils.shouldBeEqual(rs,true,"Error: expect actual balance ( "+currentBalance+" ) to equal : "+balance)
} 

const verifyChoiceClose = async() => {
    let flag = await utils.imageShouldNotDisplay(ThreeCardsLocator.Red)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(ThreeCardsLocator.Home.x, ThreeCardsLocator.Home.y)
    await verifyChoiceClose()
}