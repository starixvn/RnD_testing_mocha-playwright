import { ResultLocator } from './Result_Locator'
import * as config from '../config/config'
import * as utils from '../util/utils'
const chai = require('chai')
const expect = chai.expect

const gameName = {
    Sedie : 'SeDie',
    MiniSedie : 'MiniSeDie',
    VipSedie : 'VipSeDie',
    BigSmall : 'BigSmall',
    BigSmallTurbo : 'BigSmallTurbo',
    OddEven : 'OddEven',
    OddEvenTurbo : 'OddEvenTurbo'

}
export const verifyGameInDropdownlist = async(_game) =>{
    await utils.waitEl(ResultLocator.formSearching.drpGameType + `/option[@value='` + gameName[_game] + `']`,'attached')
}

export const verifyRoundIdIsExistedOnTableResult = async(_roundId) => {
    await utils.waitEl(ResultLocator.tblResult.lblRound+ `[text()='` + _roundId + `']`)
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
const closePage = async() =>{
    await page.close()
    await pages.pop()
    await utils.switchTabs(0)
}
export const miniSedie = {
    verifyResult : async(_Result) =>{
        await selectGame("MiniSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        if(_Result.countRed === 0){
            // Verify 4 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult1,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult2,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult3,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult4,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
        } else if(_Result.countRed === 1){
            // Verify 1 Red 3 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult1,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult2,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult3,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult4,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
        } else if(_Result.countRed === 2){
            // Verify 2 Red 2 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult1,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult2,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult3,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult4,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
        } else if(_Result.countRed === 3){
            // Verify 3 Red 1 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult1,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult2,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult3,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult4,"class",ResultLocator.tblResult.MiniSedie.whiteChip)
        } else if(_Result.countRed === 4){
            // Verify 4 Red
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult1,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult2,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult3,"class",ResultLocator.tblResult.MiniSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.MiniSedie.lblResult4,"class",ResultLocator.tblResult.MiniSedie.redChip)
        }

        // Verify Choice Win
        if(_Result.countRed === 0){
            // Verify 4 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.MiniSedie.lblChoiceWin),ResultLocator.tblResult.MiniSedie.choiceWin.countRed0)
        } else if(_Result.countRed === 1){
            // Verify 1 Red 3 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.MiniSedie.lblChoiceWin),ResultLocator.tblResult.MiniSedie.choiceWin.countRed1)
        } else if(_Result.countRed === 2){
            // Verify 2 Red 2 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.MiniSedie.lblChoiceWin),ResultLocator.tblResult.MiniSedie.choiceWin.countRed2)
        } else if(_Result.countRed === 3){
            // Verify 3 Red 1 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.MiniSedie.lblChoiceWin),ResultLocator.tblResult.MiniSedie.choiceWin.countRed3)
        } else if(_Result.countRed === 4){
            // Verify 4 Red
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.MiniSedie.lblChoiceWin),ResultLocator.tblResult.MiniSedie.choiceWin.countRed4)
        }
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("MiniSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("MiniSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.MiniSedie.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.MiniSedie.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.MiniSedie.lblResult3)
        await utils.waitEl(ResultLocator.tblResult.MiniSedie.lblResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult.MiniSedie.lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("MiniSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const Sedie = {
    verifyResult : async(_Result) =>{
        await selectGame("Sedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        if(_Result.countRed === 0){
            // Verify 4 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult1,"class",ResultLocator.tblResult.Sedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult2,"class",ResultLocator.tblResult.Sedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult3,"class",ResultLocator.tblResult.Sedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult4,"class",ResultLocator.tblResult.Sedie.whiteChip)
        } else if(_Result.countRed === 1){
            // Verify 1 Red 3 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult1,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult2,"class",ResultLocator.tblResult.Sedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult3,"class",ResultLocator.tblResult.Sedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult4,"class",ResultLocator.tblResult.Sedie.whiteChip)
        } else if(_Result.countRed === 2){
            // Verify 2 Red 2 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult1,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult2,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult3,"class",ResultLocator.tblResult.Sedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult4,"class",ResultLocator.tblResult.Sedie.whiteChip)
        } else if(_Result.countRed === 3){
            // Verify 3 Red 1 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult1,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult2,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult3,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult4,"class",ResultLocator.tblResult.Sedie.whiteChip)
        } else if(_Result.countRed === 4){
            // Verify 4 Red
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult1,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult2,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult3,"class",ResultLocator.tblResult.Sedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.Sedie.lblResult4,"class",ResultLocator.tblResult.Sedie.redChip)
        }

        // Verify Choice Win
        if(_Result.countRed === 0){
            // Verify 4 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.Sedie.lblChoiceWin),ResultLocator.tblResult.Sedie.choiceWin.countRed0)
        } else if(_Result.countRed === 1){
            // Verify 1 Red 3 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.Sedie.lblChoiceWin),ResultLocator.tblResult.Sedie.choiceWin.countRed1)
        } else if(_Result.countRed === 2){
            // Verify 2 Red 2 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.Sedie.lblChoiceWin),ResultLocator.tblResult.Sedie.choiceWin.countRed2)
        } else if(_Result.countRed === 3){
            // Verify 3 Red 1 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.Sedie.lblChoiceWin),ResultLocator.tblResult.Sedie.choiceWin.countRed3)
        } else if(_Result.countRed === 4){
            // Verify 4 Red
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.Sedie.lblChoiceWin),ResultLocator.tblResult.Sedie.choiceWin.countRed4)
        }
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("Sedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("Sedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.Sedie.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.Sedie.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.Sedie.lblResult3)
        await utils.waitEl(ResultLocator.tblResult.Sedie.lblResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult.Sedie.lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("Sedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const VipSedie = {
    verifyResult : async(_Result) =>{
        await selectGame("VipSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        if(_Result.countRed === 0){
            // Verify 4 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult1,"class",ResultLocator.tblResult.VipSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult2,"class",ResultLocator.tblResult.VipSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult3,"class",ResultLocator.tblResult.VipSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult4,"class",ResultLocator.tblResult.VipSedie.whiteChip)
        } else if(_Result.countRed === 1){
            // Verify 1 Red 3 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult1,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult2,"class",ResultLocator.tblResult.VipSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult3,"class",ResultLocator.tblResult.VipSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult4,"class",ResultLocator.tblResult.VipSedie.whiteChip)
        } else if(_Result.countRed === 2){
            // Verify 2 Red 2 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult1,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult2,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult3,"class",ResultLocator.tblResult.VipSedie.whiteChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult4,"class",ResultLocator.tblResult.VipSedie.whiteChip)
        } else if(_Result.countRed === 3){
            // Verify 3 Red 1 White
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult1,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult2,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult3,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult4,"class",ResultLocator.tblResult.VipSedie.whiteChip)
        } else if(_Result.countRed === 4){
            // Verify 4 Red
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult1,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult2,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult3,"class",ResultLocator.tblResult.VipSedie.redChip)
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult.VipSedie.lblResult4,"class",ResultLocator.tblResult.VipSedie.redChip)
        }

        // Verify Choice Win
        if(_Result.countRed === 0){
            // Verify 4 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.VipSedie.lblChoiceWin),ResultLocator.tblResult.VipSedie.choiceWin.countRed0)
        } else if(_Result.countRed === 1){
            // Verify 1 Red 3 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.VipSedie.lblChoiceWin),ResultLocator.tblResult.VipSedie.choiceWin.countRed1)
        } else if(_Result.countRed === 2){
            // Verify 2 Red 2 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.VipSedie.lblChoiceWin),ResultLocator.tblResult.VipSedie.choiceWin.countRed2)
        } else if(_Result.countRed === 3){
            // Verify 3 Red 1 White
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.VipSedie.lblChoiceWin),ResultLocator.tblResult.VipSedie.choiceWin.countRed3)
        } else if(_Result.countRed === 4){
            // Verify 4 Red
            await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult.VipSedie.lblChoiceWin),ResultLocator.tblResult.VipSedie.choiceWin.countRed4)
        }
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("VipSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("VipSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.VipSedie.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.VipSedie.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.VipSedie.lblResult3)
        await utils.waitEl(ResultLocator.tblResult.VipSedie.lblResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult.VipSedie.lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("VipSedie")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const BigSmall = {
    verifyResult : async(_Result) =>{
        await selectGame('BigSmall')
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundid)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundid)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmall.lblResult1,"src",`/scss/images/dice_${_Result.result[0].dice1}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmall.lblResult2,"src",`/scss/images/dice_${_Result.result[0].dice2}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmall.lblResult3,"src",`/scss/images/dice_${_Result.result[0].dice3}.png`)
        // Verify Total column
        let _total = _Result.result[0].dice1 + _Result.result[0].dice2 + _Result.result[0].dice3
        await utils.waitEl(`${ResultLocator.tblResult.BigSmall.total}[text()='${_total}']`)
        // Verify Choice Win
        let _choicewin = _Result.choicewin
        await utils.waitEl(`${ResultLocator.tblResult.BigSmall.choicewin}[text()='${_choicewin}']`)
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("BigSmall")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("BigSmall")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.BigSmall.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.BigSmall.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.BigSmall.lblResult3)
   
        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult.BigSmall.choicewin)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("BigSmall")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}


export const BigSmallTurbo = {
    verifyResult : async(_Result) =>{
        await selectGame('BigSmallTurbo')
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundid)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundid)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmallTurbo.lblResult1,"src",`/scss/images/dice_${_Result.result[0].dice1}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmallTurbo.lblResult2,"src",`/scss/images/dice_${_Result.result[0].dice2}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmallTurbo.lblResult3,"src",`/scss/images/dice_${_Result.result[0].dice3}.png`)
        // Verify Total column
        let _total = _Result.result[0].dice1 + _Result.result[0].dice2 + _Result.result[0].dice3
        await utils.waitEl(`${ResultLocator.tblResult.BigSmallTurbo.total}[text()='${_total}']`)
        // Verify Choice Win
        let _choicewin = _Result.choicewin
        await utils.waitEl(`${ResultLocator.tblResult.BigSmallTurbo.choicewin}[text()='${_choicewin}']`)
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("BigSmallTurbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("BigSmallTurbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.BigSmallTurbo.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.BigSmallTurbo.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.BigSmallTurbo.lblResult3)
   
        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult.BigSmallTurbo.choicewin)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("BigSmallTurbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const OddEvenTurbo = {
    verifyResult : async(_Result) =>{
        console.log(_Result)
        await selectGame('OddEvenTurbo')
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundid)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundid)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.OddEvenTurbo.lblResult1,"src",`/scss/images/dice_${_Result.result[0].dice1}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.OddEvenTurbo.lblResult2,"src",`/scss/images/dice_${_Result.result[0].dice2}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.OddEvenTurbo.lblResult3,"src",`/scss/images/dice_${_Result.result[0].dice3}.png`)
        // Verify Total column
        let _total = _Result.result[0].dice1 + _Result.result[0].dice2 + _Result.result[0].dice3
        await utils.waitEl(`${ResultLocator.tblResult.OddEvenTurbo.total}[text()='${_total}']`)
        // Verify Choice Win
        let _choicewin = _Result.choicewin
        await utils.waitEl(`${ResultLocator.tblResult.OddEvenTurbo.choicewin}[text()='${_choicewin}']`)
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("OddEvenTurbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("OddEvenTurbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.OddEvenTurbo.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.OddEvenTurbo.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.OddEvenTurbo.lblResult3)
   
        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult.OddEvenTurbo.choicewin)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("OddEvenTurbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}
