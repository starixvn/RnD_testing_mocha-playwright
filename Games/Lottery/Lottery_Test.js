const game = "Lottery"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as LotteryFunc from './Lottery_Function'
let RouletteLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./Lottery_Locator').RouletteLocator_vn : require('./Lottery_Locator').RouletteLocator_en)
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'

describe('Lottery Game', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game from lobby and nagvigation of statistic bar', async () => {
   await LotteryFunc.VerifySignInSuccessfully()
    }) 

   it('TC_02_Full_Smoke_Verify Max Bet on Big', async () => {
  await LotteryFunc.waitUtilNewRound()
  let stake = 10
  await LotteryFunc.PlaceBet("Sets27",'Sets10',stake)
  await LotteryFunc.VerifyBetStake("27Sets",10,stake)
  await LotteryFunc.PlaceBet("Sets4",'Sets80',stake)
  await LotteryFunc.VerifyBetStake("4Sets",80,stake)
  await LotteryFunc.PlaceBet("Special",'Sets40',stake)
  await LotteryFunc.VerifyBetStake("special",40,stake)
  await LotteryFunc.PlaceBet("Head",'HeadTail4',stake)
  await LotteryFunc.VerifyBetStake("head",4,stake)
  await LotteryFunc.PlaceBet("Tail",'HeadTail8',stake)
  await LotteryFunc.VerifyBetStake("tail",8,stake)
  await LotteryFunc.PlaceBet("Others",'Big',stake)
  await LotteryFunc.VerifyBetStake("others",'big',stake)
  await LotteryFunc.CheckSettleBalance()
  await LotteryFunc.CheckRoundHistory()
  }) 
 
  it('TC_03_Full_Smoke_Verify Close Game Success', async () => {
    await LotteryFunc.CloseGame()
  }) 

})

