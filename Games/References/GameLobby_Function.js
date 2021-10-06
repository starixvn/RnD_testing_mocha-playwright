const GameLobbyLocator = (process.env.npm_config_lang == 'vn' ? require('./GameLobby_Locator').GameLobbyLocator_vn : require('./GameLobby_Locator').GameLobbyLocator_en)
import * as utils from '../../util/utils'
import * as config from '../../config/config'

export const verifyLoginSuccessfully = async() => {
        // return await utils.findImage(GameLobbyLocator.AccountName)
        return await utils.wsFindMessage('{"Authorized":true')
        }

export const OpenGameFromLobby = async(_Gamename) => {
    console.log(`Open Game ${_Gamename}`);
    // //Game in Screen1
    // let _game = `${_Gamename}Icon`
    // const Gscreen1 = ['VipSedie','Sedie','SedieWar','MiniSedie','FourGuardians']
    // const Gscreen2 = ['BigSmallSicbo','BigSmall','TurboBigSmall','TurboOddEven','KenoProMax','KenoProViet','VipBaccarat','Baccarat']
    // const Gscreen3 = ['VipFishPrawnCrab','FishPrawnCrab','DragonTiger','BlackJack','Roulette']
    // if(Gscreen2.includes(_Gamename) === true){
    //     await utils.sleep(500)
    //     await utils.swipe(config.setting.viewport.width/2 + 100, config.setting.viewport.height/2,0, config.setting.viewport.height/2)
    //     await utils.sleep(2000)
    //     await page.screenshot({ path: `./Report/${lang}/Pictures/OpenGameFromLobby${_Gamename}.png`});
    //     await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y )
    //     }    
    // else if (Gscreen1.includes(_Gamename) === true){
    //     await page.screenshot({ path: `./Report/${lang}/Pictures/OpenGameFromLobby${_Gamename}.png`});
    //     await utils.sleep(500)
    //     await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y ) }
    // else if (Gscreen3.includes(_Gamename) === true){
    //     await utils.sleep(500)
    //     await utils.swipe(config.setting.viewport.width/2 + 100, config.setting.viewport.height/2,0, config.setting.viewport.height/2)
    //     await utils.sleep(2000)
    //     await utils.swipe(config.setting.viewport.width/2 + 100, config.setting.viewport.height/2,0, config.setting.viewport.height/2)
    //     await utils.sleep(2000)
    //     await page.screenshot({ path: `./Report/${lang}/Pictures/OpenGameFromLobby${_Gamename}.png`});
    //     await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y )
    // }
    // await utils.sleep(6000) //hard sleep wait for game load
    // let ckerror = await utils.imageShouldNotDisplay(GameLobbyLocator.errorPopup.ImageCompare,GameLobbyLocator.errorPopup)
    // await utils.shouldBeEqual(ckerror.Val,true,`Error Opening ${_Gamename} From Lobby` )
}

export const getBalance = async() => {
    return await utils.getUIBalance(GameLobbyLocator.Balance)
}

export const openResultPage = async() => {
    await utils.clickPos(GameLobbyLocator.Result.x, GameLobbyLocator.Result.y)
    for(let i = 0; i < config.setting.loop ; i++){
        if( await pages.length === 2) { break; }
        await utils.sleep(500)
    }
    await utils.switchTabs(1)
}