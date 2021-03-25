import { ResultLocator } from './Result_Locator'
import * as config from '../config/config'
import * as utils from '../util/utils'
const chai = require('chai')
const expect = chai.expect

const gameName = {
    Sedie : 'Sedie',
    MiniSedie : 'MiniSeDie'
}
export const verifyGameInDropdownlist = async(_game) =>{
    
    await utils.waitEl(ResultLocator.formSearching.drpGameType + `/option[@value='` + gameName[_game] + `']`,'attached')
}

export const verifyRoundIdIsExistedOnTableResult = async(_roundId) => {
    await utils.waitEl(ResultLocator.tblResult.lblRound+ `[text()='` + _roundId + `]`)
}

export const verifyFormatTime = async() => {
    await utils.waitForLoadState()
    await utils.waitEl(ResultLocator.tblResult.lblTime)
    await utils.shouldBeEqual(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}\n[0-9]{2}\:[0-9]{2} [AP]M/.test(await utils.getText(ResultLocator.tblResult.lblTime)),true, "Time show incorrect format" )
}

export const selectGame = async(_game) =>{
    await verifyGameInDropdownlist(_game)
    await utils.selectDrp(ResultLocator.formSearching.drpGameType,gameName[_game])
}

export const miniSedie = {
    verifyResult = async(_Result) =>{
        
    }
}