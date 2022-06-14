const game = "CasinoHPoker"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as CasinoHPokerFunc from '../CasinoHPoker/CasinoHPoker_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
const CasinoHPokerLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./CasinoHPoker_Locator').CasinoHPoker_vn : require('./CasinoHPoker_Locator').CasinoHPoker_en)

describe("======== AUTOMATION TEST RESULT CasinoH'em Poker ========", ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify User can open Game Success', async () => {
    await CasinoHPokerFunc.VerifySignInSuccessfully()
  })  

 it('TC_02_Full_Smoke_Verify default state and odds', async () => {
    await CasinoHPokerFunc.VerifyDealerContent()
    })  

 it('TC_03_Full_Verify User can open History popup ', async () => {
    await CasinoHPokerFunc.OpenHistory()
    await CasinoHPokerFunc.VerifyHistoryContent()
    await CasinoHPokerFunc.CloseHistory()
    })  
   
 it('TC_04_Full_Smoke_Verify User Cancel Bet', async () => {
   let _bfbalance = await utils.getBalance()
   await CasinoHPokerFunc.PlaceBet(5,"Ante","NoDouble","NoHitCard","NoFollow")
   await CasinoHPokerFunc.PlaceBet(5,"AA","NoDouble","NoHitCard","NoFollow","Cancel")
   let _afbalance = await utils.getBalance()
   await utils.shouldBeEqual(_bfbalance,_afbalance,'Check cancel bet function')
  })  

  it('TC_05_Full_Smoke_Verify User can Fold', async () => {
    await CasinoHPokerFunc.checkSettlement(CasinoHPokerFunc.PlaceBet,[5,"Ante","NoDouble","HitCard","NoFollow","Cancel"],"Fold")
  })  

  it('TC_06_Full_Smoke_Verify User can place bet Ante and check settlement result and MD5String', async () => {
    await CasinoHPokerFunc.NewBet()
    await CasinoHPokerFunc.checkSettlement(CasinoHPokerFunc.PlaceBet,[1,"Ante"])
    })  

 it('TC_07_Full_Smoke_Verify User can place bet double Ante and check settlement result ', async () => {
    await CasinoHPokerFunc.NewBet()
    await CasinoHPokerFunc.checkSettlement(CasinoHPokerFunc.PlaceBet,[1,"Ante","Double"])
  })  
 
 it('TC_08_Full_Smoke_Verify User can place bet Ante & AA and check settlement result ', async () => {
    await CasinoHPokerFunc.NewBet()
    await CasinoHPokerFunc.PlaceBet(5,"Ante","NoDouble","NoHitCard","NoFollow")
    await CasinoHPokerFunc.checkSettlement(CasinoHPokerFunc.PlaceBet,[5,"AA"],"AAChoice")
  })  

 it('TC_09_Full_Smoke_Verify Close Game Success', async () => {
      await CasinoHPokerFunc.ReturnHome()
  }) 

})

