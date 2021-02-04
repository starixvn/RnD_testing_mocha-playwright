import * as config from './../config/config'
import pixelmatch from 'pixelmatch'
import * as MemberSitePage from '../Games/MemberSite_Page'
import * as GameLobbyPage from '../Games/GameLobby_Page'
const fs = require('fs')
const { createWorker } = require('tesseract.js')
const path = require('path')
const chai = require('chai')
const expect = chai.expect
const PNG = require('pngjs').PNG


// Verify Message is existed
export const FindMessage = async(_mes) => {
    try {
        for(let i = 0; i < wsMessageReceived.length ; i++){
            // console.log(wsMessageReceived[i])
            if(wsMessageReceived[i].includes(_mes)) return true
        }
        return false
    } catch (error) {
        return false
    }
}

export const wsFindMessage = async(_mes) => {
    try {
        let result
        for(let t = 0 ; t< config.setting.loop ; t++){
            if(typeof wsMessageReceived !== 'undefined'){
                // console.log(wsMessageReceived)
                result = await FindMessage(_mes)
                if( result === true ) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
                await page.waitForTimeout(1000)
            }
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    } 
}
// Check FreeSpin is existed
export const isFreeSpin = async() => {
    try {
        for(let t = 0 ; t< config.setting.loop ; t++){
            if(typeof wsMessageReceived !== 'undefined'){
                for(let i = 0; i < wsMessageReceived.length ; i++){
                    if(wsMessageReceived[i].includes('Authorized')) {
                        let chk = JSON.parse(wsMessageReceived[i])
                        if(typeof chk.user.availSpins === 'undefined' ) return false
                        else if(chk.user.availSpins != 0) return true
                        else return false
                    }
                }
            }
            await sleep(1000)
        }
        return false
    } catch (error) {
        console.log('Error '+error.message)
        return false
    }
}


// Go to Page
export const navigate = async(_url) => {
    try {
        await page.goto(_url, { timeout : config.setting.timeout})
        await page.waitForTimeout(500)
    } catch (error) {
        console.error(error.message)
    }
}


// Wait Page Load
export const waitForLoadState = async() => {
    try {
        await page.waitForLoadState('load', { timeout : config.setting.timeout })
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}
// Wait Element 
export const waitEl = async() => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout})
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}
// Click Element
export const clickEl = async(_el) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        await page.click(_el)
        await page.waitForTimeout(500)
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}

// Click Position
export const clickPos = async(_x, _y) => {
    try {
        await page.mouse.click(_x,_y)
        await page.waitForTimeout(500)
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}

// Send message to Element
export const sendKeys = async(_el, _val) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        await page.fill(_el, _val)
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
    }
}

// Get value of Attribute
export const getAttribute = async(_el, _val) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        return await page.getAttribute(_el, _val, { timeout : config.setting.timeout })
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
    }
}

// Verify value of Attribute is not equal strCompare
export const isValueNotEqualOnAttribute = async(_el, _val, _strCompare) => {
    try {
        let loop = true;
        while(loop){
            if((await getAttribute(_el, _val)).toString() != _strCompare) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, setting.timeout);
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// Verify Title
export const verifyTitle = async(_title) => {
    try {
        await waitForLoadState()
        let _act_title = await page.title()
        if(_act_title == _title) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    }  catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// Select Dropdown List
export const selectDrp = async(_el, _val) => {
    try {
        await page.waitForSelector(
            _el, { state: 'attached'}
        )
        await page.selectOption(_el, { value : _val })
    }  catch (error) {
        console.log('Error '+error.message)
    }
}

// Clear Log Message
export const clearLog = async() =>{
    wsFindMessage = []
}

// ScreenShot
export const screenShotFailed = async() => {
    try {
        await page.screenshot({ path: 'ScreenShot'+ path.sep +'Failed_Screen.png', type : "png" })
    }  catch (error) {
        console.log('Error '+error.message)
    }
}
export const screenShot = async(_title) => {
    try {
        await page.screenshot({ path: 'ScreenShot'+ path.sep +_title+'.png', type : "png" })
    } catch (error) {
        console.log('Error '+error.message)
    }
}

export const sleep = async(_milliseconds) => {
    try {
        await page.waitForTimeout(_milliseconds)
    } catch (error) {
        console.log('Error '+error.message)
    }
}

// Find Image
export const readImageData = async(_path) => {
    try {
        return PNG.sync.read(fs.readFileSync(_path))
    } catch (error) {
        console.log('Error '+error.message)
    }
}
export const CaptureSubImageToFile = async(_x, _y , _w, _h,_path) => {
    try {
        return (await page.screenshot({path: _path , clip : {x: _x, y: _y, width: _w, height : _h} }))
    } catch (error) {
        console.log('Error '+error.message)
    } 
}
export const findImage = async(_subimage, _x, _y, _w, _h) => {
    /* Test Comment*/
    try {
        let flag=null
        let si = readImageData(_subimage)
        let sc
        let diff = new PNG({_w, _h});
        let loop =true;
        while(loop){
            sc = PNG.sync.read(await page.screenshot({ clip : {x: _x, y: _y, width: _w, height : _h} }))
            flag = pixelmatch((await si).data,sc.data, diff.data, _w, _h, { threshold : 0.15 })
            // console.log(Date.now())
            console.log('a_pixeldiff:'+flag.toString())
            console.log('e_pixelmatch'+(_w*_h*0.07).toString())
            if(flag<(_w*_h*0.07)) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, config.setting.timeout);
            // fs.writeFileSync('diff.png', PNG.sync.write(diff));
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// parse text from image
export const getTextFromImage = async(_path) => {
    try {
        const worker = createWorker()
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(_path);
        // console.log(text)
        await worker.terminate();
        return text
    } catch (error) {
        console.log('Error '+error.message)
    }
}
// Parse text to Number
export const parseNumber = async(_text) => {
    try {
        let txtNum = _text.replace(/\,/g,'').replace(/\./g,',')
        return parseFloat(txtNum)
    } catch (error) {
        console.log('Error '+error.message)
    }
}
// swipe to left ( y < 0 ) or right ( y >0 )
export const swipe = async(_y) => {
    // try {
        // await dispatchTouch(client, 'touchStart', [{ x: config.setting.viewport.width/2 , y: config.setting.viewport.height/2}]);
        // await dispatchTouch(client, 'touchMove', [{ x: config.setting.viewport.width/2, y: config.setting.viewport.height/2 + _y }]);
        // await dispatchTouch(client, 'touchEnd', []);
        await page.mouse.move(config.setting.viewport.width/2, config.setting.viewport.height/2)
        await page.mouse.down();
        await sleep(500)
        await page.mouse.move(config.setting.viewport.width/2, config.setting.viewport.height/2 + _y)
        await sleep(500)
        await page.mouse.up()
    // } catch (error) {
    //     console.log('Error '+error.message)
    // }
}

// Place bet until get message
export const verifyWsMessageForBetProcess = async(_mes) => {
    try {
        let result
        for(let t = 0 ; t< 4 ; t++){
            if(typeof wsMessageReceived !== 'undefined'){
                if( await FindMessage(_mes) === true ) {
                    return true
                }
                else if(await FindMessage('endBet') === true && result === false) {
                    return false
                }
            }
            await page.waitForTimeout(500)
        }
        return false
    }  catch (error) {
        console.log('Error '+error.message)
        return false
    }
}
export const betProcess = async(_x,_y,_mes) => {
    try{
        let flag
        for(let t = 0; t< config.setting.loop; t++){
            await clickPos(_x,_y)
            if(await verifyWsMessageForBetProcess(_mes) === true) {
                return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            }
            await page.waitForTimeout(1000)
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}


// Check Websocket Mesage
export const wshear = async(ws) =>{
    if(isHear ===true) {
        ws.on('framereceived', async msg => {
            if(isHear ===true) {
                wsMessageReceived.push(msg.payload)
            } else { wsMessageReceived = [] }
        });
    }
}

// Open Listener Websocket Message
export const wsHearMessageOn = async() => {
    isHear = true
    page.on('websocket', async ws => wshear(ws))
    
}

// Off Listener Websocket Message
export const wsHearMessageOff = async() => {
    isHear = false
}


// Login
export const Login = async() => {
    await wsHearMessageOff()
    let flag
    if(env != 'cf_local') {
        // Login Member Site
        await MemberSitePage.login()
        // Navigate Sabaclub
        await navigate(config[env].gamelobbyurl)
    } else {
        // Navigate Sabaclub from Simulator
        await MemberSitePage.login_local()
    }

    // Verify go to Game Lobby Successfully
    flag = await GameLobbyPage.verifyLoginSuccessfully()
    expect(flag.Val,"Fail on Login GameLobby").to.be.true
}
