const path = require('path') 
const pathImageCompare = path.join(__dirname,"../") + path.sep + "ImageCompare" + path.sep 
export const GameLobbyLocator = { 
	cvGame : "GameCanvas",
	AccountName : { top : 4, left : 457, width : 85, height : 51, ImageCompare : pathImageCompare + "ImgCompare_GameLobby_AccountName.png" },
	FourGuardiansIcon : { x : 313, y : 358 },
	VipSedieIcon : { x : 494, y : 274 },
	SedieIcon : { x : 496, y : 446 },
	SedieWarIcon : { x : 667, y : 275 },
	MiniSedieIcon : { x : 669, y : 445 },
	BigSmallSicboIcon : { x : 842, y : 275 },
	BigSmallIcon : { x : 844, y : 446 },
	TurboBigSmallIcon : { x : 1016, y : 273 },
	TurboOddEvenIcon : { x : 1015, y : 450 },
	KenoProMaxIcon : { x : 1187, y : 274 },
	KenoProVietIcon : { x : 1187, y : 446 },
	VipBaccaratIcon : { x : 670, y : 271 },
	BaccaratIcon : { x : 671, y : 448 },
	VipFishPrawnCrabIcon : { x : 842, y : 273 },
	FishPrawnCrabIcon : { x : 838, y : 444 },
	DragonTigerIcon : { x : 1013, y : 270 },
	BlackJackIcon : { x : 1187, y : 273 },
	RouletteIcon : { x : 1185, y : 446 }
}