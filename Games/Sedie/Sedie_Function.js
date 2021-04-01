import * as utils from '../../util/utils'
import {GameLobbyLocator} from '../GameLobby_Locator'
import {SedieLocator} from './Sedie_Locator'
import * as config from '../../config/config'
const chai = require('chai')
const expect = chai.expect
const fs = require('fs')

export const openFromLobby = async() => {
    await utils.sleep(1000)
    await utils.clickPos(GameLobbyLocator.SedieIcon.x, GameLobbyLocator.SedieIcon.y)
    await utils.sleep(1000)
    await verifyDealer()
}

export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/xocxoc,["message",{"toGame":"XocXoc"}]')
    expect(_result.Val).to.equal(true)
}


export const verifyBetChoice = async() => {
    let _result = await utils.findImage(SedieLocator.Even)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieLocator.Odd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieLocator.Red4)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieLocator.Red3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieLocator.Red2)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieLocator.White3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieLocator.White4)
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
            await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,0,SedieLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,SedieLocator.ChipBroad.x+500,SedieLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(SedieLocator[`Chip${_chip}`].x,SedieLocator[`Chip${_chip}`].y) 

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
    await selectChip(_chip)
    let lowcase = _choice.toLowerCase()
    let _result = await utils.betProcess(SedieLocator[`${_choice}`].x,SedieLocator[`${_choice}`].y,`user/xocxoc,["XocXoc",{"ownBets":{"${lowcase}":${_chip}},"endBet":${_chip},`)
    expect(_result.Val).to.equal(true)
}

export const verifyBetChip = async() => {
    await selectChip()
    // // Using for Capture ScreenShot
    // await utils.CaptureSubImageToFile(SedieLocator.ChipBroad.ImageCompare1,
    //     SedieLocator.ChipBroad.left, SedieLocator.ChipBroad.top, SedieLocator.ChipBroad.width, SedieLocator.ChipBroad.height)
    // await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,0,SedieLocator.ChipBroad.y)
    // await utils.sleep(3000)
    // await utils.CaptureSubImageToFile(SedieLocator.ChipBroad.ImageCompare2,
    //     SedieLocator.ChipBroad.left, SedieLocator.ChipBroad.top, SedieLocator.ChipBroad.width, SedieLocator.ChipBroad.height)
    // End
    let _result = await utils.findImage(SedieLocator.ChipBroad.ImageCompare1, SedieLocator.ChipBroad)
    expect(_result.Val).to.equal(true)
    await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,0,SedieLocator.ChipBroad.y)
    await utils.sleep(1000)
    _result = await utils.findImage(SedieLocator.ChipBroad.ImageCompare2, SedieLocator.ChipBroad)
    expect(_result.Val).to.equal(true)
}

export const verifyBetAtBlockBettingTime = async() => {
    wsMessageReceived = []
    let _result = await utils.betProcess(SedieLocator.Even.x,SedieLocator.Even.y,`42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`)
    expect(_result.Val).to.equal(true)
}

export const verifyBetAtSettlementTime = async()=> {
    wsMessageReceived = []
    await utils.wsFindMessage(`42/user/xocxoc,["XocXoc",{"remainingTime":39}]`)
    let _result = await utils.betProcess(SedieLocator.Even.x,SedieLocator.Even.y,`42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`)
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
        await utils.wsFindMessage(`42/user/xocxoc,["XocXoc",{"remainingTime":39}]`)
        // Wait to new round
        await utils.sleep(9000)
        await placeBet("Even")
        await selectChip(2000)
        flag = await utils.betProcess(SedieLocator.Odd.x, SedieLocator.Odd.y, `42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Tổng tiền cược tối đa ở phiên này là 2,000"}]`)
        await utils.shouldBeEqual(flag.Val,true)
    }
    else if (_choice === 'Red4' || _choice === 'White4'){
        wsMessageReceived = []
        await selectChip(500)
        flag = await utils.betProcess(SedieLocator[`${_choice}`].x, SedieLocator[`${_choice}`].y, `42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 500"}]`)
        await utils.shouldBeEqual(flag.Val,true)
    } else {
        wsMessageReceived = []
        await selectChip(2000)
        flag = await utils.betProcess(SedieLocator[`${_choice}`].x, SedieLocator[`${_choice}`].y, `42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 2,000"}]`)
        await utils.shouldBeEqual(flag.Val,true)
    }
}
export const getBalance = async() => {
    return await utils.getBalance()
}
const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        if(raw === null) return null
        else {
            raw = raw.split("42/user/xocxoc,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getResult =  async(_onlyResult=true) => {
    try {
        let rawData = await getRawData(`42/user/xocxoc,["XocXoc",{"finish":{"result"`)
        if(_onlyResult === true) {
            return await utils.getDataJsonPath(rawData,`$..finish.result`)
        } else {
            const roundId = await utils.getDataJsonPath(rawData, `$..roundId`)
            const result = await utils.getDataJsonPath(rawData, `$..settlementResult`)
            return { 
                roundId : roundId, 
                odd : result.odd, 
                even : result.even, 
                red3 : result.red3, 
                red4 : result.red4, 
                white3 : result.white3,
                white4 : result.white4
            }
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getUserResult = async() => {
    try {
        let rawData = await getRawData(`42/user/xocxoc,["XocXoc",{"status":{"winningByChoices":`)
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export const verifySettlement = async(_choice,_chip=1,_saveResult=false) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 1
        _saveResult : when this variable = true, result in this round will be saved
    */
    let countRed = 0, currentBalance, lowcase, result, status
    let Odd = { Even: 1.96,Odd: 1.96, Red4: 14.4, Red3: 3.75, Red2: 2.4, White3: 3.75, White4: 14.4 }
    lowcase = _choice.toLowerCase()
    // Wait to Finish Game
    await utils.wsFindMessage(`42/user/xocxoc,["XocXoc",{"remainingTime":39}]`)
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
    } else if (_choice === 'Red2') {
        if(countRed === 2) {
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

    if(_saveResult === true){
        let allResult = await getResult(false)
        allResult.countRed = countRed
        return allResult
    }
}

const verifyDealer = async() => {
    let flag = await utils.findImage(SedieLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(SedieLocator.Home.x, SedieLocator.Home.y)
    let flag = await utils.findImage(GameLobbyLocator.AccountName)
    await utils.shouldBeEqual(flag.Val,true)
}

export const openGuide = async() => {
    await utils.clickPos(SedieLocator.Guide.x, SedieLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(SedieLocator.GuideClose.x, SedieLocator.GuideClose.y)
    await verifyDealer()
}

export const verifyGuideContent = async()=> {
    let fx = config.setting.viewport.width /2
    let fy = config.setting.viewport.height /2
    let ty = 0
    let _AcheckImage = [ SedieLocator.Guide.ImageCompare1, SedieLocator.Guide.ImageCompare2, SedieLocator.Guide.ImageCompare3,
        SedieLocator.Guide.ImageCompare4, SedieLocator.Guide.ImageCompare5] 
    for(let t = 0; t< _AcheckImage.length; t++){
        // Get Screen Shot for Guide content
        // await page.screenshot({path: _AcheckImage[t] ,clip:{
        // x: SedieLocator.Guide.left,
        //     y: SedieLocator.Guide.top,
        // width: SedieLocator.Guide.width,
        // height: SedieLocator.Guide.height}})
        // await utils.swipe(fx, fy, fx, ty) 
        let _result = await utils.findImage(
            _AcheckImage[t],
            SedieLocator.Guide
            )
        await utils.swipe(fx, fy, fx, ty) 
        await utils.shouldBeEqual(_result.Val,true)
    }
}

export const openHistory = async() => {
    await utils.clickPos(SedieLocator.History.x, SedieLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    let flag = await utils.findImage(SedieLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(SedieLocator.HistoryClose.x, SedieLocator.HistoryClose.y)
    await verifyDealer()
}
