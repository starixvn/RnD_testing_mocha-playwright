import * as utils from '../../util/utils'
const TreasureIslandLocator = (process.env.npm_config_cf_lang === 'en' ? require('./TreasureIsland_Locator').TreasureIslandLocator_en : require('./TreasureIsland_Locator').TreasureIslandLocator_vn)
import { expect } from 'chai'

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
  }

  
//Wait until new round
export const waitUtilNewRound = async() => {
    wsMessageReceived = []
    let _found = await utils.getWsMessage('remainingTime":60')
    await utils.sleep(1000)
}

//Check Settlement
export const checkSettlement = async (placebetfunc,args) => {
    await waitUtilNewRound()
    wsMessageReceived.length=0
    // PlaceBet
    await placebetfunc.apply(this,args)
    if (args[4] != 'noauto') {
        console.log('auto spin '+args[4]);
        await utils.sleep(args[4] * 4000) //wait auto spin
        await _clickPos(TreasureIslandLocator.Scatter)
    }
    await utils.sleep(1000)
    // get settle result
       //  if (settle_result.totalfreesprin >0) {
    //     console.log(settle_result);
    //     await utils.sleep(settle_result.totalfreesprin * 2000)
    // }
    let _afbalance = await utils.getBalance()
    let settle_result = await getSettlementResult()
    //check balance
    console.log(_afbalance,settle_result.red);
    await utils.shouldBeEqual((settle_result.red).toFixed(0),_afbalance.toFixed(0), `verify balance`) 
    await _clickPos(TreasureIslandLocator.Scatter)
}

//Check Settlement
export const checkTrialSettlement = async (placebetfunc,args) => {
    let _beforebalance = await utils.getBalance()
    wsMessageReceived.length=0
    // PlaceBet
    await placebetfunc.apply(this,args)
    await utils.sleep(2000)
    // get settle result
    //  if (settle_result.totalfreesprin >0) {
    //     console.log(settle_result);
    //     await utils.sleep(settle_result.totalfreesprin * 3000)
    // }
    let _afbalance = await utils.getBalance()
    //check real balance do not change
    await utils.shouldBeEqual(_beforebalance,_afbalance, `verify balance`) 
    await _clickPos(TreasureIslandLocator.Scatter)
}

//Get Settlement Result
export const getSettlementResult = async () => {
    try {
        let _status = await utils.getRowDataFromJS('TreasureIsland','{"endBet":')
        // let _finish = await utils.getRowDataFromJS('TreasureIsland','roundId') can not get msgpack data
        let _red = await utils.getDataJsonPath(_status,`$..red`)
        let _betstake = await utils.getDataJsonPath(_status,`$..endBet`)
        // let _roundId = await utils.getDataJsonPath(_finish,`$..roundId`)
        // let _result = await utils.getDataJsonPath(_finish,`$..result`)
        // let _settlementResult = await utils.getDataJsonPath(_finish,`$..settlementResult`)
        // let _betWin = await utils.getDataJsonPath(_finish,`$..finish.win`)
        // let _bigWin = await utils.getDataJsonPath(_finish,`$..bigWin`)
        // let _totalfreesprin = await utils.getDataJsonPath(_finish,`$..totalOfFreeSpins`)
        // return {red: _red,betstake: _betstake,roundId: _roundId, result:_result, settlementResult : _settlementResult,betWin: _betWin, bigWin: _bigWin, totalfreesprin: _totalfreesprin}
        return {red: _red,betstake: _betstake}
        } catch (e) {
        console.error(e)
    }
  }

  export const getTrialSettlementResult = async () => {
    try {
        let _status = await utils.getRowDataFromJS('TreasureIsland','{"endBet":')
        let _finish = await utils.getRowDataFromJS('TreasureIsland','{"finish":')
        _status = String(_status).split(`42/trial/treasureisland,`);
        _status = _status[0].length > 1 ? _status[0] : _status[1];
        // _finish = String(_finish).split(`42/trial/treasureisland,`);
        // _finish = _finish[0].length > 1 ? _finish[0] : _finish[1];
        let _red = await utils.getDataJsonPath(_status,`$..balance`)
        let _betstake = await utils.getDataJsonPath(_status,`$..endBet`)
        // let _roundId = await utils.getDataJsonPath(_finish,`$..roundId`)
        // let _result = await utils.getDataJsonPath(_finish,`$..result`)
        // let _betWin = await utils.getDataJsonPath(_finish,`$..finish.win`)
        // let _bigWin = await utils.getDataJsonPath(_finish,`$..bigWin`)
        // let _totalfreesprin = await utils.getDataJsonPath(_finish,`$..totalOfFreeSpins`)
        // return {red: _red,betstake: _betstake,roundId: _roundId, result:_result,betWin: _betWin, bigWin: _bigWin, totalfreesprin: _totalfreesprin}
        return {red: _red,betstake: _betstake}
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
    console.log('click auto spin start'); 
    await _clickPos(TreasureIslandLocator.AutoSpinStart)  
}
//Spin
if (_autospin =='noauto' && _key == 'click') {
    console.log('click spin',_autospin,_key);
await _clickPos(TreasureIslandLocator.Spin)
}
if (_autospin =='noauto' && _key != 'click') {
    console.log('press space',_autospin,_key);
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
    await utils.sleep(3000)
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



