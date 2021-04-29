const game = "BlackJack"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BlackJackFunc from '../BlackJack/BlackJack_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
let result = null

describe('BlackJack Database Testing', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
    await BlackJackFunc.VerifySignInSuccessfully()
    // Place bet
    let pos = 'Pos1'
    let betstake = 1
    //Place bet
    await BlackJackFunc.PlaceBet(betstake,pos)
    await BlackJackFunc.ClickDeal()
    // Get PosId
    const pos1id = await BlackJackFunc.GetPosId(1)
    // Settle
    await BlackJackFunc.BetSettle_HitCardUntilOver15(1)
    const wlpos1 = await BlackJackFunc.GetSettleResultByPosID(pos1id)

  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_022_Full_Smoke_Verify DB - Table Cuoc', async () => {
      await BlackJackFunc.verifyDBCuoc(result)
  })  
  
  it('TC_023_Full_Smoke_Verify DB - Table Phien',async()=>{
      await BlackJackFunc.verifyDBPhien(result)
  })

})