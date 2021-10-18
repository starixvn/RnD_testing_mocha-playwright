const path = require('path')   
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_lang === 'vn' ? "vn" : "en")  + path.sep + "ThreeCards" + path.sep

export const ThreeCardsLocator_vn = { 
	Red : { x : 353, y : 316, top : 258, left : 209, width : 288, height : 116, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Red.png" },
	Black : { x : 927, y : 316, top : 259, left : 785, width : 285, height : 114, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Black.png" },
	Diamonds : { x : 294, y : 462, top : 429, left : 196, width : 197, height : 67, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Diamonds.png" },
	Hearts : { x : 525, y : 462, top : 422, left : 425, width : 200, height : 81, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Hearts.png" },
	Spades : { x : 756, y : 465, top : 420, left : 655, width : 203, height : 90, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Spades.png" },
	Clubs : { x : 988, y : 461, top : 430, left : 887, width : 203, height : 63, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Clubs.png" },
	ChipBroad : { x : 646, y : 645, top : 604, left : 375, width : 543, height : 83, ImageCompare1 : pathImageCompare + "ImgCompare_ThreeCards_ChipBroad1.png", ImageCompare2 : pathImageCompare + "ImgCompare_ThreeCards_ChipBroad2.png" },
	Chip1 : { x : 419, y : 642 },
	Chip5 : { x : 506, y : 646 },
	Chip10 : { x : 592, y : 646 },
	Chip50 : { x : 677, y : 647 },
	Chip100 : { x : 762, y : 646 },
	Home : { x : 42, y : 113 },
	History : { x : 42, y : 201, top : 135, left : 167, width : 966, height : 55, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_History.png" },
	HistoryClose : { x : 1223, y : 69 },
	Guide : { x : 42, y : 287, top : 138, left : 172, width : 936, height : 273, ImageCompare1 : pathImageCompare + "ImgCompare_ThreeCards_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_ThreeCards_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_ThreeCards_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_ThreeCards_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_ThreeCards_Guide_5.png" },
	GuideClose : { x : 1223, y : 68 }
}
export const ThreeCardsLocator_en = { 
	Red : { x : 353, y : 316, top : 258, left : 209, width : 288, height : 116, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Red.png" },
	Black : { x : 927, y : 316, top : 259, left : 785, width : 285, height : 114, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Black.png" },
	Diamonds : { x : 294, y : 462, top : 429, left : 196, width : 197, height : 67, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Diamonds.png" },
	Hearts : { x : 525, y : 462, top : 422, left : 425, width : 200, height : 81, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Hearts.png" },
	Spades : { x : 756, y : 465, top : 420, left : 655, width : 203, height : 90, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Spades.png" },
	Clubs : { x : 988, y : 461, top : 430, left : 887, width : 203, height : 63, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_Clubs.png" },
	ChipBroad : { x : 646, y : 645, top : 604, left : 375, width : 543, height : 83, ImageCompare1 : pathImageCompare + "ImgCompare_ThreeCards_ChipBroad1.png", ImageCompare2 : pathImageCompare + "ImgCompare_ThreeCards_ChipBroad2.png" },
	Chip1 : { x : 419, y : 642 },
	Chip5 : { x : 506, y : 646 },
	Chip10 : { x : 592, y : 646 },
	Chip50 : { x : 677, y : 647 },
	Chip100 : { x : 762, y : 646 },
	Home : { x : 42, y : 113 },
	History : { x : 42, y : 201, top : 135, left : 167, width : 966, height : 55, ImageCompare : pathImageCompare + "ImgCompare_ThreeCards_History.png" },
	HistoryClose : { x : 1223, y : 69 },
	Guide : { x : 42, y : 287, top : 138, left : 172, width : 936, height : 273, ImageCompare1 : pathImageCompare + "ImgCompare_ThreeCards_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_ThreeCards_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_ThreeCards_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_ThreeCards_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_ThreeCards_Guide_5.png" },
	GuideClose : { x : 1223, y : 68 }
}