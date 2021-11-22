const path = require('path') 
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_lang === 'en' ? "en" : "vn")  + path.sep + "HeroesSlot" + path.sep

export const HeroesSlotLocator_vn = { 
	Spin : { x : 1120, y : 638, top : 595, left : 1072, width : 96, height : 87, ImageCompare : pathImageCompare + "ImgCompare_HeroesSlot_Spin.png" },
	Menu : { x : 46, y : 91, top : 66, left : 15, width : 62, height : 51, ImageCompare : pathImageCompare + "ImgCompare_HeroesSlot_MenuIcon.png" },
	Home : { x : 45, y : 168 },
	History : { x : 47, y : 315, top : 29, left : 467, width : 329, height : 106, ImageCompare : pathImageCompare + "ImgCompare_HeroesSlot_History.png" },
	HistoryClose : { x : 1131, y : 84 },
	Guide : { x : 47, y : 375, top : 125, left : 149, width : 984, height : 539, ImageCompare1 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_5.png", ImageCompare6 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_6.png" },
	GuideClose : { x : 1168, y : 96 }
}

export const HeroesSlotLocator_en = { 
	Spin : { x : 1120, y : 638, top : 595, left : 1072, width : 96, height : 87, ImageCompare : pathImageCompare + "ImgCompare_HeroesSlot_Spin.png" },
	Menu : { x : 46, y : 91, top : 66, left : 15, width : 62, height : 51, ImageCompare : pathImageCompare + "ImgCompare_HeroesSlot_MenuIcon.png" },
	Home : { x : 45, y : 168 },
	History : { x : 47, y : 315, top : 29, left : 467, width : 329, height : 106, ImageCompare : pathImageCompare + "ImgCompare_HeroesSlot_History.png" },
	HistoryClose : { x : 1131, y : 84 },
	Guide : { x : 47, y : 375, top : 125, left : 149, width : 984, height : 539, ImageCompare1 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_5.png", ImageCompare6 : pathImageCompare + "ImgCompare_HeroesSlot_Guide_6.png" },
	GuideClose : { x : 1168, y : 96 }
}