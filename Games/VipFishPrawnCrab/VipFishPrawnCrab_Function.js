import * as utils from '../../util/utils'
const VipFishPrawnCrabLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./VipFishPrawnCrab_Locator').VipFishPrawnCrabLocator_vn : require('./VipFishPrawnCrab_Locator').VipFishPrawnCrabLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `"remainingTime":42`




export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/vipfishprawncrab,["signedIn"]')
    expect(_result.Val).to.equal(true)
}


export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    try {
        wsMessageReceived = []
        await utils.clickPos(VipFishPrawnCrabLocator[`Chip${_chip}`].x,VipFishPrawnCrabLocator[`Chip${_chip}`].y)
        await utils.clickPos(VipFishPrawnCrabLocator[`${_choice1}`].x,VipFishPrawnCrabLocator[`${_choice1}`].y)
        await utils.sleep(500)
        await utils.clickPos(VipFishPrawnCrabLocator[`${_choice2}`].x, VipFishPrawnCrabLocator[`${_choice2}`].y)
        await utils.sleep(500)
        let _result = await utils.wsFindMessage(ermsg,20,wsMessageReceived)
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error)
    }

  }

export const verifyBetChoice = async() => {
    // await waitUtilNewRound()
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Stag)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Gourd)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Rooster)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Fish)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Crab)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Prawn)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Ocean)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.Gourd)
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.AnyTriple)
    let _result = await utils.findImage(VipFishPrawnCrabLocator.Stag)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Gourd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Rooster)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Fish)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Crab)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Prawn)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Ocean)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.Gourd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipFishPrawnCrabLocator.AnyTriple)
    expect(_result.Val).to.equal(true)
}

export const openHistory = async() => {
    await utils.sleep(3000)
    await utils.clickPos(VipFishPrawnCrabLocator.History.x, VipFishPrawnCrabLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(1000)
    let res = await utils.wsFindMessage('"history"')
    // await utils.CaptureSubImageToFile(VipFishPrawnCrabLocator.History)
    // let flag = await utils.findImage(VipFishPrawnCrabLocator.History)
    // await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(VipFishPrawnCrabLocator.HistoryClose.x, VipFishPrawnCrabLocator.HistoryClose.y)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage('{"remainingTime":42}')
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
            await utils.swipe(VipFishPrawnCrabLocator.ChipBroad.x,VipFishPrawnCrabLocator.ChipBroad.y,0,VipFishPrawnCrabLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(VipFishPrawnCrabLocator.ChipBroad.x,VipFishPrawnCrabLocator.ChipBroad.y,VipFishPrawnCrabLocator.ChipBroad.x+500,VipFishPrawnCrabLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(VipFishPrawnCrabLocator[`Chip${_chip}`].x,VipFishPrawnCrabLocator[`Chip${_chip}`].y) 

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
            raw = raw.split("42/user/vipfishprawncrab,");
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
        await utils.clickPos(VipFishPrawnCrabLocator[`${i}`].x,VipFishPrawnCrabLocator[`${i}`].y)
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
    let flag = await utils.imageShouldNotDisplay(VipFishPrawnCrabLocator.Stag)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(VipFishPrawnCrabLocator.Home.x, VipFishPrawnCrabLocator.Home.y)
    await utils.sleep(1000)
    await verifyChoiceClose()
}