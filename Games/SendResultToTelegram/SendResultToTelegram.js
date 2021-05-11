import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import * as gsutils from './../../util/gsutils'
chai.use(chaiHttp)


describe('Send Message', ()=>{
    it('Send Telegram', async () => {
        let obj = await gsutils.repareData()
        let rs = await gsutils.prepareResult(obj)
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
            mainContent = await gsutils.isFailed(obj) === false ? `Passed total ${totalcase} testcases` : testSuiteDetail
            let day = new Date().toLocaleDateString()
            chai.request("https://api.telegram.org")
            .post("/bot1710698751:AAFaBfulGZHsEXdkACx-BbDwn75nJ2i1MfY/sendMessage")
            .send({
                chat_id: -507838201,
                parse_mode: "markdown",
                text: `===============================================\n*Automation Test Result: ${day} Duration: ${rs.ExecutionTime}*\n`
                +`Environment - *[${env}]*\nReport - [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/jobs/${args.Job})${mainContent}`
            }).end( async(err,res)=>{
            expect(res).to.have.status(200)
            })
        } else {
            let day = new Date().toLocaleDateString()
            chai.request("https://api.telegram.org")
            .post("/bot1710698751:AAFaBfulGZHsEXdkACx-BbDwn75nJ2i1MfY/sendMessage")
            .send({
                chat_id: -507838201,
                parse_mode: "markdown",
                text: `===============================================\n*Automation Test Result: ${day}*\n`
                +`Environment - *[${env}]*\nReport - [LINK](https://git3.nexdev.net/RnD/testing/mocha-playwright/-/jobs/${args.Job})\nStatus - *Failed*`
            }).end( async(err,res)=>{
            expect(res).to.have.status(200)
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
      return undefined
}