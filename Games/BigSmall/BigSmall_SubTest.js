const game = "BigSmall"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BigSmallFunc from '../BigSmall/BigSmall_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
import * as RetrieveEndGameFunc from '../RetrieveEndGame_Function'

let result = null

describe('BigSmall Verify Sub test cases', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
    await BigSmallFunc.VerifySignInSuccessfully()
    await BigSmallFunc.PlaceBet('Big',1000)
    result = await BigSmallFunc.GetSettleResult(1000)
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
        var __filename = this.currentTest.title.trim()
        await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
        await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_025_Full_Smoke_Verify Retrieve End Game', async () => {
        await RetrieveEndGameFunc.navigateRetrieveEndGame()
        await RetrieveEndGameFunc.verifyRetrieveEndGame(game,result)
  })
  
  it('TC_26_Full_Smoke_Verify Archived RoundId in Retrieve End Game', async () => {
    await RetrieveEndGameFunc.navigateRetrieveEndGame()
    await RetrieveEndGameFunc.verifyArchivedRoundId(game)
})

})