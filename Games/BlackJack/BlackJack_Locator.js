const path = require('path')
const pathImageCompare =path.join(__dirname, '../../') + "ImageCompare" + path.sep + "BlackJack" + path.sep

export const BlackJackLocator = {
  Odds : { top : 102, left : 377, width : 519, height : 176, ImageCompareOdds : pathImageCompare + "ImgCompare_BlackJack_Odds.png" },
	BetLimit : { top : 33, left : 897, width : 190, height : 109, ImageCompareBetLimit : pathImageCompare + "ImgCompare_BlackJack_BetLimit.png" },
	Stake : { top : 4, left : 11, width : 139, height : 81, ImageCompareStake : pathImageCompare + "ImgCompare_BlackJack_Stake.png" },
	ChipBroad : { top : 587, left : 403, width : 562, height : 94, ImageCompareChipBroad : pathImageCompare + "ImgCompare_BlackJack_ChipBroad.png" },
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
	Pos1 : { x : 960, y : 454, top : 409, left : 900, width : 121, height : 90, ImageComparePos1 : pathImageCompare + "ImgCompare_BlackJack_Pos1.png" },
	Pos2 : { x : 642, y : 493, top : 451, left : 577, width : 130, height : 85, ImageComparePos2 : pathImageCompare + "ImgCompare_BlackJack_Pos2.png" },
	Pos3 : { x : 319, y : 459, top : 415, left : 262, width : 114, height : 89, ImageComparePos3 : pathImageCompare + "ImgCompare_BlackJack_Pos3.png" },
	Pos1Stake : { top : 427, left : 799, width : 107, height : 53, ImageComparePos1Stake : pathImageCompare + "ImgCompare_BlackJack_Pos1Stake.png" },
	Pos1Cancel : { x : 1043, y : 456, top : 431, left : 1017, width : 53, height : 51, ImageComparePos1Cancel : pathImageCompare + "ImgCompare_BlackJack_Pos1Cancel.png" },
	Pos2Stake : { top : 468, left : 472, width : 111, height : 47, ImageComparePos2Stake : pathImageCompare + "ImgCompare_BlackJack_Pos2Stake.png" },
	Pos2Cancel : { x : 727, y : 496, top : 472, left : 697, width : 60, height : 49, ImageComparePos2Cancel : pathImageCompare + "ImgCompare_BlackJack_Pos2Cancel.png" },
	Pos3Stake : { top : 429, left : 164, width : 101, height : 50, ImageComparePos3Stake : pathImageCompare + "ImgCompare_BlackJack_Pos3Stake.png" },
	Pos3Cancel : { x : 404, y : 457, top : 429, left : 377, width : 55, height : 56, ImageComparePos3Cancel : pathImageCompare + "ImgCompare_BlackJack_Pos3Cancel.png" },
	Deal : { x : 1227, y : 324, top : 264, left : 1187, width : 81, height : 120, ImageCompareDeal : pathImageCompare + "ImgCompare_BlackJack_Deal.png" },
	Cancel : { x : 1226, y : 494, top : 459, left : 1199, width : 54, height : 71, ImageCompareCancel : pathImageCompare + "ImgCompare_BlackJack_Cancel.png" },
	Hit : { x : 1232, y : 335, top : 282, left : 1195, width : 75, height : 106, ImageCompareHit : pathImageCompare + "ImgCompare_BlackJack_Hit.png" },
	Stand : { x : 1225, y : 492, top : 454, left : 1195, width : 61, height : 77, ImageCompareStand : pathImageCompare + "ImgCompare_BlackJack_Stand.png" },
	DoubleSplit : { x : 50, y : 198, top : 285, left : 10, width : 89, height : 110, xs : 48, y : 265, top : 460, left : 10, width : 85, height : 70, ImageCompareDouble : pathImageCompare + "ImgCompare_BlackJack_Double.png", ImageCompareDoubleSplit : pathImageCompare + "ImgCompare_BlackJack_DoubleSplit.png" },
	Split : { x : 50, y : 198, top : 285, left : 10, width : 89, height : 110, ImageCompareSplit : pathImageCompare + "ImgCompare_BlackJack_Split.png" },
	Renew : { x : 1228, y : 333, top : 273, left : 1185, width : 87, height : 120, ImageCompareRenew : pathImageCompare + "ImgCompare_BlackJack_Renew.png" },
	New : { x : 1231, y : 493, top : 454, left : 1194, width : 74, height : 79, ImageCompareNew : pathImageCompare + "ImgCompare_BlackJack_New.png" },
	Menu : { x : 61, y : 166, top : 133, left : 24, width : 75, height : 67, ImageCompareMenu : pathImageCompare + "ImgCompare_BlackJack_Menu.png" },
	Home : { x : 63, y : 253 },
	History : { x : 63, y : 324, top : 68, left : 84, width : 1127, height : 124, ImageCompareHistory : pathImageCompare + "ImgCompare_BlackJack_History.png" },
	HistoryClose : { x : 1185, y : 97 },
	Guide : { x : 64, y : 397, top : 68, left : 173, width : 941, height : 569, ImageCompareGuide1 : pathImageCompare + "ImgCompare_BlackJack_Guide_1.png", ImageCompareGuide2 : pathImageCompare + "ImgCompare_BlackJack_Guide_2.png", ImageCompareGuide3 : pathImageCompare + "ImgCompare_BlackJack_Guide_3.png", ImageCompareGuide4 : pathImageCompare + "ImgCompare_BlackJack_Guide_4.png", ImageCompareGuide5 : pathImageCompare + "ImgCompare_BlackJack_Guide_5.png", ImageCompareGuide6 : pathImageCompare + "ImgCompare_BlackJack_Guide_6.png" },
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
  