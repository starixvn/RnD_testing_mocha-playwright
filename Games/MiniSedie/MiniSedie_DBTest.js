const game = "MiniSedie"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as MiniSedieFunc from './MiniSedie_Function'
import * as GameLobbyFunc from './../GameLobby_Function'
let result = null
let choice = ['Even','Odd','Red4','Red3','White3','White4']
let chip = [1,5,10,50,100,200,500,1000,2000]
describe('MiniSedie Database Testing', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
    await MiniSedieFunc.verifySignInSuccessfully()
    result = await MiniSedieFunc.verifySettlement(choice[Math.floor(Math.random() * 5)],chip[Math.floor(Math.random() * 8)],true)
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