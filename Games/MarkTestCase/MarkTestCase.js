import * as gsUtil from '../../util/gsutils'


describe('Mark TestCase', ()=>{
  
  it('Export to Google Sheet', async() => {
    let _env = process.env.NODE_ENV || 'cf_local'
    let env = await envToString(_env)
    let gsheet = new gsUtil.Doc('1ysx_va_Qy8I8yx9c9XTRIFjOXjZ6AqKNmkcnmP8LMqg')
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
  else if(_env === 'cf_sit') return 'SIT'
  else if(_env === 'cf_uat') return 'UAT'
  else if(_env === 'cf_prod') return 'PRO'
}