import * as utils from '../../util/utils'
import {DB} from '../References/DataBase_Locator'
const GameLobbyLocator = (process.env.npm_config_cf_lang == 'vn' ? require('../References/GameLobby_Locator').GameLobbyLocator_vn : require('../References/GameLobby_Locator').GameLobbyLocator_en)
const VipSedieLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./VipSedie_Locator').VipSedieLocator_vn : require('./VipSedie_Locator').VipSedieLocator_en)

import * as config from '../../config/config'

let Odd = { Even: 1.96,Odd: 1.96, Red4: 14.4, Red3: 3.75, Red2: 2.4, White3: 3.75, White4: 14.4 }


export const verifySignInSuccessfully = async() => {
    await utils.verifySignInSuccessfully()
}


export const verifyBetChoice = async() => {
    //capture screenshoot
    // await utils.wsWaitMessage('42/user/vipsedie,["VipSeDie",{"remainingTime":39}]')
    // await utils.sleep(5000)
    // await utils.CaptureSubImageToFile(VipSedieLocator.Even)
    // await utils.CaptureSubImageToFile(VipSedieLocator.Odd)
    // await utils.CaptureSubImageToFile(VipSedieLocator.Red4)
    // await utils.CaptureSubImageToFile(VipSedieLocator.Red3)
    // await utils.CaptureSubImageToFile(VipSedieLocator.Red2)
    // await utils.CaptureSubImageToFile(VipSedieLocator.White4)
    // await utils.CaptureSubImageToFile(VipSedieLocator.White3)
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

export const verifyMd5 = async() => {
    wsMessageReceived.length=0
    await waitUtilNewRound()
    let _found = await utils.getRowDataFromJS("VipSeDie", "resultHash");
    // console.log('_found',_found);
    let bfmd5 = await utils.getDataJsonPath(_found, "$..hashValue");
    wsMessageReceived.length=0
    let _result = await getResult('md5')
    let afmd5 = await utils.generateMd5(_result.md5);
    console.log(bfmd5, afmd5);
    await utils.shouldBeEqual(bfmd5, afmd5,'check md5')
}

export const verifyHedgeBet = async(_choice1, _choice2,_chip=1,ermsg) => {
    wsMessageReceived = []
    await utils.sleep(3000)
    await selectChip(_chip)
    await utils.clickPos(VipSedieLocator[`${_choice1}`].x,VipSedieLocator[`${_choice1}`].y)
    await utils.sleep(200)
    await utils.clickPos(VipSedieLocator[`${_choice2}`].x, VipSedieLocator[`${_choice2}`].y)
    let _result = await utils.wsFindMessage(ermsg,20)
    expect(_result.Val).to.equal(true)
}

export const placeBet = async(_choice,_chip=10) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 10
    */
    wsMessageReceived = []
    await selectChip(_chip)
    let lowcase = _choice.toLowerCase()
    let _result = await utils.betProcess(VipSedieLocator[`${_choice}`].x,VipSedieLocator[`${_choice}`].y,`"ownBets":{"${lowcase}":${_chip}`)
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
    let _result = await utils.betProcess(VipSedieLocator.Even.x,VipSedieLocator.Even.y,`notice":{"errorCode":"SB1905"`)
    global.expect(_result.Val).to.equal(true)
}

export const verifyBetAtSettlementTime = async()=> {
    wsMessageReceived = []
    let _result = await utils.betProcess(VipSedieLocator.Even.x,VipSedieLocator.Even.y,`notice":{"errorCode":"SB1905"`)
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
        await placeBet("Even",3000)
        //await selectChip(3000)
        //flag = await utils.betProcess(VipSedieLocator.Odd.x, VipSedieLocator.Odd.y, `42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Tổng tiền cược tối đa ở phiên này là 3,000"}]`)
        flag = await utils.betProcess(VipSedieLocator.Odd.x, VipSedieLocator.Odd.y, `errorCode":"SB1910","maxBet":3000`)
        await utils.shouldBeEqual(flag.Val,true,`Verify error message Tổng tiền cược tối đa ở phiên này là 3,000`)
    }
    else if (_choice === 'Red4' || _choice === 'White4'){
        wsMessageReceived = []
        await selectChip(500)
        // flag = await utils.betProcess(VipSedieLocator[`${_choice}`].x, VipSedieLocator[`${_choice}`].y, `42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 500"}]`)
        flag = await utils.betProcess(VipSedieLocator[`${_choice}`].x, VipSedieLocator[`${_choice}`].y, `errorCode":"SB1910","maxBet":500`)
        await utils.shouldBeEqual(flag.Val,true, `Verify error message Tổng tiền cược tối đa ở phiên này là 500`)
    } else {
        wsMessageReceived = []
        await selectChip(3000)
        // flag = await utils.betProcess(VipSedieLocator[`${_choice}`].x, VipSedieLocator[`${_choice}`].y, `42/user/vipsedie,["VipSeDie",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 3,000"}]`)
        flag = await utils.betProcess(VipSedieLocator[`${_choice}`].x, VipSedieLocator[`${_choice}`].y, `errorCode":"SB1910","maxBet":3000`)
        await utils.shouldBeEqual(flag.Val,true,`Verify error message Tổng tiền cược tối đa ở phiên này là 3,000`)
    }
}
export const getBalance = async() => {
    return await utils.getBalance()
}
const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        let res = String(raw).split("42/user/vipsedie,");
        res= (res[0].length>1) ? res[0] : res[1]
        return res
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getResult =  async(_onlyResult = true ) => {
    try {
        let rawData = await getRawData(`{"finish":{"result"`)
        if(_onlyResult === true) {
            return await utils.getDataJsonPath(rawData,`$..finish.result`)
        } else {
            const roundId = await utils.getDataJsonPath(rawData, `$..roundId`)
            const settlementResult = await utils.getDataJsonPath(rawData, `$..settlementResult`)
            let _md5 =  await utils.getDataJsonPath(rawData, `$..rawValue`)
            return { 
                roundId : roundId, 
                odd : settlementResult.odd, 
                even : settlementResult.even,
                red2 : settlementResult.red2, 
                red3 : settlementResult.red3, 
                red4 : settlementResult.red4, 
                white3 : settlementResult.white3,
                white4 : settlementResult.white4,
                result : await utils.getDataJsonPath(rawData,`$..finish.result`),
                md5: _md5
            }
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getUserResult = async() => {
    try {
        let rawData = await getRawData(`{"status":{"winningByChoices":`)
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export const verifySettlement = async(_choice,_chip=10,_saveResult=false) => {
    /*  Param Explained:
        _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ....
        _chip : input chip amount will be selected, by default = 10
        _saveResult : when this variable = true, result in this round will be saved
    */
    let countRed = 0, currentBalance, lowcase, result, status,time
    lowcase = _choice.toLowerCase()
    wsMessageReceived = []
    // Wait to Finish Game
    await utils.wsFindMessage(`42/user/vipsedie,["VipSeDie",{"remainingTime":39}]`)
    await utils.sleep(6000)
    // Wait to new round
    currentBalance = await getBalance()
    // console.log("Current Balance: "+currentBalance)
    await placeBet(_choice,_chip)
    result = await getResult()
    // console.log('result',result)
    time = new Date().toISOString()
    
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
            await utils.shouldBeEqual(status.win,true,'check status win= true')
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip*Odd[`${_choice}`],'check winloss')
            // Verify Choice WinLoss
            await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],_chip*Odd[`${_choice}`],'check choice wl')
        } else {
            // Verify Status win/loss
            await utils.shouldBeEqual(status.win,false,'check status win= false')
            // Verify WinLoss
            await utils.shouldBeEqual(status.bet,_chip,'check winloss')
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

    if(_saveResult === true){
        let allResult = await getResult(false)
        allResult.choice = _choice
        allResult.stake = _chip
        allResult.countRed = countRed
        allResult.time = time
        allResult.betwin = winloss
        return allResult
    }
}

const verifyDealer = async() => {
    let flag = await utils.findImage(VipSedieLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const returnHome = async() => {
    await utils.clickPos(VipSedieLocator.Home.x, VipSedieLocator.Home.y)
    let flag = await utils.imageShouldNotDisplay(VipSedieLocator.Dealer)
    await utils.shouldBeEqual(flag.Val,true)
}

export const openGuide = async() => {
    await utils.clickPos(VipSedieLocator.Guide.x, VipSedieLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(VipSedieLocator.GuideClose.x, VipSedieLocator.GuideClose.y)
}

export const verifyGuideContent = async()=> {
    await utils.sleep(5000)
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
        await utils.clickPos(VipSedieLocator.Menu.x, VipSedieLocator.Menu.y)
        await utils.clickPos(VipSedieLocator.History.x, VipSedieLocator.History.y)
    } catch (error) {
        console.log(error.message)
        await utils.shouldBeEqual(false,true)
    }
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(1000)
    // let res = await utils.wsFindMessage('"history"')
    // await utils.shouldBeEqual(res.Val, true,'Check History')
    // await utils.CaptureSubImageToFile(VipSedieLocator.History)
    let flag = await utils.findImage(VipSedieLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(VipSedieLocator.HistoryClose.x, VipSedieLocator.HistoryClose.y)
}

export const verifyDBCuoc = async(_resultOnWeb) => {
    let qrFindCuoc = { $and: [{ name : await utils.getName() }, {phien :_resultOnWeb.roundId}]}
    let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.VipSedie.cuoc,qrFindCuoc)
    // Verify _id is existed
    await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
    // Verify phien
    await utils.shouldBeEqual(resultOnDb.phien,_resultOnWeb.roundId)
    // Verify uid is existed
    await utils.shouldBeEqual(("uid" in resultOnDb),true,"uid column is not existed")
    // Verify MemberId
    await utils.shouldBeEqual(resultOnDb.memberId.toString(),await utils.getMemberId())
    // Verify name
    await utils.shouldBeEqual(resultOnDb.name,await utils.getName())
    // Verify siteId (hard code on Local)
    await utils.shouldBeEqual(resultOnDb.siteId,'4100300')
    // Verify betwin
    await utils.shouldBeEqual(resultOnDb.betwin,_resultOnWeb.betwin)
    // Verify even
    await utils.shouldBeEqual(resultOnDb.even,
        (_resultOnWeb.choice === 'Even') ? _resultOnWeb.stake : 0)
    // Verify odd
    await utils.shouldBeEqual(resultOnDb.odd,
        (_resultOnWeb.choice === 'Odd') ? _resultOnWeb.stake : 0)
    // Verify red4
    await utils.shouldBeEqual(resultOnDb.red4,
        (_resultOnWeb.choice === 'Red4') ? _resultOnWeb.stake : 0)
    // Verify red3
    await utils.shouldBeEqual(resultOnDb.red3,
        (_resultOnWeb.choice === 'Red3') ? _resultOnWeb.stake : 0)
    // Verify red2
    await utils.shouldBeEqual(resultOnDb.red2,
        (_resultOnWeb.choice === 'Red2') ? _resultOnWeb.stake : 0)
    // Verify white3
    await utils.shouldBeEqual(resultOnDb.white3,
        (_resultOnWeb.choice === 'White3') ? _resultOnWeb.stake : 0)
    // Verify white4
    await utils.shouldBeEqual(resultOnDb.white4,
        (_resultOnWeb.choice === 'White4') ? _resultOnWeb.stake : 0)
    // Verify time
    await utils.shouldBeEqual(
        (Math.abs(new Date(_resultOnWeb.time) - new Date(resultOnDb.time))/1000) < 60,
        true,"Settle time is incorrect")
    // Verify thanhtoan
    await utils.shouldBeEqual(resultOnDb.thanhtoan,true)
    // Verify Odds
    await utils.shouldBeEqual(resultOnDb.odds.even, Odd.Even)
    await utils.shouldBeEqual(resultOnDb.odds.odd, Odd.Odd)
    await utils.shouldBeEqual(resultOnDb.odds.red4, Odd.Red4)
    await utils.shouldBeEqual(resultOnDb.odds.red3, Odd.Red3)
    await utils.shouldBeEqual(resultOnDb.odds.red2, Odd.Red2)
    await utils.shouldBeEqual(resultOnDb.odds.white3, Odd.White3)
    await utils.shouldBeEqual(resultOnDb.odds.white4, Odd.White4)
    // Verify freebet
    await utils.shouldBeEqual(resultOnDb.freeBet,false)
}

export const verifyDBPhien = async(_resultOnWeb)=>{
    let qrFindPhien = { id :_resultOnWeb.roundId }
    let resultOnDb = await utils.mondbGetData(DB.connectString,DB.dataBaseName,DB.collection.VipSedie.phien,qrFindPhien)
    // Verify column _id is existed
    await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
    // Verify id
    await utils.shouldBeEqual(resultOnDb.id,_resultOnWeb.roundId)
    // Verify result
    await utils.shouldBeEqual(resultOnDb.result.red1,_resultOnWeb.result.red1)
    await utils.shouldBeEqual(resultOnDb.result.red2,_resultOnWeb.result.red2)
    await utils.shouldBeEqual(resultOnDb.result.red3,_resultOnWeb.result.red3)
    await utils.shouldBeEqual(resultOnDb.result.red4,_resultOnWeb.result.red4)
    // Verify time
    await utils.shouldBeEqual(
        (Math.abs(new Date(_resultOnWeb.time) - new Date(resultOnDb.time))/1000) < 60,
        true,"Time is incorrect")
    // Verify Settlement result
    await utils.shouldBeEqual(resultOnDb.settlementResult.odd,_resultOnWeb.odd)
    await utils.shouldBeEqual(resultOnDb.settlementResult.even,_resultOnWeb.even)
    await utils.shouldBeEqual(resultOnDb.settlementResult.red2,_resultOnWeb.red2)
    await utils.shouldBeEqual(resultOnDb.settlementResult.red3,_resultOnWeb.red3)
    await utils.shouldBeEqual(resultOnDb.settlementResult.red4,_resultOnWeb.red4)
    await utils.shouldBeEqual(resultOnDb.settlementResult.white3,_resultOnWeb.white3)
    await utils.shouldBeEqual(resultOnDb.settlementResult.white4,_resultOnWeb.white4)
}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage('"remainingTime":39}]')
    await utils.sleep(9000)
  }


 //Place bet multiple choices and check settle
export const verifySettlementMultipleChoices = async(_choices,_chip) => {
   await waitUtilNewRound()
   await selectChip(_chip)
   // Select All Choices
   for(let i of _choices){
     await utils.clickPos(VipSedieLocator[`${i}`].x,VipSedieLocator[`${i}`].y)
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