import chai, { expect, util } from 'chai'
import chaiHttp from 'chai-http'
import * as gsutils from '../gsutils'
chai.use(chaiHttp)

describe('Send Message', ()=>{
    it('Send Telegram', async () => {
        let obj = await gsutils.repareData_vn()
        let rs = await gsutils.prepareResult_vn(obj)
        const args = await parseArg(process.env.npm_config_args)
        let env = await envToString((typeof args.env !== 'undefined') ? args.env : 'cf_local')
        let mode = process.env.npm_config_mode
        let testSuiteDetail = "",mainContent       
        if(obj !== 'NotFound'){
            if(await gsutils.isFailed(obj) === true){
                testSuiteDetail += `\n*${rs.Result[0].TestSuite}*   :   ${rs.Result[0].pass}/${rs.testsrun} Passed/Total Run`
            }
            mainContent = await gsutils.isFailed(obj) === false ? ` ${rs.Result[0].TestSuite}:All Passed (${rs.Result[0].pass} tcs)` : testSuiteDetail
            console.log(mainContent);
            let day = new Date().toLocaleDateString()
            await chai.request("https://bot.nexdev.net")
            .post("/skynex/api/messages/forwardwithtoken").set('content-type', 'application/x-www-form-urlencoded')
            .send({
                token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
                conversationId: -1001516404043,
                parse_mode: "markdown",
                // message: `*Automation Test Result: ${day} Duration: ${rs.ExecutionTime} , *`
                // +`Env : *${env}* Report: ${mainContent} [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/jobs/${args.Job})`
                message: `${mainContent} -${mode} Test on ${env} - Duration: ${rs.ExecutionTime}- [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/pipelines/${args.Job})`
            })
              } else {
            let day = new Date().toLocaleDateString()
            await chai.request("https://bot.nexdev.net")
            .post("/skynex/api/messages/forwardwithtoken").set('content-type', 'application/x-www-form-urlencoded')
            .send({
                token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
                conversationId: -1001516404043,
                parse_mode: "markdown",
                message: `Environment - *${env}* Report - [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/pipelines/${args.Job})\nStatus - *Failed*`
            }).end( async(err,res)=>{
                await shouldBeEqual(res.statusCode,200)
            })
        }
    })  
})

const envToString = async(_env)=>{
    if(_env === 'cf_local') return 'Local'
    else if(_env === 'cf_local1') return 'Local1'
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