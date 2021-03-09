import { GameLobbyLocator } from './GameLobby_Locator'
import * as utils from '../util/utils'
import * as config from '../config/config'

export const verifyLoginSuccessfully = async() => {
        //console.log(GameLobbyLocator.AccountName.ImageCompareAccountName)
        return await utils.findImage(
            GameLobbyLocator.AccountName.ImageCompare,
            GameLobbyLocator.AccountName)
}

export const OpenGameFromLobby = async(_Gamename) => {
    //Game in Screen1
    let _game = `${_Gamename}Icon`
    const Gscreen1 = ['VipSedie','Sedie','SedieWar','MiniSedie','BigSmallSicbo','BigSmall','TurboBigSmall','TurboOddEven','KenoProMax','KenoProViet','VipBaccarat','Baccarat']
    const Gscreen2 = ['VipFishPrawnCrab','FishPrawnCrab','DragonTiger','BlackJack','Roulette']
    if(Gscreen2.includes(_Gamename) === true){
        await utils.sleep(2000)
        await utils.swipe(config.setting.viewport.width/2 + 50, config.setting.viewport.height/2,0, config.setting.viewport.height/2)
        await utils.sleep(2000)
        await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y )
        }    
      else if (Gscreen1.includes(_Gamename) === true){
        await utils.sleep(2000)
        await utils.clickPos(GameLobbyLocator[_game].x,GameLobbyLocator[_game].y ) }
    await utils.sleep(5000) //hard sleep wait for game load
}

export const getBalance = async() => {
    return await utils.getUIBalance(OpenGameFromLobby.Balance.ImageCompare,
        OpenGameFromLobby.Balance.left, OpenGameFromLobby.Balance.top, OpenGameFromLobby.Balance.width, OpenGameFromLobby.Balance.height)
}