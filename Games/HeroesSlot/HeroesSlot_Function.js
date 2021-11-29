import * as utils from '../../util/utils'
const GameLobbyLocator = (process.env.npm_config_cf_lang == 'en' ? require('../References/GameLobby_Locator').GameLobbyLocator_en : require('../References/GameLobby_Locator').GameLobbyLocator_vn)
const HeroesSlotLocator = (process.env.npm_config_cf_lang === 'en' ? require('./HeroesSlot_Locator').HeroesSlotLocator_en : require('./HeroesSlot_Locator').HeroesSlotLocator_vn)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'

let wsm = '42/user/heroesslot,["HeroesSlot"'


export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('42/user/heroesslot,["message",{"toGame":"HeroesSlot"}]')
    expect(_result.Val).to.equal(true)
    await utils.findImage(HeroesSlotLocator.Menu)
}

export const OpenPlayLineDetail = async() => {
    // Update when implement full Test
    // await _clickPos(HeroSlotLocator.PayLine)
    // await utils.sleep(1000)
}

export const SelectPayline = async(line) => {
    // Update when implement full Test
    // await _clickPos(HeroesSlotLocator.UnSelectLine)
    // // line = All, Odd and Even
    // line === 'All' ?  await _clickPos(HeroesSlotLocator.AllLine) : line === 'Odd'?  await _clickPos(HeroesSlotLocator.OddLine) :line === 'Even'? await _clickPos(HeroesSlotLocator.EvenLine):await _clickPos(HeroesSlotLocator[line])
    // await utils.sleep(500)
}
export const SelectStake= async(stake) => {
    // Update when implement full Test
    // await _clickPos(HeroesSlotLocator.Stake)
    // // stake = 0.1 | 1 |5
    // stake === 0.1 ?  await _clickPos(HeroesSlotLocator.Stake0_1) : stake === 1 ?  await _clickPos(HeroesSlotLocator.Stake1) : await _clickPos(HeroesSlotLocator.Stake5)
}  

export const placeBet = async(line='All',_stake=0.1) => {
    // Update when implement full Test
    await OpenPlayLineDetail()
    await SelectPayline(line)
    // await _clickPos(HeroesSlotLocator.ConfirmLine)
    await SelectStake(_stake)
    await utils.clickPos(HeroesSlotLocator.Spin.x, HeroesSlotLocator.Spin.y)
}



export const getBalance = async() => {
    return await utils.getBalance()
}
const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        if(raw === null) return null
        else {
            raw = raw.split("42/user/heroesslot,");
            return raw[1]
        }
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
    await utils.clickPos(HeroesSlotLocator.Menu.x, HeroesSlotLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(HeroesSlotLocator.Home.x, HeroesSlotLocator.Home.y)
    let flag = await utils.findImage(GameLobbyLocator.AccountName)
    await utils.shouldBeEqual(flag.Val,true)
}

export const openGuide = async() => {
    await utils.clickPos(HeroesSlotLocator.Menu.x, HeroesSlotLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(HeroesSlotLocator.Guide.x, HeroesSlotLocator.Guide.y)
}

export const closeGuide = async() => {
    await utils.clickPos(HeroesSlotLocator.GuideClose.x, HeroesSlotLocator.GuideClose.y)
}

export const verifyGuideContent = async()=> {
    await utils.sleep(5000)
    let fx = config.setting.viewport.width /2
    let fy = config.setting.viewport.height /2
    let ty = 0
    let _AcheckImage = [ HeroesSlotLocator.Guide.ImageCompare1, HeroesSlotLocator.Guide.ImageCompare2, HeroesSlotLocator.Guide.ImageCompare3,
        HeroesSlotLocator.Guide.ImageCompare4, HeroesSlotLocator.Guide.ImageCompare5, HeroesSlotLocator.Guide.ImageCompare6] 
    for(let t = 0; t< _AcheckImage.length; t++){
        // Get Screen Shot for Guide content
        await page.screenshot({path: _AcheckImage[t] ,clip:{
        x: HeroesSlotLocator.Guide.left,
            y: HeroesSlotLocator.Guide.top,
        width: HeroesSlotLocator.Guide.width,
        height: HeroesSlotLocator.Guide.height}})
        await utils.sleep(1000)
        await utils.swipe(fx, fy, fx, ty) 

        // // Verify screen
        // let _result = await utils.findImage(
        //     _AcheckImage[t],
        //     HeroesSlotLocator.Guide
        //     )
        // await utils.swipe(fx, fy, fx, ty) 
        // await utils.shouldBeEqual(_result.Val,true)
    }
}

export const openHistory = async() => {
    await utils.clickPos(HeroesSlotLocator.Menu.x, HeroesSlotLocator.Menu.y)
    await utils.sleep(1000)
    await utils.clickPos(HeroesSlotLocator.History.x, HeroesSlotLocator.History.y)
}

export const verifyHistoryPopup = async() => {
    await utils.sleep(2000)
    // await utils.CaptureSubImageToFile(HeroSlotLocator.History)
    let flag = await utils.findImage(HeroesSlotLocator.History)
    await utils.shouldBeEqual(flag.Val,true)
}

export const closeHistory = async() => {
    await utils.clickPos(HeroesSlotLocator.HistoryClose.x, HeroesSlotLocator.HistoryClose.y)
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



