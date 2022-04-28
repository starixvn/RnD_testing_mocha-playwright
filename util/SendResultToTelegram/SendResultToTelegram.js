import chai, { expect, util } from 'chai'
import chaiHttp from 'chai-http'
import * as gsutils from '../gsutils'
chai.use(chaiHttp)

describe('Send Message', ()=>{
    it('Send Telegram', async () => {
        let result = await gsutils.repareData_vn()
        const args = await parseArg(process.env.npm_config_args)
        let env = await envToString((typeof args.env !== 'undefined') ? args.env : 'cf_local')
        // // //#### TelegramBot
        if (result.finalresult == 'Failed' && env != 'PRO') {
            chai.request("https://api.telegram.org")
            .post("/bot2088610410:AAFdYvdtV9h2AucxKqhA5oztPMwSBJIcO_s/sendMessage")
            .send({
                chat_id: -605245129,
                parse_mode: "Markdown",
                text: `💻 ${env}: ${result.testSuiteName}:  ${result.totalfailed} ❌ [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/pipelines/${args.Job}) `
            }).end( async(err,res)=>{
                expect(res).to.have.status(200)})  
        }
        if ( env == 'PRO') {
        // #### Skynet 
         let status = result.finalresult == 'Passed' ? '✅' :'❌'        
        await chai.request("https://bot.nexdev.net")
        .post("/skynex/api/messages/forwardwithtoken").set('content-type', 'application/x-www-form-urlencoded')
        .send({
            token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
            conversationId: -1001516404043,
            parse_mode: "Markdown",
            message: `🖥 ${env}: ${result.testSuiteName}:  ${status} [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/pipelines/${args.Job})`
        })
        }
    })  
})

const envToString = async(_env)=>{
    if(_env === 'cf_local') return 'Local'
    else if(_env === 'cf_local1') return 'Local1️⃣'
    else if(_env === 'cf_sit') return 'SIT'
    else if(_env === 'cf_uat') return 'UAT'
    else if(_env === 'cf_prod') return 'PRO'
}
const parseArg = async(_args)=> {
    if(typeof _args !== 'undefined'){
        let p = _args.split("-")
        let args ={},tmp=[]
        for(let i=0 ; i< p.length ; i++){
            tmp = p[i].split("=")
            args[tmp[0]] = tmp[1]
        }
        return args
      }
      return {}
}