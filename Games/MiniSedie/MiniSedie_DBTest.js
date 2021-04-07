const game = "MiniSedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as MiniSedieFunc from './MiniSedie_Function'
let result = null
describe('MiniSedie Game', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await MiniSedieFunc.openFromLobby()
    await MiniSedieFunc.verifySignInSuccessfully()
    result = await MiniSedieFunc.verifySettlement("Even",10,true)
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_043_Full_Smoke_Verify DB - Table Cuoc', async () => {
      await MiniSedieFunc.verifyDBCuoc(result)
  })  
  
  it('TC_044_Full_Smoke_Verify DB - Table Phien',async()=>{
      await MiniSedieFunc.verifyDBPhien(result)
  })
})