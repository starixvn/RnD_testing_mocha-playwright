const game = "SedieWar"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as GameLobbyFunc from './../GameLobby_Function'
import * as SedieWarFunc from './SedieWar_Function'
let result = null
let choice = ['Player','Banker','Tie','Even','Odd',
        'PlayerEven','PlayerOdd','PlayerRed4','PlayerRed3','PlayerWhite3','PlayerWhite4',
        'BankerEven','BankerOdd','BankerRed4','BankerRed3','BankerWhite3','BankerWhite4']
let chip = [1,5,10,50,100,200,500,1000,2000]
describe('SedieWar Database Testing', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await GameLobbyFunc.OpenGameFromLobby(game)
    await SedieWarFunc.verifySignInSuccessfully()
    result = await SedieWarFunc.verifySettlement(choice[Math.floor(Math.random() * 16)],chip[Math.floor(Math.random() * 8)],true)
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })
 
  it('TC_073_Full_Smoke_Verify DB - Table Cuoc', async () => {
      await SedieWarFunc.verifyDBCuoc(result)
  })  
  
  it('TC_074_Full_Smoke_Verify DB - Table Phien',async()=>{
      await SedieWarFunc.verifyDBPhien(result)
  })

  it('TC_075_Full_Smoke_Verify DB - Table Ones',async()=>{
      await SedieWarFunc.verifyDBOne(result)
  })
})