import { MemberSiteLocator } from './MemberSite_Locator'
import * as config from '../config/config'
import * as utils from './../util/utils'
const chai = require('chai')
const expect = chai.expect

export const login = async() => {
    // Login for SIT/UAT/PRO
    try {
        // Go to Membersite Url
        await utils.navigate(config[env].url)
        await utils.waitForLoadState()
        
        // Input Username and Password
        await utils.sendKeys(MemberSiteLocator.txtUsername,config[env].username)
        await utils.sendKeys(MemberSiteLocator.txtPassword,config[env].password)

        // Enter Login button
        if(env == 'cf_prod'){
            await utils.clickEl(MemberSiteLocator.btnLoginPro)
        } else {
            await utils.clickEl(MemberSiteLocator.btnLogin)
        }
        await utils.waitEl(MemberSiteLocator.imgLogo)
    } catch (error) {
        console.error(error.message);
        // Login again
        // Go to Membersite Url
        await utils.navigate(config[env].url)
        await utils.waitForLoadState()
        
        // Input Username and Password
        await utils.sendKeys(MemberSiteLocator.txtUsername,config[env].username)
        await utils.sendKeys(MemberSiteLocator.txtPassword,config[env].password)

        // Enter Login button
        if(env == 'cf_prod'){
            await utils.clickEl(MemberSiteLocator.btnLoginPro)
        } else {
            await utils.clickEl(MemberSiteLocator.btnLogin)
        }
        await utils.waitEl(MemberSiteLocator.imgLogo)
    }
}
    
    //Login for local
export const login_local = async() => {
        try{
            let flag
            // Go to Membersite Url
            await utils.navigate(config[env].url)
            await utils.waitForLoadState()

            // Innput MemberID
            await utils.sendKeys(MemberSiteLocator.txtMemberId,config[env].memberId)

            // Click on Gen Token
            await utils.clickEl(MemberSiteLocator.btnGetToken)
            flag = await utils.isValueNotEqualOnAttribute(MemberSiteLocator.lblRedirect,"href","#")
            expect(flag.Val, 'Fail on get token from Simulator').to.be.true
            console.log('abc')
            // Navigate to SabaClub
            let url = (await utils.getAttribute(MemberSiteLocator.lblRedirect,"href")).toString()
            await utils.navigate((await url).slice(0, -1))
        } catch (error) {
            console.error(error.message)
        }
}