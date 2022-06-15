const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../cred/secret_key.json')
const jp = require('jsonpath')

export const Doc = class {

    constructor(docID){
        this.doc = new GoogleSpreadsheet(docID)
    }
    async init() {
        await this.doc.useServiceAccountAuth(creds)
        await this.doc.loadInfo()
    }
    async getSheet(title) {
        this.sheet = await this.doc.sheetsByTitle[title]
    }

    async getColumnName() {
        return await this.sheet.loadHeaderRow()
    }

    async getRows(){ 
        this.rows = await this.sheet.getRows()
    }

    async insert(obj){
        await this.sheet.addRow(obj)
    }
    
    async inserts(obj){
        await this.sheet.addRows(obj)
    }

    async updateRows() {
        await this.rows.save()
    }
    
    async clearSheet() {
        await this.sheet.clear()
    }

    async setDefaultHeader() {
        await this.sheet.setHeaderRow(["Automation ID","Status","Duration","Execution Time","Note"])
    }

}

const getTestcaseName = async(txt)=> {
    return txt.match(/(.* TC_[0-9]+)/g,'$1')[0]
}

const getTestSuiteName = async(txt)=>{
    return txt.match(/(.*) TC_/,'$1')[0].replace("Game TC_","").trim()
}

export const repareData_vn1 = async(_note="")=> {
    try {
        const jsonResult = require(`../Report/vn/mochawesome.json`)
        let note = _note
        // Get excution time
        let t = new Date().toLocaleString()
        // Get testCase List
        let rawTestcaseName = jp.query(jsonResult,'$..tests[?(@.skipped==false)].fullTitle')
        let testcaseName = [],testSuiteName = []
        for(let i =0; i<rawTestcaseName.length ;i++) {
            testcaseName.push(await getTestcaseName(rawTestcaseName[i]))
            testSuiteName.push(await getTestSuiteName(rawTestcaseName[i]))
        }
        // Get Pass/Failed
        let rawStatus = jp.query(jsonResult,'$..tests[?(@.skipped==false)].pass')
        let status =[]
        for(let i=0; i<rawStatus.length ;i++) {
            status.push( (rawStatus[i] === true ) ? 'Passed' : 'Failed')
        }
        // push duration
        let rawduration = jp.query(jsonResult,'$..tests..duration')
        let _duration =[]
        for(let i=0; i<rawduration.length ;i++) {
            _duration.push(parseFloat(Number(rawduration[i])/1000).toFixed(2))            
        }

        let object = []
        // Create Object file
        for(let i=0; i<rawTestcaseName.length;i++) {
            object.push({"Automation ID":testcaseName[i], Status: status[i], "Execution Time": t, TestSuite: testSuiteName[i] , "Note":note, "Duration": _duration[i]})
        }
        return object
    } catch {
        return 'NotFound'
    }
}

export const repareData_vn = async()=> {
    try {
        const jsonResult = require(`../Report/vn/mochawesome.json`)
        // Get testCase List
        let totalpassed =  jp.value(jsonResult,'$..stats.passes')
        let totalfailed =  jp.value(jsonResult,'$..stats.failures')
        let testSuiteName =  jp.query(jsonResult,'$..tests[0]..fullTitle')
        let temp = testSuiteName[0].split('======== AUTOMATION TEST RESULT')
        temp = temp[1].split('========')
        testSuiteName =temp[0].trim()
        let finalresult 
        if (totalpassed==0 && totalfailed==0) {
            finalresult = 'Failed-SSO From Member Site'
        }
        else{
            finalresult = (totalfailed = 0 && totalpassed>0) ? 'Passed' : 'Failed';
        }
        
        return {totalpassed: totalpassed,totalfailed:totalfailed,finalresult:finalresult,testSuiteName:testSuiteName}
    } catch {
        return 'NotFound'
    }
}

export const repareData_en = async(_note="")=> {
    try {
        const jsonResult = require(`../Report/en/mochawesome.json`)
        let note = _note
        // Get excution time
        let t = new Date().toLocaleString()
        // Get testCase List
        let rawTestcaseName = jp.query(jsonResult,'$..tests..fullTitle')
        let testcaseName = [],testSuiteName = []
        for(let i =0; i<rawTestcaseName.length ;i++) {
            testcaseName.push(await getTestcaseName(rawTestcaseName[i]))
            testSuiteName.push(await getTestSuiteName(rawTestcaseName[i]))
        }
        // Get Pass/Failed
        let rawStatus = jp.query(jsonResult,'$..tests..pass')
        let status =[]
        for(let i=0; i<rawStatus.length ;i++) {
            status.push( (rawStatus[i] === true ) ? 'Passed' : 'Failed')
        }
        // push duration
        let rawduration = jp.query(jsonResult,'$..tests..duration')
        let _duration =[]
        for(let i=0; i<rawduration.length ;i++) {
            _duration.push(parseFloat(Number(rawduration[i])/1000).toFixed(2))            
        }

        let object = []
        // Create Object file
        for(let i=0; i<rawTestcaseName.length;i++) {
            object.push({"Automation ID":testcaseName[i], Status: status[i], "Execution Time": t, TestSuite: testSuiteName[i] , "Note":note, "Duration": _duration[i]})
        }
        return object
    } catch {
        return 'NotFound'
    }
}

export const isFailed = async(object)=> {
    const jsonResult = require(`../Report/vn/mochawesome.json`)
    let rawStatus = jp.query(jsonResult,'$..fail')
    for(let i=0; i<rawStatus.length ;i++) {
        if(rawStatus[i] === true ) return true
    }
    return false
}

const msToTime = async(s)=> {

    // Pad to 2 or 3 digits, default is 2
    const pad = async(n, z)=> {
      z = z || 2;
      return ('00' + n).slice(-z);
    }
  
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    var mins = (s - secs) / 60;
  
    return  mins + 'm' + await pad(secs) + 's';
  }

export const prepareResult_vn = async(objArr)=> {
    try{
        const jsonResult = require('../Report/vn/mochawesome.json')
        let rs = [],flag =0, duration
        for(let i =0 ; i < objArr.length ; i++){
            if(rs.length === 0){
                rs.push({ TestSuite: objArr[i].TestSuite , total : 1 , pass : ((objArr[i].Status === "Passed") ? 1 : 0)})
            } else {
                flag = 0
                for(let j = 0; j< rs.length ; j++){
                    if(rs[j].TestSuite === objArr[i].TestSuite) {
                        rs[j].total = rs[j].total +1
                        rs[j].pass = (objArr[i].Status === "Passed") ? rs[j].pass + 1 : rs[j].pass
                        flag=1
                        break
                    }
                }
                if(flag ===0){
                    rs.push({ TestSuite: objArr[i].TestSuite , total : 1 , pass : ((objArr[i].Status === "Passed") ? 1 : 0)})
                }
            }
        }
        duration = await msToTime(jp.value(jsonResult,"$.stats.duration"))
        let testrun = await jp.value(jsonResult,"$.stats.tests")
        return { Result : rs, ExecutionTime : duration, testsrun: testrun}
    } catch {
        return 'NotFound'
    }
}

export const prepareResult_en = async(objArr)=> {
    try{
        const jsonResult = require('../Report/en/mochawesome.json')
        let rs = [],flag =0, duration
        for(let i =0 ; i < objArr.length ; i++){
            if(rs.length === 0){
                rs.push({ TestSuite: objArr[i].TestSuite , total : 1 , pass : ((objArr[i].Status === "Passed") ? 1 : 0)})
            } else {
                flag = 0
                for(let j = 0; j< rs.length ; j++){
                    if(rs[j].TestSuite === objArr[i].TestSuite) {
                        rs[j].total = rs[j].total +1
                        rs[j].pass = (objArr[i].Status === "Passed") ? rs[j].pass + 1 : rs[j].pass
                        flag=1
                        break
                    }
                }
                if(flag ===0){
                    rs.push({ TestSuite: objArr[i].TestSuite , total : 1 , pass : ((objArr[i].Status === "Passed") ? 1 : 0)})
                }
            }
        }
        duration = await msToTime(jp.value(jsonResult,"$.stats.duration"))
        let testrun = await jp.value(jsonResult,"$.stats.tests")
        return { Result : rs, ExecutionTime : duration,testsrun: testrun}
    } catch {
        return 'NotFound'
    }
}

    // // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    // await doc.useServiceAccountAuth(creds)

    // await doc.loadInfo()
    // console.log(doc.title)

    // const sheet  = await doc.sheetsByTitle['A']
    // const row = await sheet.getRows()
    // const sheet2  = await  doc.sheetsByTitle['Sheet2']
    // const row2 = await sheet2.getRows()
    // console.log(row[0]['ABC'])
    // console.log(row[0]['123'])