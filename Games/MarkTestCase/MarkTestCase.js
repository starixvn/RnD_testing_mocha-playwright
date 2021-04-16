import * as gsUtil from '../../util/gsutils'


describe('Mark TestCase', ()=>{
  
  it('Export to Google Sheet', async() => {
    let _env = (process.env.NODE_ENV !== "%npm_config_env%") ? process.env.NODE_ENV : 'cf_local'
    let env = await envToString(_env)
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