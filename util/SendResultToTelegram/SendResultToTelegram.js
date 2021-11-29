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
            mainContent = await gsutils.isFailed(obj) === false ? ` ${rs.Result[0].TestSuite}: All Passed (${rs.Result[0].pass} tcs)` : testSuiteDetail
            console.log(mainContent);
           chai.request("https://api.telegram.org")
            .post("/bot2088610410:AAFdYvdtV9h2AucxKqhA5oztPMwSBJIcO_s/sendMessage")
            .send({
                chat_id: -605245129,
                text: `${mainContent} -${mode} Test on ${env} - Duration: ${rs.ExecutionTime}`
            }).end( async(err,res)=>{
                expect(res).to.have.status(200)})     
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