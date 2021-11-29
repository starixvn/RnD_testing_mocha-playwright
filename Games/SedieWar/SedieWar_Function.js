import * as utils from '../../util/utils'
const GameLobbyLocator = (process.env.npm_config_cf_lang == 'vn' ? require('../References/GameLobby_Locator').GameLobbyLocator_vn : require('../References/GameLobby_Locator').GameLobbyLocator_en)
const SedieWarLocator = (process.env.npm_config_cf_lang === 'vn' ? require('./SedieWar_Locator').SedieWarLocator_vn : require('./SedieWar_Locator').SedieWarLocator_en)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'

let Odd = { 
    Player : 2.6, Tie : 3.5, Banker : 2.6, Even : 1.96 , Odd : 1.96, 
    PlayerEven : 1.96, PlayerOdd : 1.96, PlayerRed4 : 14.4, PlayerRed3 : 3.75, PlayerWhite3 : 3.75, PlayerWhite4 : 14.4,
    BankerEven : 1.96, BankerOdd : 1.96, BankerRed4 : 14.4, BankerRed3 : 3.75, BankerWhite3 : 3.75, BankerWhite4 : 14.4
 }


export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/vipsediewar,["message",{"toGame":"VipSedieWar"}]')
    expect(_result.Val).to.equal(true)
}

export const verifyBetChoice = async() => {
    // await utils.wsWaitMessage('42/user/vipsediewar,["VipSedieWar",{"finish"')
    // await utils.sleep(52000)
    // await utils.CaptureSubImageToFile(SedieWarLocator.Even)
    // await utils.CaptureSubImageToFile(SedieWarLocator.Odd)
    // await utils.CaptureSubImageToFile(SedieWarLocator.Tie)
    // await utils.CaptureSubImageToFile(SedieWarLocator.Player)
    // await utils.CaptureSubImageToFile(SedieWarLocator.PlayerEven)
    // await utils.CaptureSubImageToFile(SedieWarLocator.PlayerOdd)
    // await utils.CaptureSubImageToFile(SedieWarLocator.PlayerRed4)
    // await utils.CaptureSubImageToFile(SedieWarLocator.PlayerRed3)
    // await utils.CaptureSubImageToFile(SedieWarLocator.PlayerWhite3)
    // await utils.CaptureSubImageToFile(SedieWarLocator.PlayerWhite4)
    // await utils.CaptureSubImageToFile(SedieWarLocator.Banker)
    // await utils.CaptureSubImageToFile(SedieWarLocator.BankerEven)
    // await utils.CaptureSubImageToFile(SedieWarLocator.BankerOdd)
    // await utils.CaptureSubImageToFile(SedieWarLocator.BankerRed4)
    // await utils.CaptureSubImageToFile(SedieWarLocator.BankerRed3)
    // await utils.CaptureSubImageToFile(SedieWarLocator.BankerWhite3)
    // await utils.CaptureSubImageToFile(SedieWarLocator.BankerWhite4)

    let _result = await utils.findImage(SedieWarLocator.Even)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.Odd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.Tie)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.Player)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.PlayerEven)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.PlayerOdd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.PlayerRed4)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.PlayerRed3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.PlayerWhite3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.PlayerWhite4)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.Banker)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.BankerEven)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.BankerOdd)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.BankerRed4)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.BankerRed3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.BankerWhite3)
    expect(_result.Val).to.equal(true)
    _result = await utils.findImage(SedieWarLocator.BankerWhite4)
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
            await utils.swipe(SedieWarLocator.ChipBroad.x,SedieWarLocator.ChipBroad.y,0,SedieWarLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        else if (_chipbar1.includes(_chip) === true){
            await utils.swipe(SedieWarLocator.ChipBroad.x,SedieWarLocator.ChipBroad.y,SedieWarLocator.ChipBroad.x+500,SedieWarLocator.ChipBroad.y)
            await utils.sleep(2000)
        }
        await utils.clickPos(SedieWarLocator[`Chip${_chip}`].x,SedieWarLocator[`Chip${_chip}`].y) 

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
    let lowcase = _choice.charAt(0).toLowerCase() + _choice.slice(1);
    let _result = await utils.betProcess(SedieWarLocator[`${_choice}`].x,SedieWarLocator[`${_choice}`].y,`"ownBets":{"${lowcase}"`)
    await utils.shouldBeEqual(_result.Val, true,`Failed placebet ${_choice} & ${_chip}`)
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
    let _result = await utils.findImage(SedieWarLocator.ChipBroad.ImageCompare1, SedieWarLocator.ChipBroad)
    expect(_result.Val).to.equal(true)
    await utils.swipe(SedieWarLocator.ChipBroad.x,SedieWarLocator.ChipBroad.y,0,SedieWarLocator.ChipBroad.y)
    await utils.sleep(1000)
    _result = await utils.findImage(SedieWarLocator.ChipBroad.ImageCompare2, SedieWarLocator.ChipBroad)
    expect(_result.Val).to.equal(true)
}

export const verifyBetAtBlockBettingTime = async() => {
    wsMessageReceived = []
    let _result = await utils.betProcess(SedieWarLocator.Even.x,SedieWarLocator.Even.y,`notice":{"errorCode":"SB1905"`)
    expect(_result.Val).to.equal(true)
}

export const verifyBetAtSettlementTime = async()=> {
    wsMessageReceived = []
    await utils.wsFindMessage(`42/user/vipsediewar,["VipSedieWar",{"remainingTime":54}]`)
    let _result = await utils.betProcess(SedieWarLocator.Even.x,SedieWarLocator.Even.y,`notice":{"errorCode":"SB1905"`)
    expect(_result.Val).to.equal(true)
}

export const verifyMaxBet = async(_choice) =>{
    /*  Param Explained:
         _choice : input choice option will be selected, ex: 'Even' , 'Odd', '4Red' ... 'Round' will be verify message max Round
    */
    let flag, lowchoice=_choice.charAt(0).toLowerCase() + _choice.slice(1);
    if (_choice === 'Round'){
        // Wait to Finish Game
        wsMessageReceived = []
        await utils.wsFindMessage(`42/user/vipsediewar,["VipSedieWar",{"remainingTime":54}]`)
        // Wait to new round
        await utils.sleep(9000)
        await placeBet("Even")
        await selectChip(2000)
        flag = await utils.betProcess(SedieWarLocator.Odd.x, SedieWarLocator.Odd.y, `"errorCode":"SB1911","maxBet":2000`)
        await utils.shouldBeEqual(flag.Val,true)
    }
    else if (_choice === 'PlayerRed4' || _choice === 'PlayerWhite4' || _choice === 'BankerRed4' || _choice === 'BankerWhite4'){
        wsMessageReceived = []
        await selectChip(500)
        flag = await utils.betProcess(SedieWarLocator[`${_choice}`].x, SedieWarLocator[`${_choice}`].y, `"errorCode":"SB1910","maxBet":500`)
        await utils.shouldBeEqual(flag.Val,true)
    } else {
        wsMessageReceived = []
        await selectChip(2000)
        flag = await utils.betProcess(SedieWarLocator[`${_choice}`].x, SedieWarLocator[`${_choice}`].y, `"errorCode":"SB1910","maxBet":2000`)
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
            raw = raw.split("42/user/vipsediewar,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const getResult =  async() => {
    try {
        let rawData = await getRawData(`42/user/vipsediewar,["VipSedieWar",{"finish":{"result"`)
        return { 
            roundId : await utils.getDataJsonPath(rawData, `$..roundId`),
            result : await utils.getDataJsonPath(rawData,`$..finish.result`),
            settlementResult : await utils.getDataJsonPath(rawData, `$..settlementResult`)
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getUserResult = async() => {
    try {
        let rawData = await getRawData(`42/user/vipsediewar,["VipSedieWar",{"status":{"winningByChoices":`)
        return await utils.getDataJsonPath(rawData, `$[1]['status']`)
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
    let BankerRed = 0, PlayerRed = 0, currentBalance, lowcase, result, status,time
    lowcase = _choice.charAt(0).toLowerCase() + _choice.slice(1);
    wsMessageReceived = []
    // Wait to Finish Game
    await utils.wsWaitMessage(`42/user/vipsediewar,["VipSedieWar",{"finish"`)
    //await utils.wsFindMessage(`42/user/vipsediewar,["VipSedieWar",{"finish"`)
    await utils.sleep(9000)
     // Wait to new round
    currentBalance = await getBalance()
    // console.log("Current Balance: "+currentBalance)
    await placeBet(_choice,_chip)
    let bettime = new Date().toISOString()
    result = await getResult()
    time = new Date().toISOString()
    for(let i=1; i<5 ; i++){
        if (result.result.banker[`red${i}`] === true) {
            BankerRed = BankerRed +1
        }
        if (result.result.player[`red${i}`] === true) {
            PlayerRed = PlayerRed +1
        }
    }
    // Check on Websocket
    status = await getUserResult()
    // Verify Status win/loss
    await utils.shouldBeEqual(status.win,result.settlementResult[lowcase],'check wl status')
    // Verify WinLoss
    await utils.shouldBeEqual(status.bet,(result.settlementResult[lowcase] === true) ? _chip*Odd[`${_choice}`]: _chip,'check wl ammount')
    // Verify Choice WinLoss
    await utils.shouldBeEqual(status.winningByChoices[`${lowcase}`],
        (result.settlementResult[lowcase] === true) ? _chip*Odd[`${_choice}`] :0,'check choice')

    let winloss = (status.win === true) ? _chip*Odd[`${_choice}`] : 0;
    let balance = currentBalance - _chip + winloss
    await utils.sleep(6000)
    currentBalance = await getBalance()
    // Verify Balance on UI
    console.log('actual Balance: ' + currentBalance)
    let rs = (Math.abs(currentBalance-balance) <= 0.01) ? true : false;
    // console.log(Math.abs(currentBalance-balance))
    await utils.shouldBeEqual(rs,true,"Error: expect actual balance ( "+currentBalance+" ) to equal : "+balance)
    let allResult = result
    allResult.choice = _choice
    allResult.stake = _chip
    allResult.time = time
    allResult.bettime = bettime
    allResult.betwin = winloss
    allResult.PlayerRed = PlayerRed
    allResult.BankerRed = BankerRed
    return allResult
}

export const returnHome = async() => {
    await utils.clickPos(SedieWarLocator.Menu.x, SedieWarLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(SedieWarLocator.Home.x, SedieWarLocator.Home.y)
    await utils.sleep(1000)
    let flag = await utils.imageShouldNotDisplay(SedieWarLocator.Player)
    await utils.shouldBeEqual(flag.Val,true)
}

export const openGuide = async() => {
    await utils.clickPos(SedieWarLocator.Menu.x, SedieWarLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(SedieWarLocator.Guide.x, SedieWarLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(SedieWarLocator.GuideClose.x, SedieWarLocator.GuideClose.y)
}

export const verifyGuideContent = async()=> {
    await utils.sleep(5000)
    let fx = config.setting.viewport.width /2
    let fy = config.setting.viewport.height /2
    let ty = 0
    let _AcheckImage = [ SedieWarLocator.Guide.ImageCompare1, SedieWarLocator.Guide.ImageCompare2, SedieWarLocator.Guide.ImageCompare3,
        SedieWarLocator.Guide.ImageCompare4, SedieWarLocator.Guide.ImageCompare5, SedieWarLocator.Guide.ImageCompare6, 
        SedieWarLocator.Guide.ImageCompare7, SedieWarLocator.Guide.ImageCompare8, SedieWarLocator.Guide.ImageCompare9] 
    for(let t = 0; t< _AcheckImage.length; t++){
        // // Get Screen Shot for Guide content
        // await page.screenshot({path: _AcheckImage[t] ,clip:{
        // x: SedieWarLocator.Guide.left,
        //     y: SedieWarLocator.Guide.top,
        // width: SedieWarLocator.Guide.width,
        // height: SedieWarLocator.Guide.height}})
        // await utils.swipe(fx, fy, fx, ty) 
        // Verify screen
        let _result = await utils.findImage(
            _AcheckImage[t],
            SedieWarLocator.Guide
            )
        await utils.swipe(fx, fy, fx, ty) 
        await utils.shouldBeEqual(_result.Val,true)
    }
}

export const openHistory = async() => {
    await utils.clickPos(SedieWarLocator.Menu.x, SedieWarLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(SedieWarLocator.History.x, SedieWarLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(2000)
    // await utils.CaptureSubImageToFile(SedieWarLocator.History)
    let flag = await utils.findImage(SedieWarLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(SedieWarLocator.HistoryClose.x, SedieWarLocator.HistoryClose.y)
}

export const verifyDBCuoc = async(_resultOnWeb) => {
    let qrFindCuoc = { $and: [{ name : await utils.getName() }, {phien :_resultOnWeb.roundId}]}
    let resultOnDb =  await utils.mondbGetData(DB.connectString[env],DB.dataBaseName,DB.collection.SedieWar.cuoc,qrFindCuoc)
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
    // Verify choice
    let lowcase = _resultOnWeb.choice.charAt(0).toLowerCase() + _resultOnWeb.choice.slice(1);
    await utils.shouldBeEqual(resultOnDb.choice,lowcase)
    await utils.shouldBeEqual(
        (Math.abs(new Date(_resultOnWeb.bettime) - new Date(resultOnDb.time))/1000) < 60,
        true,"Settle time is incorrect")
    // Verify amount
    await utils.shouldBeEqual(resultOnDb.amount,_resultOnWeb.stake)
}

export const verifyDBPhien = async(_resultOnWeb)=>{
    let qrFindPhien = { id :_resultOnWeb.roundId }
    let resultOnDb = await utils.mondbGetData(DB.connectString[env],DB.dataBaseName,DB.collection.SedieWar.phien,qrFindPhien)
    // Verify column _id is existed
    await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
    // Verify id
    await utils.shouldBeEqual(resultOnDb.id,_resultOnWeb.roundId)
    // Verify result
    await utils.shouldBeEqual(JSON.stringify(resultOnDb.result),JSON.stringify(_resultOnWeb.result))
    // Verify time
    await utils.shouldBeEqual(
        (Math.abs(new Date(_resultOnWeb.time) - new Date(resultOnDb.time))/1000) < 60,
        true,"Time is incorrect")
    // Verify Settlement result
    await utils.shouldBeEqual(JSON.stringify(resultOnDb.settlementResult),JSON.stringify(_resultOnWeb.settlementResult))
}

export const verifyDBOne = async(_resultOnWeb)=>{
    let qrFindOne = { phien :_resultOnWeb.roundId }
    let resultOnDb = await utils.mondbGetData(DB.connectString[env],DB.dataBaseName,DB.collection.SedieWar.ones,qrFindOne)
    
    let lowcase = _resultOnWeb.choice.charAt(0).toLowerCase() + _resultOnWeb.choice.slice(1);
    // Verify column _id is existed
    await utils.shouldBeEqual(("_id" in resultOnDb),true,"_id column is not existed")
    // Verify freebet 
    await utils.shouldBeEqual(resultOnDb.freeBet,false)
    // Verify choice
    await utils.shouldBeEqual(resultOnDb[lowcase],_resultOnWeb.stake)
    // Verify betwin
    await utils.shouldBeEqual(resultOnDb.betwin,(_resultOnWeb.betwin))
    // Verify MemberId
    await utils.shouldBeEqual(resultOnDb.memberId.toString(),await utils.getMemberId())
    // Verify name
    await utils.shouldBeEqual(resultOnDb.name,await utils.getName())
    // Verify thanhtoan
    await utils.shouldBeEqual(resultOnDb.thanhtoan,true)
    // Verify time
    await utils.shouldBeEqual(
        (Math.abs(new Date(_resultOnWeb.bettime) - new Date(resultOnDb.time))/1000) < 60,
        true,"Time is incorrect")
    // Verify total amount
    await utils.shouldBeEqual(resultOnDb.totalAmount,_resultOnWeb.stake)
    for( const [key,value] of Object.entries(Odd)){
        let tmp = key.charAt(0).toLowerCase() + key.slice(1);
        await utils.shouldBeEqual(resultOnDb.odds[tmp],value)
    }

}

//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage('42/user/vipsediewar,["VipSedieWar",{"remainingTime":54}]')
    await utils.sleep(9000)
  }


 //Place bet multiple choices and check settle
export const verifySettlementMultipleChoices = async(_choices,_chip) => {
   await waitUtilNewRound()
   await selectChip(_chip)
   // Select All Choices
   for(let i of _choices){
     await utils.clickPos(SedieWarLocator[`${i}`].x,SedieWarLocator[`${i}`].y)
     await utils.sleep(200)
    }
    await utils.sleep(1000)
    let currentBalance = await getBalance()
 // Get Settle
    wsMessageReceived = []
    let status = await getUserResult()
    let balance = currentBalance +  status.bet
    await utils.sleep(8000)
    currentBalance = await getBalance()
    // Verify Balance on UI
    // console.log('actual Balance: ' + currentBalance)
    let rs = (Math.abs(currentBalance-balance) <= 0.01) ? true : false;
    // console.log(Math.abs(currentBalance-balance))
    await utils.shouldBeEqual(rs,true,"Error: expect actual balance ( "+currentBalance+" ) to equal : "+balance)
  } 