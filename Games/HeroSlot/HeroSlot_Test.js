const game = "HeroSlot"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as HeroSlotFunc from './HeroSlot_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as ResultFunc from '../References/Result_Function'

describe('======== AUTOMATION TEST RESULT HERO SLOT ========', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${cf_lang}/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
  let result;

  it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await HeroSlotFunc.verifySignInSuccessfully()
  })  

  it('TC_02_Full_Smoke_Verify User can bet this game with payline = All , stake = 0.1', async () => {
    result = await HeroSlotFunc.betAndGetResult()
  }) 
  it('TC_03_Full_Smoke_Verify History Content', async () => {
    await HeroSlotFunc.verifyHistoryContent()
  })  
})