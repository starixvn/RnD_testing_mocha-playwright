const path = require('path')  
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "BaccaratBlockChain" + path.sep

export const BaccaratBlockChainLocator_vn = { 
	Big : { x : 275, y : 535},
	Small : { x : 977, y : 535},
	BankerPair : { x : 734, y : 535},
	PlayerPair : { x : 535, y : 535 },
	Player : { x : 271, y : 430},
	Tie : { x : 650, y : 430 },
	Banker : { x : 1010, y : 430},
	Home : { x : 66, y : 222, left : 37, top : 198, width : 58, height : 58, ImageCompare : pathImageCompare + "ImgCompare_BaccaratBlockChain_Home.png" },
	Menu : { x : 66, y : 289 },
	Chip1 : { x : 423, y : 630 },
	Chip5 : { x : 509, y : 634 },
	Chip10 : { x : 593, y : 632 },
	Chip50 : { x : 677, y : 635 },
	Chip100 : { x : 762, y : 633 },
	CheckCard : { x : 880, y : 180},
	History : { x : 63, y : 483, left : 540, top : 40, width : 200, height : 60, ImageCompare : pathImageCompare + "ImgCompare_BaccaratBlockChain_History.png"},
	Introduce : { x : 63, y : 483, left : 110, top : 90, width : 1070, height : 525, ImageCompare : pathImageCompare + "ImgCompare_BaccaratBlockChain_Introduce.png"},
	HistoryClose : { x : 1224, y : 100 },
	Guide : { x : 51, y : 435},
	GuideClose : {x : 1228, y : 54 }
}

export const BaccaratBlockChainLocator_en = { 
	Big : { x : 275, y : 535},
	Small : { x : 977, y : 535},
	BankerPair : { x : 734, y : 535},
	PlayerPair : { x : 535, y : 535 },
	Player : { x : 271, y : 430},
	Tie : { x : 650, y : 430 },
	Banker : { x : 1010, y : 430},
	Home : { x : 66, y : 222 },
	Menu : { x : 66, y : 289 },
	Chip1 : { x : 423, y : 630 },
	Chip5 : { x : 509, y : 634 },
	Chip10 : { x : 593, y : 632 },
	Chip50 : { x : 677, y : 635 },
	Chip100 : { x : 762, y : 633 },
	CheckCard : { x : 880, y : 180},
	History : { x : 63, y : 483, left : 400, top : 20, width : 600, height : 70, ImageCompare : pathImageCompare + "ImgCompare_BaccaratBlockChain_History.png"},
	Introduce : { x : 63, y : 483, left : 110, top : 90, width : 1070, height : 525, ImageCompare : pathImageCompare + "ImgCompare_BaccaratBlockChain_Introduce.png"},
	HistoryClose : { x : 1224, y : 100 },
	Guide : { x : 51, y : 435},
	GuideClose : {x : 1228, y : 54 }
}