const pw = require('playwright')
const game = "BlackJack"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BlackJackFunc from '../BlackJack/BlackJack_Function'

describe('BlackJack Game', ()=>{

  before(async function(){
    await utils.Login(env,game);
    await utils.wsHearMessageOn()
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${__filename}.png`});
      await addContext (this,`./Pictures/${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
  await BlackJackFunc.OpenFromLobby()
  await BlackJackFunc.verifySignInSuccessfully()
  })  

  it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await BlackJackFunc.OpenFromLobby()
    await BlackJackFunc.verifySignInSuccessfully()
    })  


})
