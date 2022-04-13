import * as utils from '../../util/utils'
const BaccaratLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./Baccarat_Locator').BaccaratLocator_vn : require('./Baccarat_Locator').BaccaratLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `"remainingTime":45`




export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('"toGame":"Baccarat"}')
    expect(_result.Val).to.equal(true)
    utils.sleep(8000)
}

export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    wsMessageReceived = []
    await utils.clickPos(BaccaratLocator[`${_choice1}`].x,BaccaratLocator[`${_choice1}`].y)
    await utils.clickPos(BaccaratLocator[`${_choice1}`].x,BaccaratLocator[`${_choice1}`].y)
    await utils.sleep(200)
    await utils.clickPos(BaccaratLocator[`${_choice2}`].x, BaccaratLocator[`${_choice2}`].y)
    let _result = await utils.wsFindMessage(ermsg,20)
    expect(_result.Val).to.equal(true)
}

export const verifyBetChoice = async() => {
    await waitUtilNewRound()
    // await utils.CaptureSubImageToFile(BaccaratLocator.Big)
    // await utils.CaptureSubImageToFile(BaccaratLocator.PlayerPair)
    // await utils.CaptureSubImageToFile(BaccaratLocator.Player)
    // await utils.CaptureSubImageToFile(BaccaratLocator.Tie)
    // await utils.CaptureSubImageToFile(BaccaratLocator.Banker)
    // await utils.CaptureSubImageToFile(BaccaratLocator.Small)
    // await utils.CaptureSubImageToFile(BaccaratLocator.BankerPair)
    let _result = await utils.findImage(BaccaratLocator.Big)
    await utils.shouldBeEqual(_result.Val,true,"verify big")
    _result = await utils.findImage(BaccaratLocator.PlayerPair)
    await utils.shouldBeEqual(_result.Val,true,"verify PlayerPair")
    _result = await utils.findImage(BaccaratLocator.Player)
    await utils.shouldBeEqual(_result.Val,true,"verify Player")
    _result = await utils.findImage(BaccaratLocator.Tie)
    await utils.shouldBeEqual(_result.Val,true,"verify Tie")
    _result = await utils.findImage(BaccaratLocator.Banker)
    await utils.shouldBeEqual(_result.Val,true,"verify banker")
    _result = await utils.findImage(BaccaratLocator.Small)
    await utils.shouldBeEqual(_result.Val,true,"verify small")
    _result = await utils.findImage(BaccaratLocator.BankerPair)
    await utils.shouldBeEqual(_result.Val,true,"verify BankerPair")
}

export const openHistory = async() => {
    await utils.sleep(1000)
    await utils.clickPos(BaccaratLocator.History.x, BaccaratLocator.History.y)
    await utils.sleep(1000)
}

export const verifyHistoryPopup = async() => {
    try {
        await utils.sleep(1000)
        let res = await utils.wsFindMessage('"history"',20)
        await utils.shouldBeEqual(res.Val, true,'Check History')
    } catch (error) {
        
    }
    // await utils.CaptureSubImageToFile(BaccaratLocator.History)
    // let flag = await utils.findImage(BaccaratLocator.History)
    // await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(BaccaratLocator.HistoryClose.x, BaccaratLocator.HistoryClose.y)
    let _result = await utils.findImage(BaccaratLocator.Dealer)
    expect(_result.Val).to.equal(true)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage(remainingTime)
    await utils.sleep(13000)
}

export const selectChip = async(_chip=1)=>{
    /*  Param Explained:
        _chip : input chip amount will be selected, by default = 1
    */
    try {
        const _chipbar1 = [1,5,10,50,100]
        const _chipbar2 = [500,1000,2000,3000]
        if (_chipbar2.includes(_chip) === true){
            await utils.swipe(BaccaratLocator.ChipBroad.x,BaccaratLocator.ChipBroad.y,0,BaccaratLocator.ChipBroad.y)
            await utils.sleep(500)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(BaccaratLocator.ChipBroad.x,BaccaratLocator.ChipBroad.y,BaccaratLocator.ChipBroad.x+500,BaccaratLocator.ChipBroad.y)
            await utils.sleep(500)
        }
        await utils.clickPos(BaccaratLocator[`Chip${_chip}`].x,BaccaratLocator[`Chip${_chip}`].y) 

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
            raw = raw.split("42/user/baccarat,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const getUserResult = async() => {
    try {
        let rawData = await getRawData(`"status"`)
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
        await utils.clickPos(BaccaratLocator[`${i}`].x,BaccaratLocator[`${i}`].y)
        await utils.sleep(100)
        }
    await utils.sleep(500)
    let currentBalance = await getBalance()
    // Get Settle
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
    let flag = await utils.imageShouldNotDisplay(BaccaratLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.CaptureSubImageToFile(BaccaratLocator.Dealer)
    await utils.clickPos(BaccaratLocator.Home.x, BaccaratLocator.Home.y)
    await verifyChoiceClose()
}