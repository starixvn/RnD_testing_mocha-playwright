export const setting ={
     browser: 'chromium',
     viewport: {
        // UI
        width : 1280,
        height : 720
    },
    timeout : 60000,
    loop : 60,
    headless: true

}

export const cf_local ={
    url: "http://gamelobby-simulator.lumigame.com/signin",
    //url: "http://l1-glbs1.lumigame.com/signin",
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
        TurboOddEven: "1001061"
    },
    password: "",
    gamelobbyurl: "",
    urlWebsocket: "ws://haproxy.lumigame.com:7001/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "http://l1-games1.lumigame.com",
    protocol: "ws",
    retrieveEndGame : "http://l1-ows1.lumigame.com/SabaClub/RetrieveEndGameInfo"
}

export const cf_sit ={
    url: "http://demo:one23@qawer.playthefun.com:5068/login",
    username: "supertestsaba48",
    password: "1234aaAA",
    gamelobbyurl: "http://qawer.playthefun.com:5068/VendorGame/OpenSabaClubLobby"
}

export const cf_uat ={
    url: "http://demo:one23@qawer.viva88.com:6100/Login/",
    username: {
        Sedie: "IT57Test789"
    },
    password: "1234aaAA",
    gamelobbyurl: "/VendorGame/OpenSabaClub?GameID=0",
    urlWebsocket: "ws://haproxy.lumigame.com:7002/roulette/socket.io/?EIO=3&transport=websocket",
    urlOrigin: "http://l1-games1.lumigame.com"
}

export const cf_prod ={
    env: "uaprot",
    url: "",
    username: "",
    password: ""
}
