import * as utils from '../../util/utils'
const GameLobbyLocator = (process.env.npm_config_cf_lang == 'en' ? require('../References/GameLobby_Locator').GameLobbyLocator_en : require('../References/GameLobby_Locator').GameLobbyLocator_vn)
const TreasureIslandLocator = (process.env.npm_config_cf_lang === 'en' ? require('./TreasureIsland_Locator').TreasureIslandLocator_en : require('./TreasureIsland_Locator').TreasureIslandLocator_vn)
import {DB} from '../References/DataBase_Locator'
import * as config from '../../config/config'
import { expect } from 'chai'
import { clickPos } from '../SpecialSedie/SpecialSedie_Function'

export const _clickPos = async(_locator) => {
    await utils.clickPos(_locator.x,_locator.y )
    await utils.sleep(1000)
  }

export const verifySignInSuccessfully = async() => {
    let _result = await utils.wsFindMessage('"toGame":"TreasureIsland"}')
    expect(_result.Val).to.equal(true)
    utils.sleep(5000)
}

export const ReturnHome = async() => {
    await _clickPos(TreasureIslandLocator.Menu )
    await _clickPos(TreasureIslandLocator.Home )
    await utils.sleep(5000)
    let _rawData = wsMessageSend.filter(element => element.includes('41'));
    expect(_rawData.length>0).to.equal(true)
  }


//Check Settlement
export const checkSettlement = async (placebetfunc,args) => {
    wsMessageReceived.length=0
    // PlaceBet
    await placebetfunc.apply(this,args)
    if (args[4] !='noauto' ) {
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
        let _status = await utils.getRowDataFromJS('TreasureIsland','{"endBet":')
        let _finish = await utils.getRowDataFromJS('TreasureIsland','{"finish":')
        let _red = await utils.getDataJsonPath(_status,`$..red`)
        let _betstake = await utils.getDataJsonPath(_status,`$..endBet`)
        let _roundId = await utils.getDataJsonPath(_finish,`$..roundId`)
        let _result = await utils.getDataJsonPath(_finish,`$..result`)
        let _settlementResult = await utils.getDataJsonPath(_finish,`$..settlementResult`)
        let _betWin = await utils.getDataJsonPath(_finish,`$..finish.win`)
        let _bigWin = await utils.getDataJsonPath(_finish,`$..bigWin`)
        let _totalfreesprin = await utils.getDataJsonPath(_finish,`$..totalOfFreeSpins`)
        return {red: _red, time: _time,betstake: _betstake,roundId: _roundId, result:_result, settlementResult : _settlementResult,betWin: _betWin, bigWin: _bigWin, totalfreesprin: _totalfreesprin}
        } catch (e) {
        console.error(e)
    }
  }

  export const SelectStake= async(stake) => {
    await _clickPos(NightClubLocator.Stake)
    await _clickPos(NightClubLocator[`Stake${stake}`])
    await utils.sleep(1000)
  }  

export const placeBet = async(betlevel='Up',coinValue='Up',totalBet='Up',_sspeed=false,_autospin='noauto',_key='click') => {
    //Click bet menu
    await _clickPos(TreasureIslandLocator.Stakemenu)
    //Bet Level
    if (betlevel =='Up') {
        await _clickPos(TreasureIslandLocator.StakelevelUp)       
    }
    if (betlevel =='Down') {
        await _clickPos(TreasureIslandLocator.StakelevelDown)       
    }
       //coinValue
    if (coinValue =='Up') {
        await _clickPos(TreasureIslandLocator.StakeAmountUp)       
    }
    if (coinValue =='Down') {
        await _clickPos(TreasureIslandLocator.StakeAmountDown)       
    }
           //totalBet
    if (totalBet =='Up') {
        await _clickPos(TreasureIslandLocator.StakeTotalUp)       
    }
    if (totalBet =='Down') {
        await _clickPos(TreasureIslandLocator.StakeTotalDown)       
    }
   //Close bet menu
   await _clickPos(TreasureIslandLocator.StakeClose)
   //turbo mood
   if (_sspeed ==true) {
    await _clickPos(TreasureIslandLocator.Turbo)       
}
   //auto spin

   if (_autospin !='noauto') {
    await _clickPos(TreasureIslandLocator.AutoSpin)  
    await _clickPos(TreasureIslandLocator[ `AutoSpin${_autospin}`])    
    await _clickPos(TreasureIslandLocator.AutoSpinStart)  
}
//Spin
if (_autospin =='noauto' && _key== 'click') {
await _clickPos(TreasureIslandLocator.Spin)
}
if (_autospin =='noauto' && _key != 'click') {
    await page.keyboard.press('Space');
    await page.keyboard.up('Space');
    }
await utils.sleep(1000)
}

export const getBalance = async() => {
    return await utils.getBalance()
}

export const resetbetstake = async() => {
    await  _clickPos(TreasureIslandLocator.Trialbtn)
    await  _clickPos(TreasureIslandLocator.Trialbtn)
}

export const switchmode = async() => {
    await  _clickPos(TreasureIslandLocator.Trialbtn)
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



