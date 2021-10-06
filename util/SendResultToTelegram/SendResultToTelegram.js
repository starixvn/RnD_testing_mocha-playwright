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
        let totalcase = obj.length
        let testSuiteDetail = "",mainContent       
        if(obj !== 'NotFound'){
            if(await gsutils.isFailed(obj) === true){
                for(let i=0 ; i < rs.Result.length;i++){
                    testSuiteDetail += `\n*${rs.Result[i].TestSuite}*   :   ${rs.Result[i].pass}/${rs.Result[i].total} (${Math.round(rs.Result[i].pass/rs.Result[i].total*100)}%)`
                }
            }
            //mainContent = await gsutils.isFailed(obj) === false ? ` ${obj[1].TestSuite} Passed total ${totalcase} testcases` : testSuiteDetail
            mainContent = await gsutils.isFailed(obj) === false ? ` ${rs.Result[0].TestSuite} Passed: ${rs.Result[0].pass} ` : testSuiteDetail
            console.log(mainContent);
            let day = new Date().toLocaleDateString()
            await chai.request("https://bot.nexdev.net")
            .post("/skynex/api/messages/forwardwithtoken").set('content-type', 'application/x-www-form-urlencoded')
            .send({
                token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
                conversationId: -1001516404043,
                parse_mode: "markdown",
                message: `*Automation Test Result: ${day} Duration: ${rs.ExecutionTime} , *`
                +`Env : *${env}* Report: ${mainContent} [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/jobs/${args.Job})`
            })
              } else {
            let day = new Date().toLocaleDateString()
            await chai.request("https://bot.nexdev.net")
            .post("/skynex/api/messages/forwardwithtoken").set('content-type', 'application/x-www-form-urlencoded')
            .send({
                token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
                conversationId: -1001516404043,
                parse_mode: "markdown",
                message: `*Automation Test Result: ${day}*`
                +`Environment - *${env}* Report - [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/jobs/${args.Job})\nStatus - *Failed*`
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