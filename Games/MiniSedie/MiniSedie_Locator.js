const path = require('path') 
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + "MiniSedie" + path.sep
export const MiniSedieLocator = { 
	Even : { x : 480, y : 295, top : 281, left : 417, width : 126, height : 29, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_Even.png" },
	Odd : { x : 797, y : 302, top : 275, left : 735, width : 124, height : 55, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_Odd.png" },
	Red4 : { x : 468, y : 415, top : 389, left : 425, width : 86, height : 52, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_Red4.png" },
	Red3 : { x : 586, y : 415, top : 390, left : 544, width : 85, height : 51, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_Red3.png" },
	White3 : { x : 705, y : 415, top : 386, left : 662, width : 86, height : 58, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_White3.png" },
	White4 : { x : 824, y : 412, top : 387, left : 781, width : 87, height : 51, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_White4.png" },
	ChipBroad : { x : 649, y : 530, top : 497, left : 436, width : 426, height : 66, ImageCompare1 : pathImageCompare + "ImgCompare_MiniSedie_ChipBroad1.png", ImageCompare2 : pathImageCompare + "ImgCompare_MiniSedie_ChipBroad2.png" },
	LeftArrow : { x : 398, y : 530 },
	RightArrow : { x : 881, y : 533 },
	Chip1 : { x : 464, y : 525 },
	Chip5 : { x : 531, y : 529 },
	Chip10 : { x : 600, y : 530 },
	Chip50 : { x : 665, y : 528 },
	Chip100 : { x : 734, y : 527 },
	Chip200 : { x : 611, y : 529 },
	Chip500 : { x : 678, y : 528 },
	Chip1000 : { x : 744, y : 530 },
	Chip2000 : { x : 815, y : 529 },
	Close : { x : 924, y : 273 },
	Statistic : { x : 364, y : 272, top : 122, left : 455, width : 76, height : 103, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_Statistic.png" },
	History : { x : 344, y : 349, top : 95, left : 89, width : 1123, height : 122, ImageCompare : pathImageCompare + "ImgCompare_MiniSedie_History.png" },
	HistoryClose : { x : 1187, y : 121 },
	Guide : { x : 939, y : 351, top : 83, left : 172, width : 933, height : 567, ImageCompare1 : pathImageCompare + "ImgCompare_MiniSedie_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_MiniSedie_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_MiniSedie_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_MiniSedie_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_MiniSedie_Guide_5.png" },
	GuideClose : { x : 1084, y : 111 }
}