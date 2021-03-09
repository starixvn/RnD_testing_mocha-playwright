import * as utils from '../../util/utils'
import {GameLobbyLocator} from '../GameLobby_Locator'
import * as GameLobbyFunc from '../GameLobby_Function'
import {MiniSedieLocator} from './MiniSedie_Locator'
import * as config from '../../config/config'
const chai = require('chai')
const expect = chai.expect
const fs = require('fs')
const remainingTime = `{"miniSedie":{"remainingTime":38}}`

export const openFromLobby = async() => {
    await utils.sleep(1000)
    await utils.clickPos(GameLobbyLocator.MiniSedieIcon.x, GameLobbyLocator.MiniSedieIcon.y)
    await utils.sleep(1000)
    await verifyStatistic()
}

export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('{"miniSedie":{"gameConfigs":{')
    expect(_result.Val).to.equal(true)
}


export const verifyBetChoice = async() => {
    let _result = await utils.findImage(MiniSedieLocator.Even)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(MiniSedieLocator.Odd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(MiniSedieLocator.Red4)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(MiniSedieLocator.Red3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(MiniSedieLocator.White3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(MiniSedieLocator.White4)
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
            await utils.swipe(MiniSedieLocator.ChipBroad.x,MiniSedieLocator.ChipBroad.y,0,MiniSedieLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(MiniSedieLocator.ChipBroad.x,MiniSedieLocator.ChipBroad.y,MiniSedieLocator.ChipBroad.x+500,MiniSedieLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(MiniSedieLocator[`Chip${_chip}`].x,MiniSedieLocator[`Chip${_chip}`].y) 

    } catch (error) {
        console.log(error.message)
    }
}
export const placeBet = async(_choice,_chip=1) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 1
    */
    wsMessageReceived = []
    let _result
    await selectChip(_chip)
    if(_choice === 'Even') {
        _result = await utils.betProcess(MiniSedieLocator[`${_choice}`].x,MiniSedieLocator[`${_choice}`].y,`"endBet":${_chip},"ownBets":{"even":${_chip},"odd":0,"red3":0,"red4":0,"white3":0,"white4":0}`)
    } else if(_choice === 'Odd') {
        _result = await utils.betProcess(MiniSedieLocator[`${_choice}`].x,MiniSedieLocator[`${_choice}`].y,`"endBet":${_chip},"ownBets":{"even":0,"odd":${_chip},"red3":0,"red4":0,"white3":0,"white4":0}`)
    } else if(_choice === 'Red3') {
        _result = await utils.betProcess(MiniSedieLocator[`${_choice}`].x,MiniSedieLocator[`${_choice}`].y,`"endBet":${_chip},"ownBets":{"even":0,"odd":0,"red3":${_chip},"red4":0,"white3":0,"white4":0}`)
    } else if (_choice === 'Red4') {
        _result = await utils.betProcess(MiniSedieLocator[`${_choice}`].x,MiniSedieLocator[`${_choice}`].y,`"endBet":${_chip},"ownBets":{"even":0,"odd":0,"red3":0,"red4":${_chip},"white3":0,"white4":0}`)
    } else if (_choice === 'White3') {
        _result = await utils.betProcess(MiniSedieLocator[`${_choice}`].x,MiniSedieLocator[`${_choice}`].y,`"endBet":${_chip},"ownBets":{"even":0,"odd":0,"red3":0,"red4":0,"white3":${_chip},"white4":0}`)
    } else if (_choice === 'White4') {
        _result = await utils.betProcess(MiniSedieLocator[`${_choice}`].x,MiniSedieLocator[`${_choice}`].y,`"endBet":${_chip},"ownBets":{"even":0,"odd":0,"red3":0,"red4":0,"white3":0,"white4":${_chip}}`)
    }
    expect(_result.Val).to.equal(true)
}

export const verifyBetAtBlockBettingTime = async() => {
    wsMessageReceived = []
    let _result = await utils.betProcess(MiniSedieLocator.Even.x,MiniSedieLocator.Even.y,`{"miniSedie":{"notice":"Vui lòng đặt cược ở phiên sau.","endBet":-1}}`)
    expect(_result.Val).to.equal(true)
}

export const verifyBetAtSettlementTime = async()=> {
    wsMessageReceived = []
    await utils.wsFindMessage(remainingTime)
    let _result = await utils.betProcess(MiniSedieLocator.Even.x,MiniSedieLocator.Even.y,`{"miniSedie":{"notice":"Vui lòng đặt cược ở phiên sau.","endBet":-1}}`)
    expect(_result.Val).to.equal(true)
}

export const verifyMaxBet = async(_choice) =>{
    /*  Param Explained:
         _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ... 'Round' will be verify message max Round
    */
    let flag
    if (_choice === 'Round'){
        // Wait to Finish Game
        wsMessageReceived = []
        await utils.wsFindMessage(remainingTime)
        // Wait to new round
        await utils.sleep(9000)
        await placeBet("Even")
        await selectChip(2000)
        flag = await utils.betProcess(MiniSedieLocator.Odd.x, MiniSedieLocator.Odd.y, `{"miniSedie":{"notice":"Tổng tiền cược tối đa ở phiên này là 2,000","endBet":-1}}`)
        await utils.shouldBeEqual(flag.Val,true)
    }
    else if (_choice === 'Red4' || _choice === 'White4'){
        wsMessageReceived = []
        await selectChip(500)
        flag = await utils.betProcess(MiniSedieLocator[`${_choice}`].x, MiniSedieLocator[`${_choice}`].y, `{"miniSedie":{"notice":"Tiền cược tối đa ở cửa này là 500","endBet":-1}}`)
        await utils.shouldBeEqual(flag.Val,true)
    } else {
        wsMessageReceived = []
        await selectChip(2000)
        flag = await utils.betProcess(MiniSedieLocator[`${_choice}`].x, MiniSedieLocator[`${_choice}`].y, `{"miniSedie":{"notice":"Tiền cược tối đa ở cửa này là 2,000","endBet":-1}}`)
        await utils.shouldBeEqual(flag.Val,true)
    }
}
const getBalance = async() => {
    return await GameLobbyFunc.getBalance()
}
const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        if(raw === null) return null
        else {
            return raw
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getResult =  async() => {
    try {
        let rawData = await getRawData(`{"miniSedie":{"finish":{"roundId":`)
        return await utils.getDataJsonPath(rawData,`$.miniSedie.finish.result`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getUserResult = async() => {
    try {
        let rawData = await getRawData(`{"miniSedie":{"status":{"winningByChoices":`)
        return await utils.getDataJsonPath(rawData, `$.miniSedie..status`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export const verifySettlement = async(_choice,_chip=1) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 1
    */
    let countRed = 0, currentBalance, lowcase, result, status
    let Odd = { Even: 1.96,Odd: 1.96, Red4: 14.4, Red3: 3.75, White3: 3.75, White4: 14.4 }
    lowcase = _choice.toLowerCase()
    // Wait to Finish Game
    await utils.wsFindMessage(remainingTime)
    await utils.sleep(500)
    wsMessageReceived = []
    // Wait to new round
    currentBalance = await getBalance()
    console.log("Current Balance: "+currentBalance)
    await placeBet(_choice,_chip)
    result = await getResult()
    
    for(let i=1; i<5 ; i++){
        if (result[`red${i}`] === true) {
            countRed = countRed +1
        }
    }
    
    // Check on Websocket
    status = await getUserResult()
    if(_choice === 'Even') {
        if(countRed === 0 || countRed === 2 || countRed === 4){
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,true)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`])
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`])
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip)
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],0)
        }
    } else if (_choice === 'Odd') {
        if( countRed ===1 || countRed === 3) {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,true)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`])
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`])
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip)
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],0)
        }
    } else if (_choice === 'Red4') {
        if(countRed === 4) {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,true)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`])
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`])
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip)
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],0)
        }
    } else if (_choice === 'Red3') {
        if(countRed === 3) {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,true)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`])
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`])
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip)
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],0)
        }
    } else if (_choice === 'White3') {
        if(countRed === 1) {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,true)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`])
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`])
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip)
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],0)
        }
    } else if (_choice === 'White4') {
        if(countRed === 0) {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,true)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`])
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`])
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false)
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip)
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],0)
        }
    }
    let winloss = (status.win === true) ? _chip*Odd[`${_choice}`] : 0;
    let balance = currentBalance - _chip + winloss
    // console.log('winloss: ' +winloss)
    // console.log('expected balance: ' + balance)
    await utils.sleep(5000)
    currentBalance = await getBalance()
    // Verify Balance on UI
    console.log('actual Balance: ' + currentBalance)
    let rs = (Math.abs(currentBalance-balance) <= 0.01) ? true : false;
    // console.log(Math.abs(currentBalance-balance))
    await utils.shouldBeEqual(rs,true,"Error: expect actual balance ( "+currentBalance+" ) to equal : "+balance)
}

const verifyStatistic = async() => {
    let flag = await utils.findImage(MiniSedieLocator.Statistic)
    await utils.shouldBeEqual(flag.Val,true)
}

const verifyStatisticFalse = async() => {
    let flag = await utils.imageShouldNotDisplay(MiniSedieLocator.Statistic)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnClose = async() => {
    await utils.clickPos(MiniSedieLocator.Close.x, MiniSedieLocator.Close.y)
    await verifyStatisticFalse()
}

export const openGuide = async() => {
    await utils.clickPos(MiniSedieLocator.Guide.x, MiniSedieLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(MiniSedieLocator.GuideClose.x, MiniSedieLocator.GuideClose.y)
    await verifyStatistic()
}

export const verifyGuideContent = async()=> {
    let fx = config.setting.viewport.width /2
    let fy = config.setting.viewport.height /2
    let ty = 0
    let _AcheckImage = [ MiniSedieLocator.Guide.ImageCompare1, MiniSedieLocator.Guide.ImageCompare2, MiniSedieLocator.Guide.ImageCompare3,
        MiniSedieLocator.Guide.ImageCompare4, MiniSedieLocator.Guide.ImageCompare5] 
    for(let t = 0; t< _AcheckImage.length; t++){
        // Get Screen Shot for Guide content
        // await page.screenshot({path: _AcheckImage[t] ,clip:{
        // x: MiniSedieLocator.Guide.left,
        //     y: MiniSedieLocator.Guide.top,
        // width: MiniSedieLocator.Guide.width,
        // height: MiniSedieLocator.Guide.height}})
        // await utils.swipe(fx, fy, fx, ty) 
        let _result = await utils.findImage(
            _AcheckImage[t],
            MiniSedieLocator.Guide
            )
        await utils.swipe(fx, fy, fx, ty) 
        await utils.shouldBeEqual(_result.Val,true)
    }
}

export const verifyBetChip = async() => {
    await selectChip()
    // // Using for Capture ScreenShot
    // await utils.CaptureSubImageToFile(MiniSedieLocator.ChipBroad.ImageCompare1,
    //     MiniSedieLocator.ChipBroad.left, MiniSedieLocator.ChipBroad.top, MiniSedieLocator.ChipBroad.width, MiniSedieLocator.ChipBroad.height)
    // await utils.swipe(MiniSedieLocator.ChipBroad.x,MiniSedieLocator.ChipBroad.y,0,MiniSedieLocator.ChipBroad.y)
    // await utils.sleep(3000)
    // await utils.CaptureSubImageToFile(MiniSedieLocator.ChipBroad.ImageCompare2,
    //     MiniSedieLocator.ChipBroad.left, MiniSedieLocator.ChipBroad.top, MiniSedieLocator.ChipBroad.width, MiniSedieLocator.ChipBroad.height)
    // End
    let _result = await utils.findImage(MiniSedieLocator.ChipBroad.ImageCompare1, MiniSedieLocator.ChipBroad)
    expect(_result.Val).to.equal(true)
    await utils.swipe(MiniSedieLocator.ChipBroad.x,MiniSedieLocator.ChipBroad.y,0,MiniSedieLocator.ChipBroad.y)
    await utils.sleep(1000)
    _result = await utils.findImage(MiniSedieLocator.ChipBroad.ImageCompare2, MiniSedieLocator.ChipBroad)
    expect(_result.Val).to.equal(true)
}

export const openHistory = async() => {
    await utils.clickPos(MiniSedieLocator.History.x, MiniSedieLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    let flag = await utils.findImage(MiniSedieLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(MiniSedieLocator.HistoryClose.x, MiniSedieLocator.HistoryClose.y)
    await verifyStatistic()
}
