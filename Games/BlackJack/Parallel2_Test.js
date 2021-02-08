const pw = require('playwright')
const path = require('path')
import * as config from '../../config/config'
import * as utils from '../../util/utils'

describe('Sedie Game', ()=>{

 it('TC_01_Smoke_Test_Full_ case run with smoke flag', async () => {
    try {
        // let env = 'cflocal'
        console.log(`Login Sedie`)
        await utils.Login(env,"Sedie");
        // console.log(config[env].memberId)

  } catch (error) {
    console.log(error)
  }
  })  

 
})
