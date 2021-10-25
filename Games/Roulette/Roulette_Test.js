const game = "Roulette"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as RouletteFunc from './Roulette_Function'
import * as ResultFunc from '../References/Result_Function'

describe('Roulette Game', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game from lobby and nagvigation of statistic bar', async () => {
   await RouletteFunc.VerifySignInSuccessfully()
    }) 

  it('TC_02_Full_Smoke_Verify Settlement some choices', async () => {
  await RouletteFunc.waitUtilNewRound()
  const stake = 10
  await RouletteFunc.PlaceBet("Even",stake)
  await RouletteFunc.VerifyBetStake("Even",stake)
  await RouletteFunc.PlaceBet("Choice0",10)
  await RouletteFunc.VerifyBetStake("0",stake)
  await RouletteFunc.PlaceBet("Red",stake)
  await RouletteFunc.VerifyBetStake("Red",stake)
  await RouletteFunc.CheckSettleBalance()
  await RouletteFunc.CheckRoundHistory()
  })

  it('TC_03_Full_Smoke_Verify Close Game Success', async () => {
    await RouletteFunc.CloseGame()
  }) 

})

