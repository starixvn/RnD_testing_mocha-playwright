const pw = require('playwright')
import * as config from '../../config/config'
import * as utils from '../../util/utils'

describe('BlackJack Game', ()=>{
 it('TC_01_Smoke_Test case run with smoke flag', async () => {
    try {
        // let env = 'cflocal'
        console.log('Smoke Test')
        // console.log(config[env].memberId)

  } catch (error) {
    console.log(error)
  }
  },30000)  

 it('TC_02_Full_Test case run with Full flag', async () => {
    try {
        console.log('Full Test')

  } catch (error) {
    console.log(error)
  }
  },30000)    

 it('TC_03_Full_Smoke_Test case run with Full_Smoke flag', async () => {
    try {
        console.log('Full Test')
  } catch (error) {
    console.log(error)
  }
  },30000)  

})
