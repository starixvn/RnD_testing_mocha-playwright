export const ResultLocator_vn = {
    gameName : {
        Sedie : 'Xóc Đĩa',
        MiniSedie : ' Mini Xóc Đĩa',
        VipSedie : 'Xóc Đĩa VIP',
        BigSmall : 'Tài Xỉu',
        BigSmallTurbo : 'Tài Xỉu Siêu Tốc',
        OddEven : 'Chẵn Lẻ',
        OddEvenTurbo : 'Chẵn Lẻ Siêu Tốc',
        SedieWar : "Xóc Đĩa Đối Kháng",
        BigSmallSicbo : 'Tài Xỉu Sic Bo',
    },
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
            choiceWin : [
                "Chẵn, 4 trắng",
                "Lẻ, 1 đỏ",
                "Chẵn, 2 đỏ",
                "Lẻ, 3 đỏ",
                "Chẵn, 4 đỏ" ]
            
        },
        MiniSedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : [
                "Chẵn, 4 trắng",
                "Lẻ, 1 đỏ",
                "Chẵn",
                "Lẻ, 3 đỏ",
                "Chẵn, 4 đỏ" ]
        },
        VipSedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : [
                "Chẵn, 4 trắng",
                "Lẻ, 1 đỏ",
                "Chẵn, 2 đỏ",
                "Lẻ, 3 đỏ",
                "Chẵn, 4 đỏ"]
        },
        BigSmall : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]",
            choicewin : "//*/tr[1]//td[5]/span"
            },
    
        BigSmallSicbo : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]"
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
            },
        
        SedieWar :{
            lblPlayerResult1: "//table//tbody/tr/td[3]/i[1]",
            lblPlayerResult2: "//table//tbody/tr/td[3]/i[2]",
            lblPlayerResult3: "//table//tbody/tr/td[3]/i[3]",
            lblPlayerResult4: "//table//tbody/tr/td[3]/i[4]",
            lblBankerResult1: "//table//tbody/tr/td[4]/i[1]",
            lblBankerResult2: "//table//tbody/tr/td[4]/i[2]",
            lblBankerResult3: "//table//tbody/tr/td[4]/i[3]",
            lblBankerResult4: "//table//tbody/tr/td[4]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[5]",
            choiceWin : {
                optionWin : ["Nhà con", "Nhà cái", "Hòa"],
                totalWin : ["Tổng Chẵn", "Tổng Lẻ"],
                player : {
                    0 : ["Nhà Con Chẵn","Nhà Con 4 Trắng"],
                    1 : ["Nhà Con lẻ","Nhà Con 1 đỏ"],
                    2 : ["Nhà Con Chẵn",""],
                    3 : ["Nhà Con lẻ","Nhà Con 3 đỏ"],
                    4 : ["Nhà Con Chẵn","Nhà Con 4 đỏ"],
                },
                banker : {
                    0 : ["Nhà Cái chẵn","Nhà Cái 4 trắng"],
                    1 : ["Nhà Cái lẻ","Nhà Cái 1 đỏ"],
                    2 : ["Nhà Cái chẵn",""],
                    3 : ["Nhà Cái lẻ","Nhà Cái 3 đỏ"],
                    4 : ["Nhà Cái chẵn","Nhà Cái 4 đỏ"],
                }
            }
        }
    
    }
}

export const ResultLocator_en = {
    gameName: {
        Sedie : 'Se Die',
        MiniSedie : 'Mini Se Die',
        VipSedie : 'VIP Se Die',
        BigSmall : 'Big Small',
        BigSmallTurbo : 'Turbo Big Small',
        OddEven : 'Odd Even',
        OddEvenTurbo : 'Turbo Odd Even',
        SedieWar : "Se Die War",
        BigSmallSicbo : 'Sic Bo',
    },
    lblTitle : '"Game Round Result"',
    lblNote : 'id=txtPW',
    btnSearch : "//button",
    lblNodata : '"No data available."',
    formSearching : {
        //drpGameType : '//*[@id="GameType"]',
        drpGameType : 'id=GameType',
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
            choiceWin : [
                "Even, 4 white",
                "Odd, 1 red",
                "Even, 2 red",
                "Odd, 3 red",
                "Even, 4 red" ]
            
        },
        MiniSedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : [
                "Even, 4 white",
                "Odd, 1 red",
                "Even",
                "Odd, 3 red",
                "Even, 4 red" ]
        },
        VipSedie : {
            lblResult1 : "//table//tbody/tr/td[3]/i[1]",
            lblResult2 : "//table//tbody/tr/td[3]/i[2]",
            lblResult3 : "//table//tbody/tr/td[3]/i[3]",
            lblResult4 : "//table//tbody/tr/td[3]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[4]",
            choiceWin : [
                "Even, 4 white",
                "Odd, 1 red",
                "Even, 2 red",
                "Odd, 3 red",
                "Even, 4 red"]
        },
        BigSmall : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]",
            choicewin : "//*/tr[1]//td[5]/span"
            },
    
        BigSmallSicbo : {
            lblResult1 : "//*/tr[1]//img[1]",
            lblResult2 : "//*/tr[1]//img[2]",
            lblResult3 : "//*/tr[1]//img[3]",
            total : "//*/tr[1]//td[4]"
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
            },
        
        SedieWar :{
            lblPlayerResult1: "//table//tbody/tr/td[3]/i[1]",
            lblPlayerResult2: "//table//tbody/tr/td[3]/i[2]",
            lblPlayerResult3: "//table//tbody/tr/td[3]/i[3]",
            lblPlayerResult4: "//table//tbody/tr/td[3]/i[4]",
            lblBankerResult1: "//table//tbody/tr/td[4]/i[1]",
            lblBankerResult2: "//table//tbody/tr/td[4]/i[2]",
            lblBankerResult3: "//table//tbody/tr/td[4]/i[3]",
            lblBankerResult4: "//table//tbody/tr/td[4]/i[4]",
            redChip : "red-chip",
            whiteChip : "white-chip",
            lblChoiceWin : "//table//tbody/tr/td[5]",
            choiceWin : {
                optionWin : ["Player", "Banker", "Tie"],
                totalWin : ["Total Even", "Total Odd"],
                player : {
                    0 : ["Player - Even","Player - 4 White"],
                    1 : ["Player - Odd","Player - 1 Red"],
                    2 : ["Player - Even",""],
                    3 : ["Player - Odd","Player - 3 Red"],
                    4 : ["Player - Even","Player - 4 Red"],
                },
                banker : {
                    0 : ["Banker - Even","Banker - 4 White"],
                    1 : ["Banker - Odd","Banker - 1 Red"],
                    2 : ["Banker - Even",""],
                    3 : ["Banker - Odd","Banker - 3 Red"],
                    4 : ["Banker - Even","Banker - 4 Red"],
                }
            }
        }
    
    }
}
