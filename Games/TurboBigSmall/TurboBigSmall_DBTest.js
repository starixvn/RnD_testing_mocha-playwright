const game = "TurboBigSmall"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as TurboBigSmallFunc from '../TurboBigSmall/TurboBigSmall_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
let result = null

describe('TurboBigSmall Database Testing', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
    await utils.sleep(5000)
    //await TurboBigSmallFunc.VerifySignInSuccessfully()
    await TurboBigSmallFunc.PlaceBet('Big',5)
    result = await TurboBigSmallFunc.GetSettleResult()
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_030_Full_Smoke_Verify DB - Table Cuoc', async () => {
      await TurboBigSmallFunc.verifyDBCuoc(result)
  })  
  
  it('TC_031_Full_Smoke_Verify DB - Table Phien',async()=>{
      await TurboBigSmallFunc.verifyDBPhien(result)
  })

  it('TC_032_Full_Smoke_Verify DB - Table Ones',async()=>{
    await TurboBigSmallFunc.verifyDBOnes(result)
})
})