const MemberSiteLocator = (process.env.npm_config_cf_lang == 'vn' ? require('./MemberSite_Locator').MemberSiteLocator_vn : require('./MemberSite_Locator').MemberSiteLocator_en)
import * as config from '../../config/config'
import * as utils from '../../util/utils'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

export const login = async(_env,_game) => {
    // Login for SIT/UAT/PRO
    try {
        // Go to Membersite Url
        await utils.navigate(config[_env].url)
        await utils.waitForLoadState()
        // Input Username and Password
        if(_env == 'cf_uat'){
            await utils.clickEl('id=LoginDiv')
            await utils.sleep(1000)
            await page.selectOption('id=Langid', { value : 'vi-VN' })
            await utils.sendKeys('id=Username',config[_env].username[_game])
            await utils.sendKeys('id=Password',config[_env].password)
            await utils.sleep(1000)
            await utils.clickEl('id=LoginBtn')
            await utils.waitForLoadState()
            await utils.sleep(5000) 
        }

         // Enter Login button
        if(_env == 'cf_prod'){
            await utils.sleep(3000)
            await utils.sendKeys(MemberSiteLocator.txtUsername,config[_env].username[_game])
            await utils.sendKeys(MemberSiteLocator.txtPassword,config[_env].password)
            await utils.clickEl(MemberSiteLocator.btnLoginPro)
            await utils.sleep(3000)
        } 
        // else {
        //     await utils.waitForLoadState()
        //     await utils.clickEl(MemberSiteLocator.btnLogin)
        //     await utils.sleep(3000)
        //     await utils.clickEl('xpath=//*/div[@class="c-dropdown c-dropdown--lang  "]')
        //     await utils.clickEl('xpath=//*/div[@class="c-dropdown__container"]//div[contains(text(),"Tiếng Việt")]')
        //     await utils.sleep(3000)
        // }
        // await utils.waitEl(MemberSiteLocator.imgLogo)

    } catch (error) {
        console.error(error.message);
    }
}
    
    //Login for local
export const login_local = async(_env,_game) => {
        try{
            const cflang = process.env.npm_config_cf_lang=='en'?'en-US':'vi-VN'
            let gameid = config.setting.gameIdlocal[_game]
            // let _requestjs =  (_env != 'cf_local') ?
            // {"obCustId":Number(config[_env].memberId[_game]),"memberName":"Mp0LFZap","language":cflang,"currency":"$US","seq":"d,y,lumi","siteId":"4100300","siteName":"lumi","ip":"10.0.0.142","browserUserAgent":userAgent,"auth":{"partnerId":pid,"partnerSecret":`${pid}@20luminet&`},"token":null,"redirectUrl":"#","verifyResult":null,"gameId":gameid,"setting":{"apiUrl":"http://l1_game_api_local_1:5000","authUrl":"http://l1_auth_api_local_1:5000","client":{"id":"game-server","secret":"gameserver@20luminet&"},"expireIn":1637569728,"useAuthenticate":true,"requestTimeout":10000,"owUrl":"https://l1-ows1.lumigame.com/SabaClub/CreateCustomer","localhost":"http://localhost:7456","mobileLocalhost":"http://localhost:3000","port":5000},"domain":"example.com","localhost":null,"appType":1,"partner":"1W","resource":null}
            // :
            let _requestjs = {"playerId":Number(config[_env].memberId[_game]),"playerName":"vkJMZa8R","language":"vi-VN","currency":"$US","siteId":"4100300","siteName":"lumi","ip":"10.0.0.142","browserUserAgent":userAgent,"auth":{"operatorId":"ONEworks1","operatorSecret":"ONEworks1@20luminet&"},"token":null,"redirectUrl":"#","verifyResult":null,"gameId":gameid,"setting":{"evn":"LOCAL_1","apiUrl":"http://l1_game_api_local_1:5000","authUrl":"http://l1_auth_api_local_1:5000","client":{"id":"game-server","secret":"gameserver@20luminet&"},"expireIn":1655956145,"useAuthenticate":true,"requestTimeout":10000,"owUrl":"https://l1-ows1.lumigame.com/SabaClub/CreateCustomer","localhost":"http://localhost:7456","mobileLocalhost":"http://localhost:3000","port":5000},"domain":"example.com","localhost":null,"isOpenOnIframe":false,"appType":1,"isCash":true,"partner":"1W","expandAdvanceSetting":false,"instantMode":1,"devIp":null,"operatorToken":"ONEworks1Token","resource":null} 
            let res= await chai.request(config[_env].url).post("/sso").send(_requestjs)
            let obj = new Object()
            if(res.status != 200) {
                await utils.sleep(10000)
                await console.log('re-sso');
                res= await chai.request(config[_env].url).post("/sso").send(_requestjs)
            }
            obj = await JSON.parse(res.text)
            await utils.navigate(obj.redirectUrl)
            await utils.sleep(7000)//Wait for login process
        } catch (error) {
            console.error(error.message)
        }
}
