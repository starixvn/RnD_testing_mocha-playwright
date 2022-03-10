const path = require('path')
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "HiLo" + path.sep

export const HiLo_vn = {
	LeftArrow : { x : 412, y : 479 },
	RightArrow : { x : 871, y : 475 },
	Chip1 : { x : 476, y : 480 },
	Chip5 : { x : 547, y : 480 },
	Chip10 : { x : 619, y : 480 },
	Chip50 : { x : 687, y : 480 },
	Chip100 : { x : 759, y : 480 },
	Chip200 : { x : 687, y : 480 },
	Chip500 : { x : 759, y : 480 },
	Chip1000 : { x : 817, y : 480 },
	Hi : { x : 791, y : 256 },
	Lo : { x : 791, y : 373 },
	Play : { x : 482, y : 321 },
	Collect : { x : 640, y : 371 },
	PopupClose : { x : 1223, y : 61 },
	Statistic : { x : 391, y : 211 },
	History : { x : 390, y : 207, top : 140, left : 227, width : 780, height : 40, ImageCompare : pathImageCompare + "ImgCompare_HILO_History.png" },
	Guide : { x : 945, y : 307, top : 68, left : 173, width : 941, height : 569, ImageCompare1 : pathImageCompare + "ImgCompare_CasinoHemPoker_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_BlackJack_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_BlackJack_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_BlackJack_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Guide_5.png", ImageCompare6 : pathImageCompare + "ImgCompare_BlackJack_Guide_6.png" },
	Double : { x : 250, y : 620 }
  }
  
export const HiLo_en = {
	LeftArrow : { x : 412, y : 479 },
	RightArrow : { x : 871, y : 475 },
	Chip1 : { x : 476, y : 480 },
	Chip5 : { x : 547, y : 480 },
	Chip10 : { x : 619, y : 480 },
	Chip50 : { x : 687, y : 480 },
	Chip100 : { x : 759, y : 480 },
	Chip200 : { x : 687, y : 480 },
	Chip500 : { x : 759, y : 480 },
	Chip1000 : { x : 817, y : 480 },
	Hi : { x : 791, y : 256 },
	Lo : { x : 791, y : 373 },
	Play : { x : 482, y : 321 },
	Collect : { x : 640, y : 371 },
	PopupClose : { x : 1223, y : 61 },
	Statistic : { x : 391, y : 211 },
	History : { x : 390, y : 207, top : 140, left : 227, width : 780, height : 40, ImageCompare : pathImageCompare + "ImgCompare_HILO_History.png" },
	Guide : { x : 945, y : 307, top : 68, left : 173, width : 941, height : 569, ImageCompare1 : pathImageCompare + "ImgCompare_CasinoHemPoker_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_BlackJack_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_BlackJack_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_BlackJack_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Guide_5.png", ImageCompare6 : pathImageCompare + "ImgCompare_BlackJack_Guide_6.png" },
	Double : { x : 250, y : 620 }
  }
    