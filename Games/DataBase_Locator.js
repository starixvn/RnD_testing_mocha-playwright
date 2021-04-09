export const DB = {
    connectString : 'mongodb://lmn_readonly:LmnReadonly@10.10.50.14:17101/',
    dataBaseName : 'minigame',
    collection : {
        MiniSedie : {
            cuoc : 'minisedie_cuocs',
            phien : 'minisedie_phiens'
        },
        Sedie : {
            cuoc : 'xocxoc_cuocs',
            phien : 'xocxoc_phiens'
        },
        VipSedie : {
            cuoc : 'vipsedie_cuocs',
            phien : 'vipsedie_phiens'
        },
        BigSmall : {
            cuoc : 'taixiu_cuocs',
            phien : 'taixiu_phiens',
            ones : 'taixiu_ones'
        },
        TurboBigSmall : {
            cuoc : 'txturbo_cuocs',
            phien : 'txturbo_phiens',
            ones : 'txturbo_ones'
        },
        TurboOddEven : {
            cuoc : 'chanleturbo_cuocs',
            phien : 'chanleturbo_phiens',
            ones : 'chanleturbo_ones'
        }
    }
}