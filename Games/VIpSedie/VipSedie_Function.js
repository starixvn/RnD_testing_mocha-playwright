import * as utils from '../../util/utils'
import {GameLobbyLocator} from '../GameLobby_Locator'
import {VipSedieLocator} from './VipSedie_Locator'
import * as config from '../../config/config'
const fs = require('fs')

export const openFromLobby = async() => {
    await utils.sleep(1000)
    await utils.clickPos(GameLobbyLocator.VipSedieIcon.x, GameLobbyLocator.VipSedieIcon.y)
    await utils.sleep(1000)
    await verifyDealer()
}

export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/vipsedie,["message",{"toGame":"VipSeDie"}]')
    global.expect(_result.Val).to.equal(true)
}


export const verifyBetChoice = async() => {
    let _result = await utils.findImage(VipSedieLocator.Even)
    global.expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipSedieLocator.Odd)
    global.expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipSedieLocator.Red4)
    global.expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipSedieLocator.Red3)
    global.expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipSedieLocator.Red2)
    global.expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipSedieLocator.White3)
    global.expect(_result.Val).to.equal(true)
    _result = await utils.findImage(VipSedieLocator.White4)
    global.expect(_result.Val).to.equal(true)
}
export const selectChip = async(_chip=10)=>{
    /*  Param Explained:
        _chip : input chip amount will be selected, by default = 10
    */  
    const _chipbar1 = [10,20,50,100,200]
    const _chipbar2 = [500,1000,2000,3000]
    if (_chipbar2.includes(_chip) === true){
        await utils.swipe(VipSedieLocator.ChipBroad.x,VipSedieLocator.ChipBroad.y,0,VipSedieLocator.ChipBroad.y)
        await utils.sleep(2000)
    }
    else if (_chipbar1.includes(_chip) === true){
        await utils.swipe(VipSedieLocator.ChipBroad.x,VipSedieLocator.ChipBroad.y,VipSedieLocator.ChipBroad.x+500,VipSedieLocator.ChipBroad.y)
        await utils.sleep(2000)
    }
    await utils.clickPos(VipSedieLocator[`Chip${_chip}`].x,VipSedieLocator[`Chip${_chip}`].y) 
}
export const placeBet = async(_choice,_chip=10) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 10
    */
    wsMessageReceived = []
    await selectChip(_chip)
    let lowcase = _choice.toLowerCase()
    let _result = await utils.betProcess(VipSedieLocator[`${_choice}`].x,VipSedieLocator[`${_choice}`].y,`user/vipsedie,["VipSeDie",{"ownBets":{"${lowcase}":${_chip}},"endBet":${_chip},`)
    global.expect(_result.Val).to.equal(true)
}

export const verifyBetChip = async() => {
    await selectChip()
    // Using for Capture ScreenShot
    // await utils.CaptureSubImageToFile(VipSedieLocator.ChipBroad.ImageCompare1,
    //     VipSedieLocator.ChipBroad.left, VipSedieLocator.ChipBroad.top, VipSedieLocator.ChipBroad.width, VipSedieLocator.ChipBroad.height)
    // await utils.swipe(VipSedieLocator.ChipBroad.x,VipSedieLocator.ChipBroad.y,0,VipSedieLocator.ChipBroad.y)
    // await utils.sleep(3000)
    // await utils.CaptureSubImageToFile(VipSedieLocator.ChipBroad.ImageCompare2,
    //     VipSedieLocator.ChipBroad.left, VipSedieLocator.ChipBroad.top, VipSedieLocator.ChipBroad.width, VipSedieLocator.ChipBroad.height)
    // End
    let _result = await utils.findImage(VipSedieLocator.ChipBroad.ImageCompare1, VipSedieLocator.ChipBroad)
    global.expect(_result.Val).to.equal(true)
    await utils.swipe(VipSedieLocator.ChipBroad.x,VipSedieLocator.ChipBroad.y,0,VipSedieLocator.ChipBroad.y)
    await utils.sleep(1000)
    _result = await utils.findImage(VipSedieLocator.ChipBroad.ImageCompare2, VipSedieLocator.ChipBroad)
    global.expect(_result.Val).to.equal(true)
}

export const verifyBetAtBlockBettingTime = async() => {
    wsMessageReceived = []
    let _result = await utils.betProcess(VipSedieLocator.Even.x,VipSedieLocator.Even.y,`42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`)
    global.expect(_result.Val).to.equal(true)
}

export const verifyBetAtSettlementTime = async()=> {
    wsMessageReceived = []
    await utils.wsFindMessage(`42/user/vipsedie,["VipSeDie",{"remainingTime":39}]`)
    let _result = await utils.betProcess(VipSedieLocator.Even.x,VipSedieLocator.Even.y,`42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`)
    global.expect(_result.Val).to.equal(true)
}

export const verifyMaxBet = async(_choice) =>{
    /*  Param Explained:
         _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ... 'Round' will be verify message max Round
    */
    let flag
    if (_choice === 'Round'){
        // Wait to Finish Game
        wsMessageReceived = []
        await utils.wsFindMessage(`42/user/vipsedie,["VipSeDie",{"remainingTime":39}]`)
        // Wait to new round
        await utils.sleep(9000)
        await placeBet("Even")
        await selectChip(3000)
        flag = await utils.betProcess(VipSedieLocator.Odd.x, VipSedieLocator.Odd.y, `42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Tổng tiền cược tối đa ở phiên này là 3,000"}]`)
        await utils.shouldBeEqual(flag.Val,true)
    }
    else if (_choice === 'Red4' || _choice === 'White4'){
        wsMessageReceived = []
        await selectChip(500)
        flag = await utils.betProcess(VipSedieLocator[`${_choice}`].x, VipSedieLocator[`${_choice}`].y, `42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 500"}]`)
        await utils.shouldBeEqual(flag.Val,true)
    } else {
        wsMessageReceived = []
        await selectChip(3000)
        flag = await utils.betProcess(VipSedieLocator[`${_choice}`].x, VipSedieLocator[`${_choice}`].y, `42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 3,000"}]`)
        await utils.shouldBeEqual(flag.Val,true)
    }
}
export const getBalance = async() => {
    return await utils.getUIBalance(VipSedieLocator.Balance.ImageCompare,
        VipSedieLocator.Balance.left, VipSedieLocator.Balance.top, VipSedieLocator.Balance.width, VipSedieLocator.Balance.height)
}
const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        if(raw === null) return null
        else {
            raw = raw.split("42/user/vipsedie,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getResult =  async() => {
    try {
        let rawData = await getRawData(`42/user/vipsedie,["VipSeDie",{"finish":{"result"`)
        return await utils.getDataJsonPath(rawData,`$..finish.result`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getUserResult = async() => {
    try {
        let rawData = await getRawData(`42/user/vipsedie,["VipSeDie",{"status":{"winningByChoices":`)
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export const verifySettlement = async(_choice,_chip=10) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 10
    */
    let countRed = 0, currentBalance, lowcase, result, status
    let Odd = { Even: 1.96,Odd: 1.96, Red4: 14.4, Red3: 3.75, Red2: 2.4, White3: 3.75, White4: 14.4 }
    lowcase = _choice.toLowerCase()
    // Wait to Finish Game
    await utils.wsFindMessage(`42/user/vipsedie,["VipSeDie",{"remainingTime":39}]`)
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
    console.log('Red Count : '+countRed)
    
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
    // console.log('global.expected balance: ' + balance)
    await utils.sleep(5000)
    currentBalance = await getBalance()
    // Verify Balance on UI
    console.log('actual Balance: ' + currentBalance)
    let rs = (Math.abs(currentBalance-balance) <= 0.01) ? true : false;
    // console.log(Math.abs(currentBalance-balance))
    await utils.shouldBeEqual(rs,true,"Error: expect actual balance ( "+currentBalance+" ) to equal : "+balance)
}

const verifyDealer = async() => {
    let flag = await utils.findImage(VipSedieLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(VipSedieLocator.Home.x, VipSedieLocator.Home.y)
    let flag = await utils.findImage(GameLobbyLocator.AccountName)
    await utils.shouldBeEqual(flag.Val,true)
}

export const openGuide = async() => {
    await utils.clickPos(VipSedieLocator.Guide.x, VipSedieLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(VipSedieLocator.GuideClose.x, VipSedieLocator.GuideClose.y)
    await verifyDealer()
}

export const verifyGuideContent = async()=> {
    let fx = config.setting.viewport.width /2
    let fy = config.setting.viewport.height /2
    let ty = 0
    let _AcheckImage = [ VipSedieLocator.Guide.ImageCompare1, VipSedieLocator.Guide.ImageCompare2, VipSedieLocator.Guide.ImageCompare3,
        VipSedieLocator.Guide.ImageCompare4, VipSedieLocator.Guide.ImageCompare5] 
    for(let t = 0; t< _AcheckImage.length; t++){
        // Get Screen Shot for Guide content
        // await page.screenshot({path: _AcheckImage[t] ,clip:{
        // x: VipSedieLocator.Guide.left,
        //     y: VipSedieLocator.Guide.top,
        // width: VipSedieLocator.Guide.width,
        // height: VipSedieLocator.Guide.height}})
        // await utils.swipe(fx, fy, fx, ty) 
        let _result = await utils.findImage(
            _AcheckImage[t],
            VipSedieLocator.Guide
            )
        await utils.swipe(fx, fy, fx, ty) 
        await utils.shouldBeEqual(_result.Val,true)
    }
}

export const openHistory = async() => {
    try {
        await utils.clickPos(VipSedieLocator.History.x, VipSedieLocator.History.y)
    } catch (error) {
        console.log(error.message)
        await utils.shouldBeEqual(false,true)
    }
}

export const verifyHistoryPopup = async() => {
    let flag = await utils.findImage(VipSedieLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(VipSedieLocator.HistoryClose.x, VipSedieLocator.HistoryClose.y)
    await verifyDealer()
}
