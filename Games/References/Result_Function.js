const ResultLocator = (process.env.npm_config_lang == 'vn' ? require('./Result_Locator').ResultLocator_vn : require('./Result_Locator').ResultLocator_en)
import * as utils from '../../util/utils'

const gameName = {
    Sedie : 'SeDie',
    MiniSedie : 'MiniSeDie',
    VipSedie : 'VipSeDie',
    BigSmall : 'BigSmall',
    BigSmallTurbo : 'BigSmallTurbo',
    OddEven : 'OddEven',
    OddEvenTurbo : 'OddEvenTurbo',
    SedieWar : "SeDieWar",
    BigSmallSicbo : 'SicBo',

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
    verifyResult : async(_Result,game="MiniSedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult1,"class",
            (_Result.countRed >= 1) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult2,"class",
            (_Result.countRed >= 2) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult3,"class",
            (_Result.countRed >= 3) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult4,"class",
            (_Result.countRed === 4) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )

        // Verify Choice Win
        await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult[game].lblChoiceWin),ResultLocator.tblResult[game].choiceWin[_Result.countRed])
        await closePage()
    },
    verifyInvalidRoundID : async(game="MiniSedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async(game="MiniSedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult[game].lblResult1)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult2)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult3)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult[game].lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async(game="MiniSedie")=> {
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const Sedie = {
    verifyResult : async(_Result,game="Sedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult1,"class",
            (_Result.countRed >= 1) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult2,"class",
            (_Result.countRed >= 2) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult3,"class",
            (_Result.countRed >= 3) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult4,"class",
            (_Result.countRed === 4) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )

        // Verify Choice Win
        await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult[game].lblChoiceWin),ResultLocator.tblResult[game].choiceWin[_Result.countRed])
        await closePage()
    },
    verifyInvalidRoundID : async(game="Sedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async(game="Sedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult[game].lblResult1)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult2)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult3)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult[game].lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async(game="Sedie")=> {
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}
export const VipSedie = {
    verifyResult : async(_Result,game="VipSedie")=>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult1,"class",
            (_Result.countRed >= 1) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult2,"class",
            (_Result.countRed >= 2) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult3,"class",
            (_Result.countRed >= 3) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game].lblResult4,"class",
            (_Result.countRed === 4) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )

        // Verify Choice Win
        await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult[game].lblChoiceWin),ResultLocator.tblResult[game].choiceWin[_Result.countRed])
        await closePage()
    },
    verifyInvalidRoundID : async(game="VipSedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async(game="VipSedie") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult[game].lblResult1)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult2)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult3)
        await utils.waitEl(ResultLocator.tblResult[game].lblResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult[game].lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async(game="VipSedie")=> {
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const BigSmall = {
    verifyResult : async(_Result) =>{
        await selectGame('BigSmall')
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
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
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
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
        await selectGame('OddEvenTurbo')
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
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

export const SedieWar = {
    verifyResult : async(_Result,game="SedieWar")=>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        let tmp = [ "Player", "Banker"]
        // Verify Result Player/ Banker column
        for(let i=0;i<tmp.length;i++){
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game][`lbl${tmp[i]}Result1`],"class",
                (_Result[`${tmp[i]}Red`] >= 1) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game][`lbl${tmp[i]}Result2`],"class",
                (_Result[`${tmp[i]}Red`] >= 2) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game][`lbl${tmp[i]}Result3`],"class",
                (_Result[`${tmp[i]}Red`] >= 3) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
            await utils.isValueEqualOnAttribute(ResultLocator.tblResult[game][`lbl${tmp[i]}Result4`],"class",
                (_Result[`${tmp[i]}Red`] === 4) ? ResultLocator.tblResult[game].redChip : ResultLocator.tblResult[game].whiteChip )
        }

        // Prepare result
        let rs = ""
        if (_Result.PlayerRed > _Result.BankerRed) { rs = ResultLocator.tblResult[game].choiceWin.optionWin[0] }
        else if (_Result.PlayerRed < _Result.BankerRed) { rs = ResultLocator.tblResult[game].choiceWin.optionWin[1] }
        else { rs = ResultLocator.tblResult[game].choiceWin.optionWin[2] }
        rs = ((_Result.PlayerRed+_Result.BankerRed) % 2 === 0) ? rs + ", " +  ResultLocator.tblResult[game].choiceWin.totalWin[0] : rs + ", " +  ResultLocator.tblResult[game].choiceWin.totalWin[1]
        rs = rs + "\n" + ResultLocator.tblResult[game].choiceWin.player[_Result.PlayerRed][0] + ", " + ResultLocator.tblResult[game].choiceWin.banker[_Result.BankerRed][0]
        if(_Result.PlayerRed === 2 && _Result.BankerRed === 2) { rs = rs + "\n"}
        else if(_Result.PlayerRed === 2) { rs = rs + "\n" + ResultLocator.tblResult[game].choiceWin.banker[_Result.BankerRed][1]}
        else if(_Result.BankerRed === 2) { rs = rs + "\n" + ResultLocator.tblResult[game].choiceWin.player[_Result.PlayerRed][1]}
        else {
            rs = rs + "\n" + ResultLocator.tblResult[game].choiceWin.player[_Result.PlayerRed][1]
                + ", " + ResultLocator.tblResult[game].choiceWin.banker[_Result.BankerRed][1]
        }
        // Verify Choice Win
        await utils.shouldBeEqual(await utils.getText(ResultLocator.tblResult[game].lblChoiceWin),rs + "\n")
        await closePage()
    },
    verifyInvalidRoundID : async(game="SedieWar") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async(game="SedieWar") =>{
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult[game].lblPlayerResult1)
        await utils.waitEl(ResultLocator.tblResult[game].lblPlayerResult2)
        await utils.waitEl(ResultLocator.tblResult[game].lblPlayerResult3)
        await utils.waitEl(ResultLocator.tblResult[game].lblPlayerResult4)
        
        await utils.waitEl(ResultLocator.tblResult[game].lblBankerResult1)
        await utils.waitEl(ResultLocator.tblResult[game].lblBankerResult2)
        await utils.waitEl(ResultLocator.tblResult[game].lblBankerResult3)
        await utils.waitEl(ResultLocator.tblResult[game].lblBankerResult4)

        // Verify ChoiceWin Column
        await utils.waitEl(ResultLocator.tblResult[game].lblChoiceWin)
        await closePage()
    },
    verifyArchivedRoundID : async(game="SedieWar")=> {
        await selectGame(game)
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}

export const BigSmallSicbo = {
    verifyResult : async(_Result) =>{
        await selectGame('BigSmallSicbo')
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,_Result.roundId)
        await utils.clickEl(ResultLocator.btnSearch)
        // Verify Date column
        await verifyFormatTime()
        // Verify RoundID
        await verifyRoundIdIsExistedOnTableResult(_Result.roundId)
        // Verify Result column
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmallSicbo.lblResult1,"src",`/scss/images/sicbo_dice_${_Result.result.dice1}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmallSicbo.lblResult2,"src",`/scss/images/sicbo_dice_${_Result.result.dice2}.png`)
        await utils.isValueEqualOnAttribute(ResultLocator.tblResult.BigSmallSicbo.lblResult3,"src",`/scss/images/sicbo_dice_${_Result.result.dice3}.png`)
        // Verify Total column
        let _total = _Result.result.dice1 + _Result.result.dice2 + _Result.result.dice3
        await utils.waitEl(`${ResultLocator.tblResult.BigSmallSicbo.total}[text()='${_total}']`)
        await closePage()
    },
    verifyInvalidRoundID : async() =>{
        await selectGame("BigSmallSicbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,-1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    },
    verifyRoundID0 : async() =>{
        await selectGame("BigSmallSicbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,0)
        await utils.clickEl(ResultLocator.btnSearch)

        // Verify Date column
        await verifyFormatTime()
        
        // Verify Round column
        await utils.waitEl(ResultLocator.tblResult.lblRound)

        // Verify Result Column
        await utils.waitEl(ResultLocator.tblResult.BigSmallSicbo.lblResult1)
        await utils.waitEl(ResultLocator.tblResult.BigSmallSicbo.lblResult2)
        await utils.waitEl(ResultLocator.tblResult.BigSmallSicbo.lblResult3)
        await closePage()
    },
    verifyArchivedRoundID : async()=> {
        await selectGame("BigSmallSicbo")
        await utils.sendKeys(ResultLocator.formSearching.txtRoundID,1)
        await utils.clickEl(ResultLocator.btnSearch)
        await utils.waitEl(ResultLocator.lblNodata)
        await closePage()
    }
}
