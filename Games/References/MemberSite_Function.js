import { MemberSiteLocator } from './MemberSite_Locator'
import * as config from '../../config/config'
import * as utils from '../../util/utils'

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
            let flag
            // Go to Membersite Url
            await utils.navigate(config[_env].url)
            await utils.waitForLoadState()

            // Innput MemberID
            await utils.sendKeys(MemberSiteLocator.txtMemberId,config[_env].memberId[_game])

            // Click on Gen Token
            await utils.clickEl(MemberSiteLocator.btnGetToken)
            flag = await utils.isTextNotEqualOnElement(MemberSiteLocator.lblRedirect,"#")
            // flag = await utils.getText(MemberSiteLocator.lblRedirect)

            expect(flag.Val, 'Fail on get token from Simulator').to.be.true
            // Navigate to SabaClub
            let url = (flag = await utils.getText(MemberSiteLocator.lblRedirect)).toString()
            await utils.navigate((await url).slice(0, -1))
            await utils.sleep(7000)//Wait for login process
        } catch (error) {
            console.error(error.message)
        }
}