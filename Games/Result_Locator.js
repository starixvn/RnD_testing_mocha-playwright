export const ResultLocator = {
    lblTitle : '"Kết Quả"',
    lblNote : 'id=txtPW',
    btnSearch : "//button",
    lblNodata : '"Không có dữ liệu."',
    formSearching : {
        drpGameType : '//*[@id="GameType"]',
        txtRoundID : 'id=RoundId',
        txtDate : 'id=Date'
    },
    tblResult : {
        lblTime : "//table//tbody/tr/td[1]",
        lblRound : "//table//tbody/tr/td[2]",
        Sedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : {
                countRed0 : "Chẵn, 4 trắng",
                countRed1 : "Lẻ, 1 đỏ",
                countRed2 : "Chẵn, 2 đỏ",
                countRed3 : "Lẻ, 3 đỏ",
                countRed4 : "Chẵn, 4 đỏ"
            }
        },
        MiniSedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : {
                countRed0 : "Chẵn, 4 trắng",
                countRed1 : "Lẻ, 1 đỏ",
                countRed2 : "Chẵn",
                countRed3 : "Lẻ, 3 đỏ",
                countRed4 : "Chẵn, 4 đỏ"
            }
        },
        VipSedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : {
                countRed0 : "Chẵn, 4 trắng",
                countRed1 : "Lẻ, 1 đỏ",
                countRed2 : "Chẵn, 2 đỏ",
                countRed3 : "Lẻ, 3 đỏ",
                countRed4 : "Chẵn, 4 đỏ"
            }
        },
        BigSmall : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]",
            choicewin : "//*/tr[1]//td[5]/span"
            },

        BigSmallTurbo : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]",
            choicewin : "//*/tr[1]//td[5]/span"
            } ,
        
        OddEvenTurbo : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]",
            choicewin : "//*/tr[1]//td[5]/span"
            }        
    
    }
}