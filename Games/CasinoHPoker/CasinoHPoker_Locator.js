const path = require('path')
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "CasinoHPoker" + path.sep

export const CasinoHPoker_vn = {
	DealerContent: { x : 380, y : 100, top : 100, left : 380, width : 525, height : 200, ImageCompare : pathImageCompare + "ImgCompare_DealerContent.png" },
	ANTEODD: { x : 25, y : 220, top : 220, left : 25, width : 240, height : 225, ImageCompare : pathImageCompare + "ImgCompare_ANTEODD.png" },
	AAODD: { x : 1025, y : 220, top : 220, left : 1025, width : 240, height : 225, ImageCompare : pathImageCompare + "ImgCompare_AAODD.png" },
	LeftArrow : { x : 363, y : 650 },
	RightArrow : { x : 905, y : 650 },
	Chip1 : { x : 440, y : 650 },
	Chip5 : { x : 513, y : 650 },
	Chip10 : { x : 591, y : 650 },
	Chip50 : { x : 664, y : 650 },
	Chip100 : { x : 744, y : 650 },
	Chip200 : { x : 820, y : 650 },
	Chip500 : { x : 664, y : 650 },
	Chip1000 : { x : 744, y : 650 },
	Chip2000 : { x : 820, y : 650 },
	Ante : { x : 644, y : 516 },
	AA : { x : 851, y : 477 },
	CALL : { x : 433, y : 477 },
	Menu : { x : 64, y : 169 },
	Home : { x : 65, y : 255 },
	History : { x : 65, y : 319, top : 68, left : 84, width : 1127, height : 124, ImageCompare : pathImageCompare + "ImgCompare_CasinoHemPoker_History.png" },
	PopupClose : { x : 1185, y : 60 },
	Guide : { x : 65, y : 381, top : 68, left : 173, width : 941, height : 569, ImageCompare1 : pathImageCompare + "ImgCompare_CasinoHemPoker_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_BlackJack_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_BlackJack_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_BlackJack_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Guide_5.png", ImageCompare6 : pathImageCompare + "ImgCompare_BlackJack_Guide_6.png" },
	Double : { x : 250, y : 620 },
	Newbet : { x : 1220, y : 560},
	Bet : { x : 1030, y : 600 },
	Cancel : { x : 1220, y : 560 },
	Rebet : { x : 1220, y : 560},
  }
  
export const CasinoHPoker_en = {
	Balance : { top : 688, left : 175, width :95, height : 22, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Balance.png" },
	Odds : { top : 102, left : 377, width : 519, height : 176, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Odds.png" },
	Balance : { top : 688, left : 170, width :105, height : 25, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Balance.png" },
	BetLimit : { top : 33, left : 897, width : 190, height : 109, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_BetLimit.png" },
	Stake : { top : 4, left : 11, width : 139, height : 81, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Stake1.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Stake5.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Stake10.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Stake50.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Stake100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Stake200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Stake500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Stake1000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Stake2000.png" },
	ChipBroad : { top : 587, left : 403, width : 562, height : 94, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_ChipBroad.png" },
	LeftArrow : { x : 378, y : 636 },
	RightArrow : { x : 982, y : 634 },
	Chip1 : { x : 457, y : 632 },
	Chip5 : { x : 546, y : 632 },
	Chip10 : { x : 630, y : 636 },
	Chip50 : { x : 716, y : 635 },
	Chip100 : { x : 801, y : 633 },
	Chip200 : { x : 644, y : 634 },
	Chip500 : { x : 731, y : 634 },
	Chip1000 : { x : 814, y : 633 },
	Chip2000 : { x : 902, y : 634 },
	Pos1 : { x : 960, y : 454, top : 409, left : 900, width : 121, height : 90, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Pos11.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Pos15.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Pos110.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Pos150.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Pos1100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Pos1200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Pos1500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Pos11000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Pos12000.png" },
	Pos2 : { x : 642, y : 493, top : 451, left : 577, width : 130, height : 85, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Pos21.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Pos25.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Pos210.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Pos250.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Pos2100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Pos2200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Pos2500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Pos21000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Pos22000.png" },
	Pos3 : { x : 319, y : 459, top : 415, left : 262, width : 114, height : 89, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Pos31.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Pos35.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Pos310.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Pos350.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Pos3100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Pos3200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Pos3500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Pos31000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Pos32000.png" },
	Pos1Stake : { top : 427, left : 799, width : 107, height : 53, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake1.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake5.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake10.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake50.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake1000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake2000.png" },
	Pos1Cancel : { x : 1043, y : 456, top : 431, left : 1017, width : 53, height : 51, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Pos1Cancel.png" },
	Pos2Stake : { top : 468, left : 472, width : 111, height : 47, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake1.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake5.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake10.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake50.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake1000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake2000.png" },
	Pos2Cancel : { x : 727, y : 496, top : 472, left : 697, width : 60, height : 49, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Pos2Cancel.png" },
	Pos3Stake : { top : 429, left : 164, width : 101, height : 50, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake1.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake5.png", ImageCompare10 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake10.png", ImageCompare50 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake50.png", ImageCompare100 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake100.png", ImageCompare200 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake200.png", ImageCompare500 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake500.png", ImageCompare1000 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake1000.png", ImageCompare2000 : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake2000.png" },
	Pos3Cancel : { x : 404, y : 457, top : 429, left : 377, width : 55, height : 56, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Pos3Cancel.png" },
	Deal : { x : 1227, y : 324, top : 264, left : 1187, width : 81, height : 120, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Deal.png" },
	Cancel : { x : 1226, y : 494, top : 459, left : 1199, width : 54, height : 71, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Cancel.png" },
	Hit : { x : 1232, y : 335, top : 282, left : 1195, width : 75, height : 106, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Hit.png" },
	Stand : { x : 1225, y : 492, top : 454, left : 1195, width : 61, height : 77, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Stand.png" },
	DoubleSplit : { x : 50, y : 198, top : 285, left : 10, width : 89, height : 110, xs : 48, ys : 265, tops : 460, lefts : 10, widths : 85, heights : 70, ImageCompareDouble : pathImageCompare + "ImgCompare_BlackJack_Double.png", ImageCompareDoubleSplit : pathImageCompare + "ImgCompare_BlackJack_DoubleSplit.png" },
	Split : { x : 50, y : 198, top : 285, left : 10, width : 89, height : 110, ImageCompareSplit : pathImageCompare + "ImgCompare_BlackJack_Split.png" },
	Renew : { x : 1228, y : 333, top : 273, left : 1185, width : 87, height : 120, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Renew.png" },
	New : { x : 1231, y : 493, top : 454, left : 1194, width : 74, height : 79, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_New.png" },
	Menu : { x : 61, y : 166, top : 133, left : 24, width : 75, height : 67, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_Menu.png" },
	Home : { x : 63, y : 253 },
	History : { x : 63, y : 324, top : 68, left : 84, width : 1127, height : 124, ImageCompare : pathImageCompare + "ImgCompare_BlackJack_History.png" },
	HistoryClose : { x : 1185, y : 97 },
	Guide : { x : 64, y : 397, top : 68, left : 173, width : 941, height : 569, ImageCompare1 : pathImageCompare + "ImgCompare_BlackJack_Guide_1.png", ImageCompare2 : pathImageCompare + "ImgCompare_BlackJack_Guide_2.png", ImageCompare3 : pathImageCompare + "ImgCompare_BlackJack_Guide_3.png", ImageCompare4 : pathImageCompare + "ImgCompare_BlackJack_Guide_4.png", ImageCompare5 : pathImageCompare + "ImgCompare_BlackJack_Guide_5.png", ImageCompare6 : pathImageCompare + "ImgCompare_BlackJack_Guide_6.png" },
	GuideClose : { x : 1089, y : 98 },
  
  DefaultState : {
      left : 0,
      top : 0,
      width : 1280,
      height : 540,
      ImageCompare : pathImageCompare + "DefaultState.png"},

    BetStake :{
      Pos3 :{left:181,top:439, width:70,height:30} ,
      Pos2: {left:495,top:477,width:70,height:30},
      Pos1: {left:820,top:439, width:70,height:30},
      ImageCompare : pathImageCompare

    }  ,

    DefaultChip : {
      left : 350,
      top : 560,
      width : 650,
      height : 134,
      ImageCompare : pathImageCompare + "DefaultChip.png"},  

    DealerContent : {
      left : 400,
      top : 120,
      width : 480,
      height : 130,
      ImageCompare : pathImageCompare + "DealerContent.png"},

    Historycontent : {
      left : 100,
      top : 60,
      width : 1060,
      height : 137,
      ImageCompare : pathImageCompare + "HistoryContent.png"},

  }
    