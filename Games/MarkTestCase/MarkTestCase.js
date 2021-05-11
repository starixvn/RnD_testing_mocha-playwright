import * as gsUtil from '../../util/gsutils'


describe('Mark TestCase', ()=>{
  
  it('Export to Google Sheet', async() => {
    const args = await parseArg(process.env.npm_config_args)
    let env = await envToString((typeof args.env !== 'undefined') ? args.env : 'cf_local')
    let gsheet = new gsUtil.Doc('1fDQbvG7rm3vgLPfqRnaKMt8EGXjTGELd-1l56XwLq98')
    await gsheet.init()
    await gsheet.getSheet('AutomationLog-'+env)


    let obj = await gsUtil.repareData(process.env.npm_config_note)
    await gsheet.clearSheet()
    await gsheet.setDefaultHeader()
    await gsheet.inserts(obj)
     

  });

})
const envToString = async(_env)=>{
  if(_env === 'cf_local') return 'Local'
  else if(_env === 'cf_local1') return 'Local'
  else if(_env === 'cf_sit') return 'SIT'
  else if(_env === 'cf_uat') return 'UAT'
  else if(_env === 'cf_prod') return 'PRO'
}
const parseArg = async(_args)=> {
    let p = _args.split("-")
    let args ={},tmp=[]
    for(let i=0 ; i< p.length ; i++){
        tmp = p[i].split("=")
        args[tmp[0]] = tmp[1]
    }
    return args
}