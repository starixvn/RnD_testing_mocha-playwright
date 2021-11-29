const game = "SpecialSedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as SpecialSedieFunc from './SpecialSedie_Function'
import * as ResultFunc from '../References/Result_Function'

describe('SpecialSedie Game', ()=>{

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
   await SpecialSedieFunc.VerifySignInSuccessfully()
    }) 

   it('TC_02_Full_Smoke_Verify Max Bet on Big', async () => {
  await SpecialSedieFunc.waitUtilNewRound()
  let stake = 10, pos= 'Even'
  await SpecialSedieFunc.PlaceBet(pos,stake)
  await SpecialSedieFunc.VerifyBetStake(pos,stake)
  await SpecialSedieFunc.CheckSettleBalance()
  await SpecialSedieFunc.CheckRoundHistory()
  }) 
 
  it('TC_03_Full_Smoke_Verify Max Bet on Big', async () => {
    await SpecialSedieFunc.waitUtilNewRound()
    let stake = 10, pos= 'Odd'
    await SpecialSedieFunc.PresetChip(stake)
    await SpecialSedieFunc.PlaceBet(pos,null,'nowait')
    await SpecialSedieFunc.VerifyBetStake(pos,stake)
    await SpecialSedieFunc.CheckSettleBalance()
    await SpecialSedieFunc.CheckRoundHistory()
    }) 

  it('TC_04_Full_Smoke_Verify Close Game Success', async () => {
    await SpecialSedieFunc.CloseGame()
  }) 

})

