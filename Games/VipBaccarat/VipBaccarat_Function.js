import * as utils from '../../util/utils'
const VipBaccaratLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./VipBaccarat_Locator').VipBaccaratLocator_vn : require('./VipBaccarat_Locator').VipBaccaratLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `42/user/vipbaccarat,["VipBaccarat",{"remainingTime":45}]`




export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/vipbaccarat,["signedIn"]')
    expect(_result.Val).to.equal(true)
}

export const verifyBetChoice = async() => {
    // await waitUtilNewRound()
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Big)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.PlayerPair)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Player)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Tie)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Banker)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Small)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.BankerPair)
    let _result = await utils.findImage(VipBaccaratLocator.Big)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipBaccaratLocator.PlayerPair)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipBaccaratLocator.Player)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipBaccaratLocator.Tie)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipBaccaratLocator.Banker)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipBaccaratLocator.Small)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipBaccaratLocator.BankerPair)
    expect(_result.Val).to.equal(true)
}

export const openHistory = async() => {
    await utils.clickPos(VipBaccaratLocator.History.x, VipBaccaratLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(1000)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.History)
    let flag = await utils.findImage(VipBaccaratLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(VipBaccaratLocator.HistoryClose.x, VipBaccaratLocator.HistoryClose.y)
    let _result = await utils.findImage(VipBaccaratLocator.Dealer)
    expect(_result.Val).to.equal(true)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage(remainingTime)
    await utils.sleep(8000)
}

export const selectChip = async(_chip=1)=>{
    /*  Param Explained:
        _chip : input chip amount will be selected, by default = 1
    */
    try {
        const _chipbar1 = [10,20,50,100,200]
        const _chipbar2 = [500,1000,2000,3000]
        if (_chipbar2.includes(_chip) === true){
            await utils.swipe(VipBaccaratLocator.ChipBroad.x,VipBaccaratLocator.ChipBroad.y,0,VipBaccaratLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(VipBaccaratLocator.ChipBroad.x,VipBaccaratLocator.ChipBroad.y,VipBaccaratLocator.ChipBroad.x+500,VipBaccaratLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(VipBaccaratLocator[`Chip${_chip}`].x,VipBaccaratLocator[`Chip${_chip}`].y) 

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
            raw = raw.split("42/user/vipbaccarat,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const getUserResult = async() => {
    try {
        let rawData = await getRawData(`42/user/vipbaccarat,["VipBaccarat",{"status":{"winningByChoices`)
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
//Place bet multiple choices and check settle
export const verifySettlementMultipleChoices = async(_choices,_chip) => {
    await waitUtilNewRound()
    await utils.sleep(3000)
    await selectChip(_chip)
    // Select All Choices
    for(let i of _choices){
        await utils.clickPos(VipBaccaratLocator[`${i}`].x,VipBaccaratLocator[`${i}`].y)
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
    let flag = await utils.imageShouldNotDisplay(VipBaccaratLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(VipBaccaratLocator.Home.x, VipBaccaratLocator.Home.y)
    await verifyChoiceClose()
}