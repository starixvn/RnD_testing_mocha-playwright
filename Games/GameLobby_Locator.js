const path = require('path')
const pathImageCompare = path.dirname(require.main.paths[2]) + path.sep + "ImageCompare" + path.sep

export const GameLobbyLocator = {
    cvGame : "GameCanvas",
    AccountName : {
        top : 15,
        left : 480,
        width : 80,
        height : 47,
        ImageCompareAccountName : pathImageCompare + "ImgCompare_GameLobby_AccountName.jpg"
    },
    SedieIcon: {
        x: 500, 
        y: 440
    }
}