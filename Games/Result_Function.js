import { ResultLocator } from './Result_Locator'
import * as config from '../config/config'
import * as utils from '../util/utils'
const chai = require('chai')
const expect = chai.expect

export const verifyGameInDropdownlist = async(_game) =>{
    await utils.waitEl(ResultLocator.formSearching.drpGameType + `/option[@value='` + _game + `']`)
}

export const verifyRoundIdIsExistedOnTableResult = async(_roundId) => {
    await utils.waitEl(ResultLocator.tblResult.lblRound+ `[text()='` + _roundId + `]`)
}

export const verifyFormatTime = async() => {
    let time = await utils.getAttribute(`(`+ ResultLocator.tblResult.lblTime +`)[1]`,'text()')
    console.log(time)
}