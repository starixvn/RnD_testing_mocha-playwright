const pw = require('playwright')
const path = require('path')
import * as config from '../../config/config'
import * as utils from '../../util/utils'
const addContext = require('mochawesome/addContext');

describe('BlackJack Game', ()=>{
  beforeEach(function () {
    addContext(this, 'some context');
  });
 it('TC_01_Smoke_Test_Full_ case run with smoke flag', async () => {
    try {
        // let env = 'cflocal'
        console.log(`Login accountBlackJack `)
        await utils.Login(env,"BlackJack");
        // console.log(config[env].memberId)

  } catch (error) {
    console.log(error)
  }
  })  

 
})
