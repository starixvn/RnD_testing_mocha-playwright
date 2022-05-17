const path = require('path')  
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "Baccarat" + path.sep

export const BaccaratLocator_vn = { 
	Dealer : { top : 5, left : 578, width : 130, height : 166, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Dealer.png" },
	Big : { x : 387, y : 520, top : 348, left : 141, width : 177, height : 49, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Big.png" },
	PlayerPair : { x : 571, y : 525, top : 474, left : 151, width : 165, height : 28, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_PlayerPair.png" },
	Player : { x : 379, y : 415, top : 381, left : 356, width : 198, height : 89, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Player.png" },
	Tie : { x : 640, y : 418, top : 408, left : 581, width : 119, height : 45, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Tie.png" },
	Banker : { x : 900, y : 429, top : 375, left : 731, width : 191, height : 108, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Banker.png" },
	Small : { x : 900, y : 519, top : 353, left : 960, width : 177, height : 40, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Small.png" },
	BankerPair : { x : 700, y : 520, top : 467, left : 957, width : 173, height : 35, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_BankerPair.png" },
	ChipBroad : { x : 648, y : 630, top : 590, left : 375, width : 547, height : 80, ImageCompare1 : pathImageCompare + "ImgCompare_Baccarat_ChipBroad1.png", ImageCompare2 : pathImageCompare + "ImgCompare_Baccarat_ChipBroad2.png" },
	Chip1 : { x : 423, y : 630 },
	Chip5 : { x : 509, y : 634 },
	Chip10 : { x : 593, y : 632 },
	Chip50 : { x : 677, y : 635 },
	Chip100 : { x : 762, y : 633 },
	Home : { x : 60, y : 120 },
	History : { x : 60, y : 280, top : 84, left : 92, width : 1099, height : 126, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_History.png" },
	HistoryClose : { x : 1224, y : 100 },
	Guide : { x : 60, y : 368, top : 138, left : 172, width : 924, height : 162, ImageCompare1 : pathImageCompare + "ImgCompare_Baccarat_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_Baccarat_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_Baccarat_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_Baccarat_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_Baccarat_Guide_5.png" },
	GuideClose : { x : 1224, y : 50 }
}

export const BaccaratLocator_en = { 
	Dealer : { top : 5, left : 578, width : 130, height : 166, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Dealer.png" },
	Big : { x : 387, y : 520, top : 348, left : 141, width : 177, height : 49, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Big.png" },
	PlayerPair : { x : 571, y : 525, top : 474, left : 151, width : 165, height : 28, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_PlayerPair.png" },
	Player : { x : 379, y : 415, top : 381, left : 356, width : 198, height : 89, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Player.png" },
	Tie : { x : 640, y : 418, top : 408, left : 581, width : 119, height : 45, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Tie.png" },
	Banker : { x : 900, y : 429, top : 375, left : 731, width : 191, height : 108, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Banker.png" },
	Small : { x : 900, y : 519, top : 353, left : 960, width : 177, height : 40, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_Small.png" },
	BankerPair : { x : 700, y : 520, top : 467, left : 957, width : 173, height : 35, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_BankerPair.png" },
	ChipBroad : { x : 648, y : 630, top : 590, left : 375, width : 547, height : 80, ImageCompare1 : pathImageCompare + "ImgCompare_Baccarat_ChipBroad1.png", ImageCompare2 : pathImageCompare + "ImgCompare_Baccarat_ChipBroad2.png" },
	Chip1 : { x : 423, y : 630 },
	Chip5 : { x : 509, y : 634 },
	Chip10 : { x : 593, y : 632 },
	Chip50 : { x : 677, y : 635 },
	Chip100 : { x : 762, y : 633 },
	Home : { x : 60, y : 120 },
	History : { x : 60, y : 280, top : 84, left : 92, width : 1099, height : 126, ImageCompare : pathImageCompare + "ImgCompare_Baccarat_History.png" },
	HistoryClose : { x : 1224, y : 100 },
	Guide : { x : 60, y : 368, top : 138, left : 172, width : 924, height : 162, ImageCompare1 : pathImageCompare + "ImgCompare_Baccarat_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_Baccarat_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_Baccarat_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_Baccarat_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_Baccarat_Guide_5.png" },
	GuideClose : { x : 1224, y : 50 }
}