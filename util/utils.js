import * as config from './../config/config'
import pixelmatch from 'pixelmatch'
import * as MemberSiteFunc from '../Games/MemberSite_Function'
import * as GameLobbyFunc from '../Games/GameLobby_Function'
import * as Mongodb from 'mongodb'
const W3CWebSocket = require('websocket').w3cwebsocket;
const fs = require('fs')
const { createWorker } = require('tesseract.js')
const path = require('path')
const PNG = require('pngjs').PNG
const jp = require('jsonpath')
const sharp = require('sharp')
sharp.cache({ files : 0 });
let username=null,session=null,name=null


// Verify Message is existed
const FindMessage = async(_mes) => {
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
const getMessage = async(_mes) => {
    try {
        if(typeof wsMessageReceived !== 'undefined'){
            const _found = wsMessageReceived.filter(element => element.includes(_mes));
            // console.log(_found)
            if(_found.length !== 0) return _found.pop();
        }
        return null
    } catch (error) {
        return null
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
                await sleep(1000)
            }
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    } 
}
export const getWsMessage = async(_mes) => {
    try {
        let result
        for(let t = 0 ; t< config.setting.loop ; t++){
                // console.log(wsMessageReceived)
                result = await getMessage(_mes)
                if(result !== null ) return result
                await sleep(1000)
            }
        return null
    } catch (error) {
        console.log(error.message)
        return null
    } 
}

// Wait for wsmsg
export const wsWaitMessage = async(_mes)=> {
    try {
        for(let t =0 ; t < config.setting.loop ; t++){
            let _found = wsMessageReceived.filter(element => element.includes(_mes));
            if (_found.length > 0) {
                break
                }
            else{ 
                await sleep(1000) 
                }
            }             
        }
        catch (error){
            console.log('Error '+error.message)
        }
    
    }
   


// Go to Page
export const navigate = async(_url) => {
    try {
        await page.goto(_url, { timeout : config.setting.timeout})
        await page.waitForTimeout(500)
    } catch (error) {
        console.error(error.message)
        await shouldBeEqual(true,false,"Timeout - navigate this page")
    }
}


// Wait Page Load
export const waitForLoadState = async() => {
    try {
        await page.waitForLoadState('load', { timeout : config.setting.timeout })
     } catch (error) {
        console.error(error.message);
        // this.screenFail()
        await shouldBeEqual(true,false,"Timeout - wait for load event to be fired")
     }
}
// Wait Element 
export const waitEl = async(_el,_state='visible') => {
    try {
        await page.waitForSelector( _el, { timeout : config.setting.timeout, state : _state})
     } catch (error) {
        console.error(error.message);
        // this.screenFail()
        await shouldBeEqual(true,false,"Timeout - wait for Selector can be visible")
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
        await shouldBeEqual(true,false,"Error - click Element")
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
        await shouldBeEqual(true,false,"Error - click Position")
     }
}

// Send message to Element
export const sendKeys = async(_el, _val) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        await page.fill(_el, _val.toString())
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
        await shouldBeEqual(true,false,"Error - send keys")
    }
}

// Get Text
export const getText = async(_el) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        return await page.innerText(_el)
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
        await shouldBeEqual(true,false,"Error - get Text")
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
        await shouldBeEqual(true,false,"Error - get Attribute")
    }
}
// Verify text is not equal strCompare
export const isTextNotEqualOnElement = async(_el, _strCompare) => {
    try {
        let loop = true;
        while(loop){
            if(await getText(_el) != _strCompare) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, config.setting.timeout);
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
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
              }, config.setting.timeout);
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// Verify value of Attribute is equal strCompare
export const isValueEqualOnAttribute = async(_el, _val, _strCompare) => {
    try {
        let loop = true;
        while(loop){
            if((await getAttribute(_el, _val)).toString() === _strCompare) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, config.setting.timeout);
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
        await shouldBeEqual(true,false,"Error - select item on dropdown list")
    }
}

// Switch tab
export const switchTabs = async(_index) => {
    try {
        await page.waitForTimeout();
        page = await pages[_index]
        await page.bringToFront()
    } catch (error) {
        console.log('Error '+error.message)
        await shouldBeEqual(true,false,"Error - switch Tab")
    }
}

// Clear Log Message
export const clearLog = async() =>{
    wsFindMessage = []
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
export const CaptureSubImageToFile = async(_path,_x, _y , _w, _h) => {
    try {
        return (await page.screenshot({path: _path , clip : {x: _x, y: _y, width: _w, height : _h} }))
    } catch (error) {
        console.log('Error '+error.message)
    } 
}
export const findImage = async(_subimage, _x=null, _y=null, _w=null, _h=null) => {
    /* Test Comment*/
    try {
        if(typeof _subimage === 'object'){
            _x = _subimage.left
            _y = _subimage.top
            _w = _subimage.width
            _h = _subimage.height
            _subimage = _subimage.ImageCompare
        } else if(isNaN(_x) === false){}
        else {
            _y = _x.top
            _w = _x.width
            _h = _x.height
            _x = _x.left
        }
        let flag=null
        let si = readImageData(_subimage)
        let sc
        let diff = new PNG({_w, _h});
        let loop =true;
        while(loop){
            sc = PNG.sync.read(await page.screenshot({ clip : {x: _x, y: _y, width: _w, height : _h} }))
            flag = pixelmatch((await si).data,sc.data, diff.data, _w, _h, { threshold : 0.15 })
            // console.log(Date.now())
            // console.log('a_pixeldiff:'+flag.toString())
            // console.log('e_pixelmatch'+(_w*_h*0.07).toString())
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

export const imageShouldNotDisplay = async(_subimage, _x=null, _y=null, _w=null, _h=null) => {
    /* Test Comment*/
    try {
        if(typeof _subimage === 'object'){
            _x = _subimage.left
            _y = _subimage.top
            _w = _subimage.width
            _h = _subimage.height
            _subimage = _subimage.ImageCompare
        } else if(isNaN(_x) === false){}
        else {
            _y = _x.top
            _w = _x.width
            _h = _x.height
            _x = _x.left
        }
        let flag=null
        let si = readImageData(_subimage)
        let sc
        let diff = new PNG({_w, _h});
        let loop =true;

        while(loop){
            sc = PNG.sync.read(await page.screenshot({ clip : {x: _x, y: _y, width: _w, height : _h} }))
            flag = pixelmatch((await si).data,sc.data, diff.data, _w, _h, { threshold : 0.15 })
            // console.log(Date.now())
            // console.log('a_pixeldiff:'+flag.toString())
            // console.log('e_pixelmatch'+(_w*_h*0.6).toString())
            if(flag>(_w*_h*0.6)) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, 30);
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

        let txtNum = _text.replace(/[\$US]/g,'').replace(/\,/g,'').replace(/\.([0-9]{3})/g,'$1').trim()
        // console.log('parse: '+txtNum)
        return parseFloat(txtNum)
    } catch (error) {
        console.log('Error '+error.message)
    }
}

// swipe to left ( y < 0 ) or right ( y >0 )
export const swipe = async(__fx, _fy,__tx, _ty,) => {
    try {
        await page.mouse.move(__fx,  _fy)
        await page.mouse.down();
        await sleep(500)
        await page.mouse.move(__tx,  _ty)
        await sleep(1000)
        await page.mouse.up()
    } catch (error) {
        console.log('Error '+error.message)
    }
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

// Off Listener Websocket Message
export const shouldBeEqual = async(_val,_expect,_mess="") => {
    global.expect(_val,_mess).to.equal(_expect) 
}


// Login
export const Login = async(_env,_game) => {
    // await wsHearMessageOff()
    let flag
    if(_env !== 'cf_local' && _env !== 'cf_local1') {
        // Login Member Site
        await MemberSiteFunc.login(_env,_game)
        // Navigate Sabaclub
        await navigate(page.url().toString().replace(/\/[Ss]ports/g,'')+config[_env].gamelobbyurl)
    } else {
        // Navigate Sabaclub from Simulator
        await MemberSiteFunc.login_local(_env,_game)
    }
    // Verify go to Game Lobby Successfully
    flag = await GameLobbyFunc.verifyLoginSuccessfully()
    await getSession()
        // console.log(flag)
    expect(flag.Val,"Fail on Login GameLobby").to.be.true
}

export const getDataJsonPath = async(_rawData, _jsonpath) => {
    return jp.value(JSON.parse(_rawData),_jsonpath)
}

// Get Keys of Object By Value
export const getKeysByValue = async(object, value) => {
    return Object.keys(object).filter(key => object[key] === value);
}

export const getUIBalance = async(_path,_left=null, _top=null, _width=null, _height=null) => {
    try {
        if(typeof _path === 'object') {
            _left = _path.left
            _top = _path.top
            _width = _path.width
            _height = _path.height
            _path = _path.ImageCompare
        } else if(isNaN(_left) === false){}
        else {
            _top = _x.top
            _width = _x.width
            _height = _x.height
            _left = _x.left
        }
        await CaptureSubImageToFile(_path,_left, _top, _width, _height)
        await sleep(1000)
        await sharp(_path).resize(parseInt(_width),parseInt(_height)).toFile(_path+"_1")
        await sleep(1000)
        let _txtNum = await parseNumber(await getTextFromImage(_path+"_1"))
        // console.log(_txtNum)
        for(let t = 1; t<= config.setting.loop/4; t++){
            if(isNaN(_txtNum) !== true) {
                fs.unlinkSync(_path)
                fs.unlinkSync(_path+"_1")
                return _txtNum
            }
            fs.unlinkSync(_path)
            fs.unlinkSync(_path+"_1")
            await CaptureSubImageToFile(_path,_left, _top, _width, _height)
            await sleep(1000)
            await sharp(_path).resize(parseInt(_width*(1+(t*0.5))),parseInt(_height*(1+(t*0.5)))).toFile(_path+"_1")
            await sleep(1000)
            _txtNum = await parseNumber(await getTextFromImage(_path+"_1"))
            // console.log(_txtNum)
        }
        return null
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export const getBalance = async()=>{
    const client = new wsClient(config[env].urlWebsocket,config[env].urlOrigin)
    await client.init()
    if(username === null || session === null){
        console.log("Missing session")
    } else {
        return await client.getBalance(username,session)
    }
}

// Get Balance by WebSocket
export const wsClient = class {
    constructor(url,origin){
        this.client = new W3CWebSocket(url,config[env].protocol,origin, {
            'User-agent': userAgent
        })
        this.wsMessage = []
    }
    async init(){
        this.client.onerror = ()=> {
            console.log('Connection Error');
        };
    
        this.client.onclose = ()=> {
            console.log('Client Closed');
        };
    
        this.client.onmessage = (e)=> {
            if (typeof e.data === 'string') {
                this.wsMessage.push(e.data)
                // console.log(e.data)
            }
        };
    
        this.client.onopen = ()=> {
            console.log('WebSocket Client Connected');
        };
    }
    async SendMessage(message) {
        for(let i=0;i<config.setting.loop;i++){
            if(this.client.readyState === this.client.OPEN ){
                this.client.send(message.toString())
                break
            }
            
            await sleep(200)
            // console.log("Wait Websocket Client Connect Succesfully")
        }
    }
    async waitMessage(messageWait) {
        for(let i=0;i<config.setting.loop;i++){
            for(let j=0; j< this.wsMessage.length; j++){
                if(this.wsMessage[j].includes(messageWait)){
                    // console.log(this.wsMessage[j])
                    i=60;
                    break
                }
            }
            await sleep(200)
            // console.log("Wait Websocket Message: "+ messageWait)
        }
    }
    async getMessage(prefixMessage) {
        let _found = null
        for(let i=0; i<config.setting.loop;i++) {
            _found = this.wsMessage.filter(element => element.includes(prefixMessage));
            if(_found.length !== 0) { break }
            await sleep(200)
            // console.log("Wait Websocket Message: "+ messageWait)
        }
        return _found.pop()
    }
    async getRawData(_mes){
        try {
            let raw = _mes
            if(raw === null) return null
            else {
                raw = raw.split("42/user/roulette,");
                return raw[1]
            }
        } catch (error) {
            console.log(error.message)
            return null
        }
    }
    async getBalance(username,session) {
        // console.log(session)
        await this.waitMessage('0{')
        await this.SendMessage('40/user/roulette,')
        await this.waitMessage('40')
        await this.SendMessage(`42/user/roulette,["signin",{"isAuthenticated":true,"username":"${username}","language":"vi-VN","ss":"${session}","isSSO":true,"time":"2021-03-22T09:16:12.371Z"}]`)
        await this.waitMessage('42/user/roulette,["signedIn"]')
        await this.SendMessage('42/user/roulette,["inGame"]')
        await this.waitMessage('42/user/roulette,["Roulette",{"gameConfigs')
        let mess =  await this.getMessage('42/user/roulette,["Roulette",{"gameConfigs')
        mess = await this.getRawData(mess)
        await this.closeSocket()
        return await getDataJsonPath(mess,'$..user.red')
    }
    async closeSocket() {
        this.client.close(0,"Closed Socket")
    }
}

export const getSession = async()=>{
    const _rawData =  await getWsMessage('{"Authorized":true,')
    // console.log(_rawData)
    session = await getDataJsonPath(_rawData,'$..ss.ss')
    username = await getDataJsonPath(_rawData,'$..ss.username')
    name = await getDataJsonPath(_rawData,'$..user.name')
}
export const getName = async() =>{
    return await name
}
export const getMemberId = async() => {
    return await username.match(/_([0-9]+)/)[1]
}
// getData Mongodb
export const mondbGetData = async(connectString, dbName, collection, query)=> {
    // Get first value of query
    return new Promise((res,rej) => {
        Mongodb.MongoClient.connect(connectString, function(err,client){
            if(err) rej(err)
            res(client.db(dbName).collection(collection).findOne(query))
            client.close()
        }
    )})
}

export const gameType = {
    Sedie : {_ws:"XocXoc", _bettime: 30, Id: 2 },
    VipSedie :  {_ws:"VipSeDie", _bettime: 30, Id: 22 },
    MiniSedie : {_ws:"MiniSeDie", _bettime: 30, Id: 9 },
    BigSmall : {_ws:"taixiu", _bettime: 50 , Id: 1},
    TurboBigSmall : {_ws:"TXTurbo", _bettime: 30, Id: 4 },
    TurboOddEven : {_ws:"OETurbo", _bettime: 30, Id: 6 },
    BigSmallSicbo : {_ws:"SicBo", _bettime: 51 , Id: 25}
 }

export const verifyBettingTime = async(_game) => {
    //Clear ws to reach new round data
  wsMessageReceived = [] //Clear old data of previous round
  let _found = await getWsMessage(`42/user/${gameType[_game]._ws.toLocaleLowerCase()},["${gameType[_game]._ws}",{"remainingTime":`)
  wsMessageReceived = [] // prepare free array for settlement result
  const res = String(_found).split(`42/user/${gameType[_game]._ws.toLocaleLowerCase()},`)
  let remaintime = await getDataJsonPath(res[1],'$..remainingTime')
  let bettime = gameType[_game]._bettime
  // Wait for delay settle time
  await sleep((remaintime - bettime  -1) *1000)
  //Start count down bet time
  for(let i=bettime; i>=1; i--)
    {
      await sleep(1000)
    }    
  //Check Settle
  await sleep(2000)
  let  _result =await wsMessageReceived.filter(element => element.includes(`42/user/${gameType[_game]._ws.toLocaleLowerCase()},["${gameType[_game]._ws}",{"finish":{"result"`));
  //Check settle ws msg should be 1 or 2 in array
  //console.log(_result.length)
  await expect(_result.length).to.be.within(1,2)
 
}

export const verifyBlockTime = async(_game,_placebetfunc,args) => {
    //ex:  await utils.verifyBlockTime(game,BigSmallFunc.PlaceBet,["Big",1,'nowait'])
    wsMessageReceived = [] //Clear old data of previous round
    let _found = await getWsMessage(`42/user/${gameType[_game]._ws.toLocaleLowerCase()},["${gameType[_game]._ws}",{"remainingTime":`)
    wsMessageReceived = [] // prepare free array for settlement result
    const res = String(_found).split(`42/user/${gameType[_game]._ws.toLocaleLowerCase()},`)
    let remaintime = await getDataJsonPath(res[1],'$..remainingTime')
    let bettime = gameType[_game]._bettime
    // Wait for delay settle time
    await sleep((remaintime - bettime  -1) *1000)
    for(let i=bettime; i>=1; i--){
        if(i> 5){
          await sleep(1000)
        }
        if(i==5){
          await _placebetfunc.apply(this,args)
          await sleep(2000)
          let _result =await wsMessageReceived.filter(element => element.includes(`42/user/${gameType[_game]._ws.toLocaleLowerCase()},["${gameType[_game]._ws}",{"endBet":-1,"notice":"Vui lòng đặt cược ở phiên sau."}]`));
          //console.log(_result.length)
          await expect(_result.length).to.be.within(1,2)
        }
      
    }    
  }

