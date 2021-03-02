import * as utils from '../../util/utils'
import {GameLobbyLocator} from '../GameLobby_Locator'
import {SedieLocator} from './Sedie_Locator'
import * as config from '../../config/config'
const chai = require('chai')
const expect = chai.expect

export const OpenFromLobby = async() => {
    try {
        await utils.sleep(1000)
        await utils.clickPos(GameLobbyLocator.SedieIcon.x, GameLobbyLocator.SedieIcon.y)
        await utils.sleep(1000)
    } catch (error) {
        console.log(error.message)
    }
}

export const verifySignInSuccessfully = async() => {
    try {
        let _result = await utils.wsFindMessage('42/user/xocxoc,["message",{"toGame":"XocXoc"}]')
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error.message)
    }
}


export const verifyBetChoice = async() => {
    try {
        let _result = await utils.findImage(SedieLocator.Even.ImageCompare,
            SedieLocator.Even.left, SedieLocator.Even.top, SedieLocator.Even.width, SedieLocator.Even.height)
        expect(_result.Val).to.equal(true)
        _result = await utils.findImage(SedieLocator.Odd.ImageCompare,
            SedieLocator.Odd.left, SedieLocator.Odd.top, SedieLocator.Odd.width, SedieLocator.Odd.height)
        expect(_result.Val).to.equal(true)
        _result = await utils.findImage(SedieLocator.Red4.ImageCompare,
            SedieLocator.Red4.left, SedieLocator.Red4.top, SedieLocator.Red4.width, SedieLocator.Red4.height)
        expect(_result.Val).to.equal(true)
        _result = await utils.findImage(SedieLocator.Red3.ImageCompare,
            SedieLocator.Red3.left, SedieLocator.Red3.top, SedieLocator.Red3.width, SedieLocator.Red3.height)
        expect(_result.Val).to.equal(true)
        _result = await utils.findImage(SedieLocator.Red2.ImageCompare,
            SedieLocator.Red2.left, SedieLocator.Red2.top, SedieLocator.Red2.width, SedieLocator.Red2.height)
        expect(_result.Val).to.equal(true)
        _result = await utils.findImage(SedieLocator.White3.ImageCompare,
            SedieLocator.White3.left, SedieLocator.White3.top, SedieLocator.White3.width, SedieLocator.White3.height)
        expect(_result.Val).to.equal(true)
        _result = await utils.findImage(SedieLocator.White4.ImageCompare,
            SedieLocator.White4.left, SedieLocator.White4.top, SedieLocator.White4.width, SedieLocator.White4.height)
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error.message)
    }
}
export const selectChip= async(_chip=1)=>{
    try {
        const _chipbar1 = [1,5,10,50,100]
        const _chipbar2 = [200,500,1000,2000]
        if (_chipbar2.includes(_chip) === true){
            await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,0,SedieLocator.ChipBroad.y)
            await utils.sleep(1000)
        }
        else if (_chipbar1.includes(_chip) === true){}
    } catch (error) {
        console.log(error.message)
    }
}
export const placeBet = async(_choice,_chip=1) => {
    try {
        selectChip(_chip)
        await utils.clickPos(SedieLocator[`Chip${_chip}`].x,SedieLocator[`Chip${_chip}`].y)  
        let lowcase = _choice.toLowerCase()
        let _result = await utils.betProcess(SedieLocator[`${_choice}`].x,SedieLocator[`${_choice}`].y,`user/xocxoc,["XocXoc",{"ownBets":{"${lowcase}":${_chip}},"endBet":${_chip},`)
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error.message)
    }
}

const resetChipbroad = async()=> {
    try {
        await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,SedieLocator.ChipBroad.x+500,SedieLocator.ChipBroad.y)
        await utils.sleep(1000)
        await utils.clickPos(SedieLocator.Chip1.x,SedieLocator.Chip1.y)  
    } catch (error) {
        console.log(error.message)
    }
}

export const verifyBetChip = async() => {
    try {
        await resetChipbroad()
        // // Using for Capture ScreenShot
        // await utils.CaptureSubImageToFile(SedieLocator.ChipBroad.ImageCompare1,
        //     SedieLocator.ChipBroad.left, SedieLocator.ChipBroad.top, SedieLocator.ChipBroad.width, SedieLocator.ChipBroad.height)
        // await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,0,SedieLocator.ChipBroad.y)
        // await utils.sleep(3000)
        // await utils.CaptureSubImageToFile(SedieLocator.ChipBroad.ImageCompare2,
        //     SedieLocator.ChipBroad.left, SedieLocator.ChipBroad.top, SedieLocator.ChipBroad.width, SedieLocator.ChipBroad.height)
        // End
        let _result = await utils.findImage(SedieLocator.ChipBroad.ImageCompare1,
            SedieLocator.ChipBroad.left, SedieLocator.ChipBroad.top, SedieLocator.ChipBroad.width, SedieLocator.ChipBroad.height)
        expect(_result.Val).to.equal(true)
        await utils.swipe(SedieLocator.ChipBroad.x,SedieLocator.ChipBroad.y,0,SedieLocator.ChipBroad.y)
        await utils.sleep(1000)
        _result = await utils.findImage(SedieLocator.ChipBroad.ImageCompare2,
            SedieLocator.ChipBroad.left, SedieLocator.ChipBroad.top, SedieLocator.ChipBroad.width, SedieLocator.ChipBroad.height)
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error.message)
    }
}

export const verifyBetAtBlockBettingTime = async() => {
    try {
        let _result = await utils.betProcess(SedieLocator.Even.x,SedieLocator.Even.y,`42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`)
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error.message)
    }
}

export const verifyBetAtSettlementTime = async()=> {
    try {
        wsMessageReceived = []
        await utils.wsFindMessage(`42/user/xocxoc,["XocXoc",{"remainingTime":39}]`)
        let _result = await utils.betProcess(SedieLocator.Even.x,SedieLocator.Even.y,`42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`)
        expect(_result.Val).to.equal(true)
    } catch (error) {
        console.log(error.message)
    }
}

export const verifyMaxBet = async(_choice) =>{
    try {
        if (_choice === `Round`){
            // Wait to Finish Game
            wsMessageReceived = []
            await utils.wsFindMessage(`42/user/xocxoc,["XocXoc",{"remainingTime":39}]`)
            // Wait to new round
            await utils.sleep(9000)
            await placeBet("Even")
            await selectChip(2000)
            await utils.betProcess(SedieLocator.Odd.x, SedieLocator.Odd.y, `42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Tổng tiền cược tối đa ở phiên này là 2,000"}]`)
        }
        else if (_choice === `Red4` || _choice === `White`){
            await selectChip(500)
            await utils.betProcess(SedieLocator[`${_choice}`].x, SedieLocator[`${_choice}`].y, `42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 500"}]`)
        } else {
            await selectChip(2000)
            await utils.betProcess(SedieLocator[`${_choice}`].x, SedieLocator[`${_choice}`].y, `42/user/xocxoc,["XocXoc",{"endBet":-1,"notice":"Tiền cược tối đa ở cửa này là 2,000"}]`)
        }
    } catch (error) {
        console.log(error.message)
    }
}
export const getBalance = async() => {
    try {
        await utils.CaptureSubImageToFile(SedieLocator.Balance.ImageCompare,
            SedieLocator.Balance.left, SedieLocator.Balance.top, SedieLocator.Balance.width, SedieLocator.Balance.height)
            
        await utils.sleep(1000)
        // Get Text From Image
        let _txtNum = await utils.getTextFromImage(SedieLocator.Balance.ImageCompare)
        // Convert Text To Number
        return await utils.parseNumber(_txtNum)
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const getRawData = async(_mes) => {
    try {
        let raw = await utils.getWsMessage(_mes)
        if(raw === null) return null
        else {
            raw = raw.split("42/user/xocxoc,");
            return raw[1]
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export const verifySettlement = async(_choice,_chip) => {
    try {
        let countRed = 0, currentBalance, lowcase, finishRound, result, status, winningByChoice
        currentBalance = await getBalance()
        console.log(currentBalance.toString())
        lowcase = _choice.toLowerCase()
        wsMessageReceived = []
        await placeBet(_choice,_chip)
        finishRound = await getRawData(`42/user/xocxoc,["XocXoc",{"finish":{"result"`)
        result = await utils.getDataJsonPath(finishRound,`$..finish.result`)
        for(let i=1; i<5 ; i++){
            if (result[0][`red${i}`] === true) {
                countRed = countRed +1
            }
        }
        // Check on Websocket
        status = await getRawData(`42/user/xocxoc,["XocXoc",{"status":{"winningByChoices":`)
        winningByChoice = await utils.getDataJsonPath(status,`$..status.winningByChoices`)
        console.log(result)
        console.log(countRed)
    } catch (error) {
        console.log(error.message)
    }
}