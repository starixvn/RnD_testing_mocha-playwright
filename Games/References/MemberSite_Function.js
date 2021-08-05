const MemberSiteLocator = (process.env.npm_config_lang == 'vn' ? require('./MemberSite_Locator').MemberSiteLocator_vn : require('./MemberSite_Locator').MemberSiteLocator_en)
import * as config from '../../config/config'
import * as utils from '../../util/utils'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const expect = chai.expect

export const login = async(_env,_game) => {
    // Login for SIT/UAT/PRO
    try {
        // Go to Membersite Url
        await utils.navigate(config[_env].url)
        await utils.waitForLoadState()
        
        // Input Username and Password
        await utils.sendKeys(MemberSiteLocator.txtUsername,config[_env].username[_game])
        await utils.sendKeys(MemberSiteLocator.txtPassword,config[_env].password)

        // Enter Login button
        if(_env == 'cf_prod'){
            await utils.clickEl(MemberSiteLocator.btnLoginPro)
        } else {
            await utils.clickEl(MemberSiteLocator.btnLogin)
        }
        await utils.waitEl(MemberSiteLocator.imgLogo)
        // if(await page.url().toString().includes('Sports') !== true){
        //     //console.log(page.url().toString().replace('?ReturnUrl=%2fLogin%2fVerify','').replace('demo:one23@',''))
        //     // Login again   
        //     // Go to Membersite Url
        //     await utils.navigate(page.url().toString().replace('?ReturnUrl=%2fLogin%2fVerify','').replace('demo:one23@',''))
        //     await utils.waitForLoadState() 
        //     // Input Username and Password
        //     await utils.sendKeys(MemberSiteLocator.txtUsername,config[_env].username[_game])
        //     await utils.sendKeys(MemberSiteLocator.txtPassword,config[_env].password)
        //     // Enter Login button
        //     if(_env == 'cf_prod'){
        //         await utils.clickEl(MemberSiteLocator.btnLoginPro)
        //     } else {
        //         await utils.clickEl(MemberSiteLocator.btnLogin)
        //     }
        // }
        // await utils.waitEl(MemberSiteLocator.imgLogo)
    } catch (error) {
        console.error(error.message);
    }
}
    
    //Login for local
export const login_local = async(_env,_game) => {
        try{
            const cflang = process.env.npm_config_lang=='vn'?'vi-VN':'en-US'
            let _requestjs = {"memberId": Number(config[_env].memberId[_game]),"memberName":"GJ62Pjtn","language":cflang,"currency":"$US","seq":"d,y,lumi","siteId":"4100300","ip":"10.0.0.11","browserUserAgent": userAgent,"auth":{"clientId":"gamesimulator","clientSecret":"gamesimulator@20luminet&"},"token":null,"redirectUrl":"#","verifyResult":null,"gameId":0,"setting":{"owUrl":""},"domain":"example.com","localhost":null,"resource":null}
            chai.request(config[_env].url).post("/sso").send(_requestjs).end( async(err,res)=>{
            const obj = JSON.parse(res.text);
            await utils.navigate(obj.redirectUrl)
            })
            await utils.sleep(7000)//Wait for login process
        } catch (error) {
            console.error(error.message)
        }
}

export const login_local2 = async(_env,_game) => {
    try{
        await utils.navigate("https://gamelobby-simulator.lumigame.com/signin")
        await utils.sendKeys('id=memberId',config[_env].memberId[_game])
        await utils.clickEl("//*[@value='Get Token']")
        let link= await utils.getText("//*[@class='col-sm-12']")
        await utils.navigate(link)
        await utils.sleep(7000)//Wait for login process
    } catch (error) {
        console.error(error.message)
    }
}
