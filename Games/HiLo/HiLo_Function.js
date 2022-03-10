import * as utils from '../../util/utils'
const HiLoLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./HiLo_Locator').HiLo_vn : require('./HiLo_Locator').HiLo_en)
import * as config from '../../config/config'
const path = require('path')
const pathImageCompare = path.join(__dirname,"../../") + path.sep + "ImageCompare" + path.sep + (process.env.npm_config_cf_lang === 'en' ? "en" : "vn")  + path.sep + "HiLo" + path.sep
var jp = require('jsonpath');
import {DB} from '../References/DataBase_Locator'


export const ReturnHome = async() => {
  await utils.clickPos(HiLoLocator.PopupClose.x,HiLoLocator.PopupClose.y )
  await utils.sleep(100)
}

export const OpenHistory = async() => {
  await utils.clickPos(HiLoLocator.History.x,HiLoLocator.History.y )
  await utils.sleep(1000)
}

export const OpenGuide = async() => {
  await utils.clickPos(HiLoLocator.Guide.x,HiLoLocator.Guide.y )
  await utils.sleep(100)

}

export const CloseGuide = async() => {
  await utils.clickPos(HiLoLocator.GuideClose.x,HiLoLocator.GuideClose.y )
  await utils.sleep(100)
}


export const CloseHistory = async() => {
    await utils.clickPos(HiLoLocator.PopupClose.x,HiLoLocator.PopupClose.y )
    await utils.sleep(1000)
}

const returnMachedtData= async(msg)=>{
  for(let i=0;i<5;i++){
        await utils.sleep(50)
        const _found = wsMessageReceived.filter(element => element.includes(msg));
        if(_found.length > 0){
          i=5;
          return _found.pop()
        }     
        else{  console.log(`not found ${msg}`,wsMessageReceived);         }
        
    }
}  

const getRawData = async(_mes) => {
  try {
      let raw = await returnMachedtData(_mes)
      if(raw.includes('42/user/hilo,')){
        let res = String(raw).split("42/user/hilo,");
        return res[1]
      } 
      else {
      return raw
      }
  } catch (error) {
      console.log(error.message)
      return null
  }
}

//Get Settlement Result
export const getSettlementResult = async () => {
  try {
      let _status = await getRawData("status")
      // console.log('_status',_status);
      let _win = await utils.getDataJsonPath(_status,`$..win`)
      let _bet = await utils.getDataJsonPath(_status,`$..bet`)
       return {win:_win, betstake:_bet}
      } catch (e) {
      console.error(e)
  }
}

//Get Settlement Result
export const GetsettleOdd = async (getamountopt='endBet') => {
  try {
      await utils.sleep(1000)
      let _status, _nextAmounts, lowodd, hiodd, _basedcard
      if(getamountopt=='endBet'){
        _status = await getRawData("endBet")
        _nextAmounts = await utils.getDataJsonPath(_status,`$..nextAmounts`)
        lowodd = (parseFloat(_nextAmounts.h) >= parseFloat(_nextAmounts.l))? "Lo"  : "Hi"
        hiodd = (lowodd == "Lo")? "Hi" : "Lo"
       }
       else {
        _status = await getRawData("endDeal")
        _basedcard = await utils.getDataJsonPath(_status,'$..result.result[(@.length-1)].rank') 
        _nextAmounts = await utils.getDataJsonPath(_status,`$..nextAmounts`)
        // console.log('base card',_basedcard);
        if(typeof _basedcard != 'undefined' && _basedcard == 'K' || _basedcard == 'A'){
          // console.log('select Lo');
          lowodd = 'Lo'
          hiodd = 'Lo'
         }
         else if(typeof _basedcard != 'undefined' &&  _basedcard == 2){
          //  console.log('select Hi');
          lowodd = 'Hi'
          hiodd = 'Hi'
         } 
         else{
          lowodd = (parseFloat(_nextAmounts.h) >= parseFloat(_nextAmounts.l))? "Lo"  : "Hi"
          hiodd = (lowodd == "Lo")? "Hi" : "Lo"
         } 
       }
       return {lowodd:lowodd, hamount:_nextAmounts.h,  lamount:_nextAmounts.l, hiodd:hiodd}
      } catch (e) {
      console.error(e)
  }
}


//Check Settlement
export const checkSettlement = async (placebetfunc,args,_AAchoice="No") => {
  // PlaceBet
  let _bfbalance = await utils.getBalance()
  await placebetfunc.apply(this,args)
  // get settle result
  let settle_result = await getSettlementResult()
  await utils.sleep(3000)
  let _afbalance = await utils.getBalance()
  //check balance
  if(args[2]=="Double" && _AAchoice=="No")
  {
    await utils.shouldBeEqual((args[0]*3)*2,settle_result.totalAmount) 
  }
  else if(args[2]!="Double" && _AAchoice=="No")
  {
    await utils.shouldBeEqual(args[0]*3,settle_result.totalAmount) 
  }
  await utils.shouldBeEqual((settle_result.settlementResult.ante +  settle_result.settlementResult.aa +  settle_result.settlementResult.call)+(_bfbalance - settle_result.totalAmount), _afbalance) 
  // await utils.shouldBeEqual(settle_result.red + settle_result.betWin,_afbalance, `verify balance`) 
}



export const VerifySignInSuccessfully = async() => {
  let _result = await utils.wsFindMessage('"signedIn"]')
  await utils.shouldBeEqual(_result.Val,true,'check login')
  await utils.sleep(5000)

}

//Is false
export const Isfalse = async () => {
  await utils.sleep(2000)
  for(let i=0;i<2;i++){
    let _found = wsMessageReceived.filter(element => element.includes('"nextAmounts":null'));
    if(_found.length >0){
      return true
      }     
      else {
        return false
      }
}


}


//PlaceBet
export const PlaceBetTestLowodd = async (chip,loop,turn) => {
      await utils.clickPos(HiLoLocator[chip].x,HiLoLocator[chip].y)  
      let totallose=0
      for (let index = 0; index < loop; index++) {
              wsMessageReceived.length=0
              await utils.sleep(2000)
              //Click Play and get lowest odd
              // console.log('click play');
               await utils.clickPos(HiLoLocator.Play.x,HiLoLocator.Play.y)  
               await utils.sleep(3000)
               let lowchoice = await GetsettleOdd()
              //  console.log('lowchoice',lowchoice);
               wsMessageReceived.length=0
               await utils.clickPos(HiLoLocator[lowchoice.lowodd].x,HiLoLocator[lowchoice.lowodd].y)
               await utils.sleep(1000)
              //Loop Turn
               for (let i = 0; i < turn+1; i++) {
                     //Get Settelemnt Result
                      let _isfalse = await Isfalse()
                      // console.log('_isfalse',_isfalse);
                      if(_isfalse == false && i == turn){
                      //CLICK COLLECT
                      // console.log('click collect');
                      await utils.sleep(2000)
                       await utils.clickPos(HiLoLocator.Collect.x,HiLoLocator.Collect.y)   
                      }
                      else if(_isfalse == false && i < turn)
                      {
                        lowchoice = await GetsettleOdd()
                        // console.log('click lowest odd');
                        await utils.sleep(2000)
                        await utils.clickPos(HiLoLocator[lowchoice.lowodd].x,HiLoLocator[lowchoice.lowodd].y)
                        wsMessageReceived.length=0
                      }                        
                 }       
      }
}

export const PlaceBet = async (chip,type='Lowodd',turn) => {
  await utils.clickPos(HiLoLocator[chip].x,HiLoLocator[chip].y)  
  wsMessageReceived.length=0
  await utils.sleep(1000)
   await utils.clickPos(HiLoLocator.Play.x,HiLoLocator.Play.y)  
  await utils.sleep(2000)
  let betodd =await GetsettleOdd()
  let _sodds = (type=='Lowodd') ?betodd.lowodd : betodd.hiodd
  // console.log(betodd,_sodds);
           await utils.clickPos(HiLoLocator[_sodds].x,HiLoLocator[_sodds].y)
           await utils.sleep(1000)
          //Loop Turn
           for (let i = 1; i <= turn; i++) {
                 //Get Settelemnt Result
                   let _isfalse = await Isfalse()
                  // console.log('_isfalse',_isfalse);
                  if(_isfalse == true){
                    i=turn
                   }
                  if(_isfalse == false && i == turn){
                  //CLICK COLLECT
                  // console.log('click collect');
                  await utils.sleep(2000)
                   await utils.clickPos(HiLoLocator.Collect.x,HiLoLocator.Collect.y)   
                  }
                  else if(_isfalse == false && i < turn)
                  {
                    betodd =await GetsettleOdd("endDeal")
                    _sodds = (type=='Lowodd') ?betodd.lowodd : betodd.hiodd
                    // console.log(betodd,_sodds);
                    // console.log('click lowest odd');
                    await utils.sleep(2000)
                    await utils.clickPos(HiLoLocator[_sodds].x,HiLoLocator[_sodds].y)
                }                   
             }       
}

export const VerifyHistoryContent = async() => {
  // console.log('VerifyHistoryContent',wsMessageReceived)
  // let res = await utils.wsFindMessage('history')
  // await utils.CaptureSubImageToFile(HiLoLocator.History)
  let _result= await utils.findImage(HiLoLocator.History.ImageCompare,HiLoLocator.History)
  await utils.shouldBeEqual(_result.Val, true,'Check History')
}

//Sliding chip bar and select chip icon
export const Sliding_Select_Chip = async(_chip) => {
  const _chipbar1 = [1,5,10,50,100]
  const _chipbar2 = [200,500,1000,2000]
 if (_chipbar2.includes(_chip) === true){
    await utils.swipe(828,479,455,479)
    await utils.sleep(200)
   }
    await utils.clickPos(HiLoLocator[`Chip${_chip}`].x,HiLoLocator[`Chip${_chip}`].y)  
  }

// Get ID of pos after click Deal
export const GetRoundId= async() => {
  const _found = await utils.getWsMessage('42/user/hilo,["Hilo",{"deal')
  const res = String(_found).split("42/user/hilo,");
  const obj = JSON.parse(res[1]);
  const _result = jp.value(obj[1], `$..roundId`);
  return _result
}
