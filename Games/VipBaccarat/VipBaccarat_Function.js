import * as utils from '../../util/utils'
const VipBaccaratLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./VipBaccarat_Locator').VipBaccaratLocator_vn : require('./VipBaccarat_Locator').VipBaccaratLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `42/user/vipbaccarat,["VipBaccarat",{"remainingTime":45}]`




export const verifySignInSuccessfully = async() => {
    await utils.verifySignInSuccessfully()
}

export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    wsMessageReceived = []
    await utils.clickPos(VipBaccaratLocator[`${_choice1}`].x,VipBaccaratLocator[`${_choice1}`].y)
    await utils.clickPos(VipBaccaratLocator[`${_choice1}`].x,VipBaccaratLocator[`${_choice1}`].y)
    await utils.sleep(200)
    await utils.clickPos(VipBaccaratLocator[`${_choice2}`].x, VipBaccaratLocator[`${_choice2}`].y)
    let _result = await utils.wsFindMessage(ermsg,20)
    expect(_result.Val).to.equal(true)
}

export const verifyBetChoice = async() => {
    await waitUtilNewRound()
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Big)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.PlayerPair)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Player)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Tie)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Banker)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.Small)
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.BankerPair)
    let _result = await utils.findImage(VipBaccaratLocator.Big)
    await utils.shouldBeEqual(_result.Val,true,"verify big")
    _result = await utils.findImage(VipBaccaratLocator.PlayerPair)
    await utils.shouldBeEqual(_result.Val,true,"verify PlayerPair")
    _result = await utils.findImage(VipBaccaratLocator.Player)
    await utils.shouldBeEqual(_result.Val,true,"verify Player")
    _result = await utils.findImage(VipBaccaratLocator.Tie)
    await utils.shouldBeEqual(_result.Val,true,"verify Tie")
    _result = await utils.findImage(VipBaccaratLocator.Banker)
    await utils.shouldBeEqual(_result.Val,true,"verify banker")
    _result = await utils.findImage(VipBaccaratLocator.Small)
    await utils.shouldBeEqual(_result.Val,true,"verify small")
    _result = await utils.findImage(VipBaccaratLocator.BankerPair)
    await utils.shouldBeEqual(_result.Val,true,"verify BankerPair")
}

export const openHistory = async() => {
    await utils.sleep(1000)
    await utils.clickPos(VipBaccaratLocator.History.x, VipBaccaratLocator.History.y)
    await utils.sleep(1000)
}

export const verifyHistoryPopup = async() => {
    try {
        await utils.sleep(1000)
        let res = await utils.wsFindMessage('"history"',20)
        await utils.shouldBeEqual(res.Val, true,'Check History')
    } catch (error) {
        
    }
    // await utils.CaptureSubImageToFile(VipBaccaratLocator.History)
    // let flag = await utils.findImage(VipBaccaratLocator.History)
    // await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(VipBaccaratLocator.HistoryClose.x, VipBaccaratLocator.HistoryClose.y)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage('{"remainingTime":45}')
    await utils.sleep(13000)
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
            await utils.sleep(500)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(VipBaccaratLocator.ChipBroad.x,VipBaccaratLocator.ChipBroad.y,VipBaccaratLocator.ChipBroad.x+500,VipBaccaratLocator.ChipBroad.y)
            await utils.sleep(500)
        }
        await utils.clickPos(VipBaccaratLocator[`Chip${_chip}`].x,VipBaccaratLocator[`Chip${_chip}`].y) 

    } catch (error) {
        console.log(error.message)
    }
}
const getBalance = async() => {
    return await utils.getBalance()
}


const getUserResult = async() => {
    try {
        let rawData = await utils.getRowDataFromJS("VipBaccarat", "status");
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
        await utils.clickPos(VipBaccaratLocator[`${i}`].x,VipBaccaratLocator[`${i}`].y)
        await utils.sleep(100)
        }
    await utils.sleep(500)
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

export const verifyMd5 = async() => {
    await waitUtilNewRound()
    wsMessageReceived = []
    let _found = await utils.getRowDataFromJS("VipBaccarat", "hashValue");
    _found = (_found == 'null')? await utils.getRowDataFromJS("VipBaccarat", "md5"): _found //handle case local get md5 code form string md5/ prod get from string resultHash
    let bfmd5 = await utils.getDataJsonPath(_found, "$..hashValue");
    wsMessageReceived=[]
    await utils.sleep(40000)
    let _settle = await utils.getRowDataFromJS('VipBaccarat','{"finish"')
    let afmd5 =  await utils.getDataJsonPath(_settle, `$..rawValue`)
    afmd5 = await utils.generateMd5(afmd5);
    await utils.shouldBeEqual(bfmd5, afmd5,'check md5')
  }
  