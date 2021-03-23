const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../cred/secret_key.json')

const jsonResult = require('../Report/parallelTest.json')
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
        await this.sheet.setHeaderRow(["Automation ID","Status","Execution Time","Note"])
    }

}

const getTestcaseName = async(txt)=> {
    return txt.match(/(.* TC_[0-9]+)/g,'$1')[0]
}

export const repareData = async(_note)=> {
    let note = _note || ""
    // Get excution time
    let t = new Date().toLocaleString()
    // Get testCase List
    let rawTestcaseName = jp.query(jsonResult,'$..tests..fullTitle')
    let testcaseName = []
    for(let i =0; i<rawTestcaseName.length ;i++) {
        testcaseName.push(await getTestcaseName(rawTestcaseName[i]))
    }

    // Get Pass/Failed
    let rawStatus = jp.query(jsonResult,'$..tests..pass')
    let status =[]
    for(let i=0; i<rawStatus.length ;i++) {
        status.push( (rawStatus[i] === true ) ? 'Passed' : 'Failed')
    }
    let object = []
    // Create Object file
    for(let i=0; i<rawTestcaseName.length;i++) {
        object.push({"Automation ID":testcaseName[i], Status: status[i], "Execution Time": t, "Note":note})
    }
    return object
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