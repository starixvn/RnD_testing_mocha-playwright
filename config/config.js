export const setting ={
     browser: 'chromium',
     viewport: {
        // UI
        width : 1280,
        height : 720
    },
    timeout : 60000,
    loop : 60,
    headless: true,
}

export const cf_local ={
    url: "https://l1-glbs2.lumigame.com/signin",
    usernameSSO: "",
    memberId: {
        BlackJack : "1001051",
        Sedie : "1001052",
        VipSedie : "1001053",
        Sicbo:  "1001054",
        Keno:  "1001055",
        Baccarat:  "1001056",
        Roulette:  "1001057",
        BigSmall : "1001058",
        MiniSedie: "1001059",
        TurboBigSmall: "1001060",
        TurboOddEven: "1001061",
        SedieWar: "1001062",
        BigSmallSicbo: "1001063",
        FourGuardians: "1001064"
    },
    password: "",
    gamelobbyurl: "",
    urlWebsocket: "wss://l1-proxy2.lumigame.com/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "https://l1-games2.lumigame.com",
    protocol: "wss",
    retrieveEndGame : "https://l1-ows2.lumigame.com/SabaClub/RetrieveEndGameInfo",
    setBalance : "https://l1-ows2.lumigame.com/SabaClub/CreateCustomer"
}

export const cf_local1 ={
    url: "https://l1-glbs1.lumigame.com/signin",
    usernameSSO: "",
    memberId: {
        BlackJack : "1001051",
        Sedie : "1001052",
        VipSedie : "1001053",
        Sicbo:  "1001054",
        Keno:  "1001055",
        Baccarat:  "1001056",
        Roulette:  "1001057",
        BigSmall : "1001058",
        MiniSedie: "1001059",
        TurboBigSmall: "1001060",
        TurboOddEven: "1001061",
        SedieWar: "1001062",
        BigSmallSicbo: "1001063",
        FourGuardians: "1001064"
    },
    password: "",
    gamelobbyurl: "",
    urlWebsocket: "wss://l1-proxy1.lumigame.com/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "https://l1-games1.lumigame.com",
    protocol: "wss",
    retrieveEndGame : "https://l1-ows1.lumigame.com/SabaClub/RetrieveEndGameInfo",
    setBalance : "https://l1-ows1.lumigame.com/SabaClub/CreateCustomer"
}

// export const cf_local1 ={
//     url: "https://gamelobby-simulator.lumigame.com/signin",
//     usernameSSO: "",
//     memberId: {
//         BlackJack : "1001051",
//         Sedie : "1001052",
//         VipSedie : "1001053",
//         Sicbo:  "1001054",
//         Keno:  "1001055",
//         Baccarat:  "1001056",
//         Roulette:  "1001057",
//         BigSmall : "1001058",
//         MiniSedie: "1001059",
//         TurboBigSmall: "1001060",
//         TurboOddEven: "1001061",
//         SedieWar: "1001062",
//         BigSmallSicbo: "1001063",
//         FourGuardians: "1001064"
//     },
//     password: "",
//     gamelobbyurl: "",
//     urlWebsocket: "wss://l1-proxy.lumigame.com/roulette/socket.io/?EIO=3&transport=websocket",
//     urlOrigin: "https://gamelobby-simulator.lumigame.com",
//     protocol: "wss",
//     retrieveEndGame : "https://owapi-simulator.lumigame.com/SabaClub/RetrieveEndGameInfo",
//     setBalance : "https://owapi-simulator.lumigame.com/SabaClub/CreateCustomer"
// }

export const cf_sit ={
    url: "http://demo:one23@qawer.playthefun.com:5068/login",
    username: {
        BlackJack : "supertestsaba66",
        Sedie : "supertestsaba67",
        VipSedie : "supertestsaba68",
        Sicbo:  "supertestsaba69",
        Keno:  "supertestsaba70",
        Baccarat:  "supertestsaba71",
        Roulette:  "supertestsaba72",
        BigSmall : "supertestsaba73",
        MiniSedie: "supertestsaba74",
        TurboBigSmall: "supertestsaba75",
        TurboOddEven: "supertestsaba76"
    },
    password: "1234aaAA",
    gamelobbyurl: "/VendorGame/OpenSabaClubLobby",
    urlWebsocket: "wss://l1uatproxy.sgamesuat.com/sit/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "https://l1sit.sgamesuat.com",
    protocol: "wss"
}

export const cf_uat ={
    url: "http://demo:one23@qawer.viva88.com:6109/Login/index?ReturnUrl=%2flogin",
    urlLog: "http://qawer.viva88.com:6109/login",
    username: {
        BlackJack : "IT55Test789",
        Sedie : "IT56Test789",
        VipSedie : "IT57Test789",
        Sicbo:  "IT58Test789",
        Keno:  "IT59Test789",
        Baccarat:  "IT60Test789",
        Roulette:  "IT61Test789",
        BigSmall : "IT62Test789",
        MiniSedie: "IT63Test789",
        TurboBigSmall: "IT64Test789",
        TurboOddEven: "IT65Test789"
    },
    password: "1234aaAA",
    gamelobbyurl: "/VendorGame/OpenSabaClub?GameID=0",
    urlWebsocket: "wss://l1uatproxy.sgamesuat.com/uat/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "https://l1uat.sgamesuat.com"
}

export const cf_prod ={
    url: "https://www.viva88.net/login888.aspx",
    username: {
        BlackJack : "IT55Test789",
        Sedie : "SUPERTEST30102050",
        VipSedie : "IT57Test789",
        Sicbo:  "IT58Test789",
        Keno:  "IT59Test789",
        Baccarat:  "IT60Test789",
        Roulette:  "IT61Test789",
        BigSmall : "IT62Test789",
        MiniSedie: "IT63Test789",
        TurboBigSmall: "IT64Test789",
        TurboOddEven: "IT65Test789"
    },
    password: "1234aaAA",
    gamelobbyurl: "/VendorGame/OpenSabaClubLobby",
    urlWebsocket: "wss://proxy.sabagame.com/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "https://www.sabagame.com",
    protocol: "wss"
}