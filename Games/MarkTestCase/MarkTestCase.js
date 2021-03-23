import * as gsUtil from '../../util/gsutils'


describe('Demo Game', ()=>{
  
  it('Full_Demo', async() => {

    let gsheet = new gsUtil.Doc('1ysx_va_Qy8I8yx9c9XTRIFjOXjZ6AqKNmkcnmP8LMqg')
    await gsheet.init()
    await gsheet.getSheet('AutomationLog-'+process.env.npm_config_env)


    let obj = await gsUtil.repareData(process.env.npm_config_note)
    await gsheet.clearSheet()
    await gsheet.setDefaultHeader()
    await gsheet.inserts(obj)
     

  });

})