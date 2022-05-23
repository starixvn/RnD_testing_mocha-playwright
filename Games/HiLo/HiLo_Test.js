const game = "HiLo"
const addContext = require('mochawesome/addContext')
import * as utils from '../../util/utils'
import * as HiLoFunc from '../HiLo/HiLo_Function'
import * as GameLobbyFunc from '../References/GameLobby_Function'
const HiLoLocator = (process.env.npm_config_cf_lang  == 'vn' ? require('./HiLo_Locator').HiLo_vn : require('./HiLo_Locator').HiLo_en)

describe("======== AUTOMATION TEST RESULT HILO========", ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
    await GameLobbyFunc.OpenGameFromLobby(game)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/${cf_lang}/Pictures/${game}_${__filename}.png`});
      await addContext (this,`./Pictures/${game}_${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify User can open Game Success', async () => {
    await HiLoFunc.VerifySignInSuccessfully()
  })  

 it('TC_02_Full_Smoke_Verify User can open History popup ', async () => {
    await HiLoFunc.OpenHistory()
    await HiLoFunc.VerifyHistoryContent()
    await HiLoFunc.CloseHistory()
    })  
   
 it('TC_03_Full_Smoke_Verify User Can select Lo and Collect at turn 1', async () => {
   await HiLoFunc.PlaceBet("Chip5","Lowodd",1)
  })  

  it('TC_04_Full_Smoke_Verify User Can select Hi and Collect at turn 1', async () => {
    await HiLoFunc.PlaceBet("Chip5","Hiodd",1)
   })  

   it('TC_05_Full_Smoke_Verify User Can select Lo and placbet until win/losse', async () => {
    await HiLoFunc.PlaceBet("Chip5","Lowodd",10)
   })  
   
 it('TC_06_Full_Smoke_Verify Close Game Success', async () => {
      await HiLoFunc.ReturnHome()
  }) 

})

