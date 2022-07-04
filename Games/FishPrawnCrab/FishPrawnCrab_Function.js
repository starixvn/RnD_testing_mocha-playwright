import * as utils from '../../util/utils'
const FishPrawnCrabLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./FishPrawnCrab_Locator').FishPrawnCrabLocator_vn : require('./FishPrawnCrab_Locator').FishPrawnCrabLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `"remainingTime":40`




export const verifySignInSuccessfully = async() => {
    await utils.verifySignInSuccessfully()
    await waitUtilNewRound()
}

export const verifyBetChoice = async() => {
    // await utils.CaptureSubImageToFile(FishPrawnCrabLocator.Stag)
    // await utils.CaptureSubImageToFile(FishPrawnCrabLocator.Gourd)
    // await utils.CaptureSubImageToFile(FishPrawnCrabLocator.Rooster)
    // await utils.CaptureSubImageToFile(FishPrawnCrabLocator.Fish)
    // await utils.CaptureSubImageToFile(FishPrawnCrabLocator.Crab)
    // await utils.CaptureSubImageToFile(FishPrawnCrabLocator.Prawn)
    let _result = await utils.findImage(FishPrawnCrabLocator.Stag)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(FishPrawnCrabLocator.Gourd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(FishPrawnCrabLocator.Rooster)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(FishPrawnCrabLocator.Fish)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(FishPrawnCrabLocator.Crab)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(FishPrawnCrabLocator.Prawn)
    expect(_result.Val).to.equal(true)
}

export const openHistory = async() => {
    await utils.clickPos(FishPrawnCrabLocator.History.x, FishPrawnCrabLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(1000)
}

export const closeHistory = async() => {
    await utils.clickPos(FishPrawnCrabLocator.HistoryClose.x, FishPrawnCrabLocator.HistoryClose.y)
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
        const _chipbar1 = [1,5,10,50,100]
        const _chipbar2 = [200,500,1000,2000]
        if (_chipbar2.includes(_chip) === true){
            await utils.swipe(FishPrawnCrabLocator.ChipBroad.x,FishPrawnCrabLocator.ChipBroad.y,0,FishPrawnCrabLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(FishPrawnCrabLocator.ChipBroad.x,FishPrawnCrabLocator.ChipBroad.y,FishPrawnCrabLocator.ChipBroad.x+500,FishPrawnCrabLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(FishPrawnCrabLocator[`Chip${_chip}`].x,FishPrawnCrabLocator[`Chip${_chip}`].y) 

    } catch (error) {
        console.log(error.message)
    }
}
const getBalance = async() => {
    return await utils.getBalance()
}

const getUserResult = async() => {
    try {
        let rawData = await utils.getRowDataFromJS("FishPrawnCrab", "status")
        console.log('getUserResult',rawData);
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
        await utils.clickPos(FishPrawnCrabLocator[`${i}`].x,FishPrawnCrabLocator[`${i}`].y)
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
    let flag = await utils.imageShouldNotDisplay(FishPrawnCrabLocator.Stag)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnClose = async() => {
    await utils.clickPos(FishPrawnCrabLocator.Close.x, FishPrawnCrabLocator.Close.y)
    await verifyChoiceClose()
}

export const verifyMd5 = async() => {
    await waitUtilNewRound()
    let _found = await utils.getRowDataFromJS("FishPrawnCrab", "hashValue");
    _found = (_found == 'null')? await utils.getRowDataFromJS("FishPrawnCrab", "md5"): _found //handle case local get md5 code form string md5/ prod get from string resultHash
    let bfmd5 = await utils.getDataJsonPath(_found, "$..hashValue");
    wsMessageReceived.lenght=0
    await utils.sleep(40000)
    let _settle = await utils.getRowDataFromJS('FishPrawnCrab','{"finish"')
    let afmd5 =  await utils.getDataJsonPath(_settle, `$..rawValue`)
    afmd5 = await utils.generateMd5(afmd5);
    await utils.shouldBeEqual(bfmd5, afmd5,'check md5')
  }