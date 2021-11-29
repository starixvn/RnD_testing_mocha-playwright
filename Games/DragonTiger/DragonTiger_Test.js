const game = "DragonTiger"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as DragonTigerFunc from './DragonTiger_Function'
import * as ResultFunc from '../References/Result_Function'

describe('DragonTiger Game', ()=>{

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
   await DragonTigerFunc.VerifySignInSuccessfully()
    }) 

   it('TC_02_Full_Smoke_Verify Max Bet on Big', async () => {
  await DragonTigerFunc.waitUtilNewRound()
  let stake = 10
  await DragonTigerFunc.PlaceBet('Dragon',stake)
  await DragonTigerFunc.VerifyBetStake("Dragon",stake)
  await DragonTigerFunc.PlaceBet('Tiger',stake)
  await DragonTigerFunc.VerifyBetStake("Tiger",stake)
  await DragonTigerFunc.PlaceBet('Tie',stake)
  await DragonTigerFunc.VerifyBetStake("Tie",stake)
  await DragonTigerFunc.CheckSettleBalance()
  await DragonTigerFunc.CheckRoundHistory()
  }) 
 
  it('TC_03_Full_Smoke_Verify Close Game Success', async () => {
    await DragonTigerFunc.CloseGame()
  }) 

})

