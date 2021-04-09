const game = "BigSmall"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as BigSmallFunc from '../BigSmall/BigSmall_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
let result = null

describe('BigSmall Database Testing', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
    await BigSmallFunc.VerifySignInSuccessfully()
    await BigSmallFunc.PlaceBet('Big',5)
    result = await BigSmallFunc.GetSettleResult()
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_022_Full_Smoke_Verify DB - Table Cuoc', async () => {
      await BigSmallFunc.verifyDBCuoc(result)
  })  
  
  it('TC_023_Full_Smoke_Verify DB - Table Phien',async()=>{
      await BigSmallFunc.verifyDBPhien(result)
  })

  it('TC_024_Full_Smoke_Verify DB - Table Ones',async()=>{
    await BigSmallFunc.verifyDBOnes(result)
})
})