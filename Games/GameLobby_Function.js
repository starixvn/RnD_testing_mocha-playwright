import { GameLobbyLocator } from './GameLobby_Locator'
import * as utils from '../util/utils'
export const verifyLoginSuccessfully = async() => {
        //console.log(GameLobbyLocator.AccountName.ImageCompareAccountName)
        return await utils.findImage(
            GameLobbyLocator.AccountName.ImageCompareAccountName,
            GameLobbyLocator.AccountName.left,
            GameLobbyLocator.AccountName.top,
            GameLobbyLocator.AccountName.width,
            GameLobbyLocator.AccountName.height)
}