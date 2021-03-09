const game = "BigSmall"
const addContext = require('mochawesome/addContext')
import { dir } from 'console'
import * as utils from '../../util/utils'
import * as BigSmallFunc from '../BigSmall/BigSmall_Function'
import * as GameLobbyFunc from '../GameLobby_Function'
import {BigSmallLocator} from './BigSmall_Locator'

describe('BigSmall Game', ()=>{

  before(async function(){
    await utils.wsHearMessageOn()
    await utils.Login(env,game);
    await utils.sleep(3000)
  })

  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${__filename}.png`});
      await addContext (this,`./Pictures/${__filename}.png` )
    }
  })

 it('TC_01_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
    await GameLobbyFunc.OpenGameFromLobby(game)
    await BigSmallFunc.VerifySignInSuccessfully()
    //Verify odds of bet choices
    // Verify bet choices of game Big Small
  })  

  // it('TC_02_Full_Smoke_Verify History Content', async () => {
  //   await BigSmallFunc.OpenHistory()
  //   await BigSmallFunc.VerifyHistoryContent()
  //   await BigSmallFunc.CloseHistory()
  // })  

  // it('TC_03_Full_Smoke_Verify Guide Content', async () => {
  //   await BigSmallFunc.OpenGuide()
  //   await BigSmallFunc.VerifyGuideContent()
  //   await BigSmallFunc.CloseGuide()
  // })  

  // it('TC_04_Full_Smoke_Verify Statistic Content', async () => {
  //   await BigSmallFunc.OpenStatistic()
  //   await BigSmallFunc.VerifyStatisticContent()
  //   await BigSmallFunc.CloseStatistic()
  // })  

  // it('TC_05_Full_Smoke_Verify Preset Content', async () => {
  //   await BigSmallFunc.OpenPreset()
  //   await BigSmallFunc.VerifyPresetContent()
  //   await BigSmallFunc.ClosePreset()
  // })  

  
  it('TC_06_Full_Smoke_Verify Betting Big', async () => {
    await BigSmallFunc.PlaceBet()
  })  




})

