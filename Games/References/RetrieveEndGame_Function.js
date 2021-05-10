import * as utils from '../util/utils'
import {RetrieveEndGameLocator} from './RetrieveEndGame_Locator'
import * as config from './../config/config'

export const navigateRetrieveEndGame = async()=>{
    await utils.navigate(config[env].retrieveEndGame)
    await utils.waitForLoadState()
    await utils.waitEl(RetrieveEndGameLocator.btnSubmit)
}

export const verifyRetrieveEndGame = async(_game,_result)=>{

    // Input GameRound Id
    await utils.sendKeys(RetrieveEndGameLocator.txtRoundId,_result.roundId)

    // Input GameType Id
    await utils.sendKeys(RetrieveEndGameLocator.txtGameTypeId,utils.gameType[_game].Id)

    // Input SiteId (hardcode 4100300)
    await utils.sendKeys(RetrieveEndGameLocator.txtSiteId,4100300)

    // Input MemberId
    await utils.sendKeys(RetrieveEndGameLocator.txtObCustId, await utils.getMemberId())

    // Submit button 
    await utils.clickEl(RetrieveEndGameLocator.btnSubmit)

    // Get Result
    let rawResult = await utils.getText(RetrieveEndGameLocator.lblResult)
    // Verify timestamp
    await utils.shouldBeEqual(new Date()-new Date(await utils.getDataJsonPath(rawResult,"$.timeStamp")) < 10000,true)
    // Verify totalAmount
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..totalAmount"),_result.stake)
    // Verify totalWin
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..totalWin"),_result.betwin)
    // Verify validBetAmount
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..validBetAmount"),_result.stake)
    // Verify end Time
    await utils.shouldBeEqual(Math.abs(new Date(await utils.getDataJsonPath(rawResult,"$..endTime"))-new Date(_result.time)) < 60000,true)
    // Verify errorCode
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..errorCode"),"0")
    // Verify errorDescription
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..errorDescription"),null)
}


export const verifyArchivedRoundId = async(_game)=>{
    // Input Round Id
    await utils.sendKeys(RetrieveEndGameLocator.txtRoundId,1)
    // Input GameType Id
    await utils.sendKeys(RetrieveEndGameLocator.txtGameTypeId,utils.gameType[_game].Id)
    // Input SiteId (hardcode 4100300)
    await utils.sendKeys(RetrieveEndGameLocator.txtSiteId,4100300)
    // Input MemberId
    await utils.sendKeys(RetrieveEndGameLocator.txtObCustId, await utils.getMemberId())
    // Submit button 
    await utils.clickEl(RetrieveEndGameLocator.btnSubmit)
   /* Expected: errorCode=SB1001
                errorMsg=Game round does not exist.
                totalAmount=0
                totalWin=0
                validBetAmount=0
                endTime=null */
    // Get Result
    let rawResult = await utils.getText(RetrieveEndGameLocator.lblResult)
    // Verify totalAmount
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..totalAmount"),0)
    // Verify totalWin
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..totalWin"),0)
    // Verify validBetAmount
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..validBetAmount"),0)
    // Verify end Time
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..endTime"),null)
    // Verify errorCode
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..errorCode"),'SB1001')
    // Verify errorDescription
    await utils.shouldBeEqual(await utils.getDataJsonPath(rawResult,"$..errorDescription"),'The game round does not exist.')
}
