export const ResultLocator = {
    lblTitle : "//div[@class='header']/h1[text()='Kết Quả']",
    lblNote : "//input[@id='txtPW']",
    btnSearch : "//button",
    formSearching : {
        drpGameType : "//select[@id='GameType']",
        txtRoundID : "//input[@id='RoundId']",
        txtDate : "//input[@id='Date']"
    },
    tblResult : {
        lblTime : "//table//tbody/tr/td[1]",
        lblRound : "//table//tbody/tr/td[2]",
        Sedie : {
            lblResult : "//table//tbody/tr/td[3]",
            lblChoiceWin : "//table//tbody/tr/td[4]"
        },
        MiniSedie : {
            
        }
    }
}