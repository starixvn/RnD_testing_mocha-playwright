import { GameLobbyLocator } from './GameLobby_Locator'
import * as utils from '../util/utils'
import * as config from '../config/config'

export const verifyLoginSuccessfully = async() => {
        //console.log(GameLobbyLocator.AccountName.ImageCompareAccountName)
        return await utils.findImage(GameLobbyLocator.AccountName)

}

export const OpenGameFromLobby = async(_Gamename) => {
    //Game in Screen1
    let _game = `${_Gamename}Icon`
    const Gscreen1 = ['VipSedie','Sedie','SedieWar','MiniSedie','BigSmallSicbo','BigSmall','TurboBigSmall','TurboOddEven','KenoProMax','KenoProViet','VipBaccarat','Baccarat']
    const Gscreen2 = ['VipFishPrawnCrab','FishPrawnCrab','DragonTiger','BlackJack','Roulette']
    if(Gscreen2.includes(_Gamename) === true){
        await utils.sleep(500)
        await utils.swipe(config.setting.viewport.width/2 + 50, config.setting.viewport.height/2,0, config.setting.viewport.height/2)
        await utils.sleep(2000)
        await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y )
        }    
      else if (Gscreen1.includes(_Gamename) === true){
        await utils.sleep(500)
        await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y ) }
    await utils.sleep(6000) //hard sleep wait for game load
    let ckerror = await utils.imageShouldNotDisplay(GameLobbyLocator.errorPopup.ImageCompare,GameLobbyLocator.errorPopup)
    await utils.shouldBeEqual(ckerror.Val,true,`Can not open game ${_Gamename} from Lobby` )
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