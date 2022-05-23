import * as utils from '../../util/utils'
const GameLobbyLocator = (process.env.npm_config_cf_lang == 'en' ? require('../References/GameLobby_Locator').GameLobbyLocator_en : require('../References/GameLobby_Locator').GameLobbyLocator_vn)
const NightClubLocator = (process.env.npm_config_cf_lang === 'en' ? require('./NightClub_Locator').NightClubLocator_en : require('./NightClub_Locator').NightClubLocator_vn)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'

let wsm = '"NightClub"'



export const _clickPos = async(_locator) => {
    await utils.clickPos(_locator.x,_locator.y )
    await utils.sleep(1000)
  }

export const verifySignInSuccessfully = async() => {
 await utils.verifySignInSuccessfully()
//  await utils.CaptureSubImageToFile(NightClubLocator.PayLine)
 await utils.findImage(NightClubLocator.PayLine)
}

export const OpenPlayLineDetail = async() => {
    await _clickPos(NightClubLocator.PayLine)
    await utils.sleep(1000)
}

export const SelectPayline = async(line) => {
    await _clickPos(NightClubLocator.UnSelectLine)
    await _clickPos(NightClubLocator[line])
    // line = All, Odd and Even
    // line === 'AllLine' ?  await _clickPos(NightClubLocator.AllLine) : line === 'OddLine'?  await _clickPos(NightClubLocator.OddLine) :line === 'EvenLine'? await _clickPos(NightClubLocator.EvenLine):await _clickPos(NightClubLocator[line])
    await utils.sleep(500)
    await _clickPos(NightClubLocator.ConfirmLine)
    await utils.sleep(3000)

}
export const SelectStake= async(stake) => {
    await _clickPos(NightClubLocator.Stake)
    await _clickPos(NightClubLocator[`Stake${stake}`])
    await utils.sleep(1000)
  }  

export const placeBet = async(line='All',_stake='0_1',_sspeed=false,_autospin='noauto') => {
    if (_sspeed==true) {
        await _clickPos(NightClubLocator.SuperSpeed)
    }
    await OpenPlayLineDetail()
    await SelectPayline(line)
    // await _clickPos(NightClubLocator.ConfirmLine)
    await SelectStake(_stake)
    if (_autospin !='noauto') {
        await _clickPos(NightClubLocator.AutoSpin)
        await utils.sleep(1000)
        await _clickPos(NightClubLocator[`AutoSprin${_autospin}`])
        await _clickPos(NightClubLocator.AutoSprinConfirm)
        await utils.sleep(5000)
    }
    else{
        await _clickPos(NightClubLocator.Spin)
    }
    await utils.sleep(1000)
}

export const getBalance = async() => {
    return await utils.getBalance()
}
const getRawData = async(_mes) => {
    try {
        return await utils.getRowDataFromJS('nightclub',_mes)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export const getResult =  async() => {
    try {
        // wait bet animation
        if((await utils.wsFindMessage(`${wsm},{"bonuses"`,3)).Val === true){
            // wait 2min to auto close bonus popup
            await utils.clearLog()
            await utils.sleep(140000)
        }
        while((await utils.getDataJsonPath(await getRawData(`${wsm},{"finish":{"`),`$..finish.totalOfFreeSpins`)).toString() !== '0'){
            // wait clear freespin
            await utils.sleep(3000)
        }
        let rawData = await getRawData(`${wsm},{"finish":{"`)
        // console.log(await utils.getDataJsonPath(rawData,`$..finish`))
        return await utils.getDataJsonPath(rawData,`$..finish`)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export const getLastHistory = async() => {
    let rawData = await getRawData(`${wsm},{"history":{"`)
    // console.log(await utils.getDataJsonPath(rawData,`$..history.betLogs[0]`))
    return await utils.getDataJsonPath(rawData,`$..history.betLogs[0]`)
}


export const returnHome = async() => {
    await utils.clickPos(NightClubLocator.Menu.x, NightClubLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(NightClubLocator.Home.x, NightClubLocator.Home.y)
    let flag = await utils.findImage(GameLobbyLocator.AccountName)
    await utils.shouldBeEqual(flag.Val,true)
}

export const openGuide = async() => {
    await utils.clickPos(NightClubLocator.Menu.x, NightClubLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(NightClubLocator.Guide.x, NightClubLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(NightClubLocator.GuideClose.x, NightClubLocator.GuideClose.y)
}

export const verifyGuideContent = async()=> {
    await utils.sleep(5000)
    let fx = config.setting.viewport.width /2
    let fy = config.setting.viewport.height /2
    let ty = 0
    let _AcheckImage = [ NightClubLocator.Guide.ImageCompare1, NightClubLocator.Guide.ImageCompare2, NightClubLocator.Guide.ImageCompare3,
        NightClubLocator.Guide.ImageCompare4, NightClubLocator.Guide.ImageCompare5, NightClubLocator.Guide.ImageCompare6] 
    for(let t = 0; t< _AcheckImage.length; t++){
        // Get Screen Shot for Guide content
        await page.screenshot({path: _AcheckImage[t] ,clip:{
        x: NightClubLocator.Guide.left,
            y: NightClubLocator.Guide.top,
        width: NightClubLocator.Guide.width,
        height: NightClubLocator.Guide.height}})
        await utils.sleep(1000)
        await utils.swipe(fx, fy, fx, ty) 

        // // Verify screen
        // let _result = await utils.findImage(
        //     _AcheckImage[t],
        //     NightClubLocator.Guide
        //     )
        // await utils.swipe(fx, fy, fx, ty) 
        // await utils.shouldBeEqual(_result.Val,true)
    }
}

export const openHistory = async() => {
    await utils.clickPos(NightClubLocator.Menu.x, NightClubLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(NightClubLocator.History.x, NightClubLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(2000)
    // await utils.CaptureSubImageToFile(HeroSlotLocator.History)
    let flag = await utils.findImage(NightClubLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(NightClubLocator.HistoryClose.x, NightClubLocator.HistoryClose.y)
}

export const betAndGetResult = async(line='All',_stake=0.1) => {
    await placeBet(line,_stake)
    return await getResult()

}
const compareLastBetAndLastLogHistory = async(_result,_BetHistory) => {
    await utils.shouldBeEqual(_result.roundId,_BetHistory.id,"Verify BetID")
    await utils.shouldBeEqual(_result.betByFreeSpin,_BetHistory.freeSpin,"Verify Bet by balance")
    await utils.shouldBeEqual(_result.result.toString(),_BetHistory.result.toString(),"Verify result")
    await utils.shouldBeEqual(_result.settlementResult.winningLines.payline,_BetHistory.settlementResult.winningPaylines.payline,"Verify winning paylines - payline")
    await utils.shouldBeEqual(_result.settlementResult.winningLines.symbol,_BetHistory.settlementResult.winningPaylines.symbol,"Verify winning paylines - symbol")
    await utils.shouldBeEqual(_result.settlementResult.winningLines.count,_BetHistory.settlementResult.winningPaylines.count,"Verify winning paylines - count")
    await utils.shouldBeEqual(_result.betWin,_BetHistory.betWin,"Verify betWin")
}
export const verifyHistoryContent = async(_result) => {
    // placebet to get new id
    await openHistory()
    await utils.sleep(5000)
    await compareLastBetAndLastLogHistory(_result, await getLastHistory()) 
    await closeHistory()
}


//Check Settlement
export const checkSettlement = async (placebetfunc,args) => {
    wsMessageReceived.length=0
    // PlaceBet
    await placebetfunc.apply(this,args)
    if (args[3] !='noauto' ) {
        await utils.sleep(args[3] * 2000) //wait auto spin
    }
    await utils.sleep(3000)
    // get settle result
    let settle_result = await getSettlementResult()
     if (settle_result.totalfreesprin >0) {
        console.log(settle_result);
        await utils.sleep(settle_result.totalfreesprin * 2000)
    }
    await utils.sleep(3000)
    let _afbalance = await utils.getBalance()
    //check balance
    await utils.shouldBeEqual((settle_result.red + settle_result.betWin).toFixed(2),_afbalance.toFixed(2), `verify balance`) 
}

//Get Settlement Result
export const getSettlementResult = async () => {
    try {
        let _time = new Date().toISOString()
        let _status = await utils.getRowDataFromJS('NightClub','{"endBet":')
        let _finish = await utils.getRowDataFromJS('NightClub','{"finish":')
        let _red = await utils.getDataJsonPath(_status,`$..red`)
        let _betstake = await utils.getDataJsonPath(_status,`$..endBet`)
        let _freespin = await utils.getDataJsonPath(_status,`$..freeSpin`)
        let _roundId = await utils.getDataJsonPath(_finish,`$..roundId`)
        let _betfreespin = await utils.getDataJsonPath(_finish,`$..betByFreeSpin`)
        let _result = await utils.getDataJsonPath(_finish,`$..result`)
        let _settlementResult = await utils.getDataJsonPath(_finish,`$..settlementResult`)
        let _betWin = await utils.getDataJsonPath(_finish,`$..betWin`)
        let _bigWin = await utils.getDataJsonPath(_finish,`$..bigWin`)
        let _totalfreesprin = await utils.getDataJsonPath(_finish,`$..totalOfFreeSpins`)
        let _winline = await utils.getDataJsonPath(_finish,`$..payline`)
        return {red: _red, time: _time,betstake: _betstake,roundId: _roundId, result:_result, settlementResult : _settlementResult,betWin: _betWin, bigWin: _bigWin, totalfreesprin: _totalfreesprin, winline: _winline}
        } catch (e) {
        console.error(e)
    }
  }

  
export const ReturnHome = async() => {
    await _clickPos(NightClubLocator.Menu )
    await _clickPos(NightClubLocator.Home )
    await utils.sleep(3000)
  }

