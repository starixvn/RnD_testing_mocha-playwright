const pw = require('playwright')
const path = require('path')
import * as utils from '../../util/utils'
const chai = require('chai')
const expect = chai.expect
const addContext = require('mochawesome/addContext');

describe('BlackJack Game', ()=>{

afterEach(async function(){
    if (this.currentTest.state == 'failed') {
      var fname = this.currentTest.title.trim();
      await page.screenshot({ path: `./Report/Pictures/${fname}.png`, fullPage: true }); 
      await addContext(this,`./Pictures/${fname}.png`);
  }})

 it('TC_01_Smoke_Test_Full_case', async () => {
        // let env = 'cflocal'
        console.log(`Login accountBlackJack `)
        await utils.Login(env,"BlackJack");
        expect(false).to.equal(true)
        // console.log(config[env].memberId)
  })  

 
})
