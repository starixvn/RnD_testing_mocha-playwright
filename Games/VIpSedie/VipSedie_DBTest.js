const game = "VipSedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as VipSedieFunc from './VipSedie_Function'
let result = null
let choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
let chip = [10,20,50,100,200,500,1000,2000,3000]
describe('VipSedie Database Testing', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await VipSedieFunc.openFromLobby()
    await VipSedieFunc.verifySignInSuccessfully()
    result = await VipSedieFunc.verifySettlement(choice[Math.floor(Math.random() * 6)],chip[Math.floor(Math.random() * 8)],true)
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_043_Full_Smoke_Verify DB - Table Cuoc', async () => {
      await VipSedieFunc.verifyDBCuoc(result)
  })  
  
  it('TC_044_Full_Smoke_Verify DB - Table Phien',async()=>{
      await VipSedieFunc.verifyDBPhien(result)
  })
})