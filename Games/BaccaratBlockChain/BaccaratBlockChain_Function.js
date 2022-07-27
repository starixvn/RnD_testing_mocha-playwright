import * as utils from '../../util/utils'
const BaccaratBlockChainLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./BaccaratBlockChain_Locator').BaccaratBlockChainLocator_vn : require('./BaccaratBlockChain_Locator').BaccaratLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
const remainingTime = `"remainingTime":45`
var sha256 = require('js-sha256');

export const verifyIntroduce = async() => {
    // await utils.CaptureSubImageToFile(BaccaratBlockChainLocator.Introduce.ImageCompare,
    //     BaccaratBlockChainLocator.Introduce.left,BaccaratBlockChainLocator.Introduce.top,BaccaratBlockChainLocator.Introduce.width,BaccaratBlockChainLocator.Introduce.height )
    let introimg = await utils.findImage(BaccaratBlockChainLocator.Introduce)    
    await utils.shouldBeEqual(introimg.Val,true,'Check Introdue')
    await utils.clickPos(BaccaratBlockChainLocator.GuideClose.x, BaccaratBlockChainLocator.GuideClose.y)
}

export const verifySignInSuccessfully = async() => {
    await utils.verifySignInSuccessfully()
}

export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    wsMessageReceived = []
    await utils.clickPos(BaccaratBlockChainLocator[`${_choice1}`].x,BaccaratBlockChainLocator[`${_choice1}`].y)
    await utils.sleep(200)
    await utils.clickPos(BaccaratBlockChainLocator[`${_choice2}`].x, BaccaratBlockChainLocator[`${_choice2}`].y)
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
    let _result = await utils.findImage(BaccaratBlockChainLocator.Big)
    await utils.shouldBeEqual(_result.Val,true,"verify big")
    _result = await utils.findImage(BaccaratBlockChainLocator.PlayerPair)
    await utils.shouldBeEqual(_result.Val,true,"verify PlayerPair")
    _result = await utils.findImage(BaccaratBlockChainLocator.Player)
    await utils.shouldBeEqual(_result.Val,true,"verify Player")
    _result = await utils.findImage(BaccaratBlockChainLocator.Tie)
    await utils.shouldBeEqual(_result.Val,true,"verify Tie")
    _result = await utils.findImage(BaccaratBlockChainLocator.Banker)
    await utils.shouldBeEqual(_result.Val,true,"verify banker")
    _result = await utils.findImage(BaccaratBlockChainLocator.Small)
    await utils.shouldBeEqual(_result.Val,true,"verify small")
    _result = await utils.findImage(BaccaratBlockChainLocator.BankerPair)
    await utils.shouldBeEqual(_result.Val,true,"verify BankerPair")
}

export const openHistory = async() => {
    await utils.sleep(1000)
    await utils.clickPos(BaccaratBlockChainLocator.Menu.x, BaccaratBlockChainLocator.Menu.y)
    await utils.clickPos(BaccaratBlockChainLocator.History.x, BaccaratBlockChainLocator.History.y)
    await utils.sleep(1000)
}

export const verifyHistoryPopup = async() => {
        await utils.sleep(1000)
        // await page.screenshot({
        //     path: BaccaratBlockChainLocator.History.ImageCompare,
        //     clip: { x: BaccaratBlockChainLocator.History.left, y: BaccaratBlockChainLocator.History.top, width: BaccaratBlockChainLocator.History.width,
        //          height: BaccaratBlockChainLocator.History.height },
        //   });
        let _result = await utils.findImage(BaccaratBlockChainLocator.History)
        await utils.shouldBeEqual(_result.Val,true,'check image history')
}

export const closeHistory = async() => {
    await utils.clickPos(BaccaratBlockChainLocator.HistoryClose.x, BaccaratBlockChainLocator.HistoryClose.y)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    let _found = await utils.wsWaitMessage('remainingTime')
    await utils.sleep(20000)
    // console.log('new round ready');
    wsMessageReceived=[]
}

const getBalance = async() => {
    return await utils.getBalance()
}

const getUserResult = async() => {
    try {
        let rawData = await utils.getRowDataFromJS("BlockchainBaccarat", "status");
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

//Place bet multiple choices and check settle
export const verifySettlementMultipleChoices = async(_choices,_chip) => {
    await waitUtilNewRound()
    await utils.clickPos(BaccaratBlockChainLocator[`Chip${_chip}`].x,BaccaratBlockChainLocator[`Chip${_chip}`].y) 
    // Select All Choices
    for(let i of _choices){
        await utils.clickPos(BaccaratBlockChainLocator[`${i}`].x,BaccaratBlockChainLocator[`${i}`].y)
        await utils.sleep(200)
        }
    await utils.sleep(500)
    let currentBalance = await getBalance()
    // Get Settle
    await utils.sleep(5000)
    let status = await getUserResult()
    let balance = currentBalance +  status.bet
    await utils.sleep(5000)
    let fishdata = await utils.getRowDataFromJS("BlockchainBaccarat", "finish");
    let currentindex = await utils.getDataJsonPath(fishdata, `$..blockchain.currentIndex`)
    let rawvalue = await utils.getDataJsonPath(fishdata, `$..blockchain.chain[${currentindex-1}].rawValue`)
    let hashvalue1 = sha256(rawvalue);
    let hashvalue2 = await utils.getDataJsonPath(fishdata, `$..blockchain.chain[${currentindex-1}].hashValue`)
    await utils.shouldBeEqual(hashvalue1,hashvalue2,`Check ${hashvalue1}, ${hashvalue2}`)
    // console.log('hashvalue1',hashvalue1,hashvalue2)
    currentBalance = await getBalance()
    // Verify Balance on UI
    let rs = (Math.abs(currentBalance-balance) <= 0.01) ? true : false;
    await utils.shouldBeEqual(rs,true,"Error: expect actual balance ( "+currentBalance+" ) to equal : "+balance)
} 

const verifyChoiceClose = async() => {
    let flag = await utils.imageShouldNotDisplay(BaccaratBlockChainLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(BaccaratBlockChainLocator.Home.x, BaccaratBlockChainLocator.Home.y)
    let homeicon = await utils.imageShouldNotDisplay(BaccaratBlockChainLocator.Home)
    await utils.shouldBeEqual(homeicon.Val,true,'check return home')
}
