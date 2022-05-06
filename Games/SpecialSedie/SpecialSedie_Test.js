const game = "SpecialSedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as SpecialSedieFunc from './SpecialSedie_Function'

describe('======== AUTOMATION TEST RESULT SPECIAL SEDIE ========', ()=>{

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

 it('TC_01_Full_Smoke_Verify User Can Open Game Success', async () => {
   await SpecialSedieFunc.VerifySignInSuccessfully()
    }) 

   it('TC_02_Full_Smoke_Verify Settlement on Even', async () => {
  await SpecialSedieFunc.waitUtilNewRound()
  let stake = 1, pos= 'Even'
  await SpecialSedieFunc.PlaceBet(pos,stake)
  await SpecialSedieFunc.CheckSettleBalance()
  await SpecialSedieFunc.CheckRoundHistory()
  }) 
 
  it('TC_03_Full_Smoke_Verify Settlement on Odd', async () => {
    await SpecialSedieFunc.waitUtilNewRound()
    let stake = 1, pos= 'Odd'
    await SpecialSedieFunc.PresetChip(stake)
    await SpecialSedieFunc.PlaceBet(pos,null,'nowait')
    await SpecialSedieFunc.CheckSettleBalance()
    }) 

  it('TC_04_Full_Smoke_Verify Close Game Success', async () => {
    await SpecialSedieFunc.CloseGame()
  }) 

})

