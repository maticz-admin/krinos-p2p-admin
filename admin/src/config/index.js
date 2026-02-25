let key = {};
let env = 'salesdemo' //production or local
if (env == 'production') {
    const API_URL = 'https://api.tossvtoss.com'
    key = {
        secretOrKey: "FxUum76z",
        Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", //local
        API_URL: API_URL,
        FRONT_URL: 'https://www.tossvtoss.com',
        ADMIN_URL: 'https://contorls.tossvtoss.com/' ,
        getGeoInfo: "https://geolocation-db.com/json/" //"https://ipapi.co/json/",
    };
}
else if (env == 'demo') {
    // const API_URL = "https://backp2p-stage.krinos.app/" 
    const API_URL = 'https://krinosp2p-backend.maticz.in'
    key = {
        secretOrKey: "FxUum76z",
        // Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", // demo server
        // Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", // stag server
        Recaptchakey : "6LcNAH4rAAAAAMcji4ul5LhrLqALIWjglOhm",
        API_URL: API_URL,
        FRONT_URL: 'https://krinosp2p.maticz.in/',
        ADMIN_URL: 'https://krinosp2padmin.maticz.in/',
        getGeoInfo:  "https://geolocation-db.com/json/"//"https://ipapi.co/json/",
    };
}
else if (env == 'staging') {
    // const API_URL = "https://backp2p-stage.krinos.app/" 
    const API_URL = 'https://backp2p-stage.krinos.app'
    key = {
        secretOrKey: "FxUum76z",
        // Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", // demo server
        // Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", // stag server
        Recaptchakey : "6LcNAH4rAAAAAMcji4ul5LhrLqALIWjglOhm",
        API_URL: API_URL,
        FRONT_URL: 'https://uat-p2p.krinos.app/',
        ADMIN_URL: 'https://uatadmin-p2p.krinos.app/',
        getGeoInfo:  "https://geolocation-db.com/json/"//"https://ipapi.co/json/",
    };
}
else if (env == 'salesdemo') {
    // const API_URL = "https://backp2p-stage.krinos.app/" 
    const API_URL = 'https://krinosp2pbd-backend.maticz.in'
    key = {
        secretOrKey: "FxUum76z",
        // Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", // demo server
        // Recaptchakey: "6LeKwCYjAAAAAMbORefOGhr-1AAXaTNTkL7MBJrV", // stag server
        Recaptchakey : "6LcNAH4rAAAAAMcji4ul5LhrLqALIWjglOhm",
        API_URL: API_URL,
        FRONT_URL: 'https://krinosp2p-sales-frontend.pages.dev',
        ADMIN_URL: 'https://krinosp2p-sales-adminpanel.pages.dev',
        getGeoInfo:  "https://geolocation-db.com/json/"//"https://ipapi.co/json/",
    };
} 
else {
    const API_URL = 'http://localhost';
    key = {
        secretOrKey: "FxUum76z",
        Recaptchakey: "6LeHezUfAAAAAE_uuY_HFN5HoEVsQv8bpyC3xTat", //local
        API_URL: `${API_URL}:2054`,
        TRADE_URL: 'http://54.211.230.83:8081/api/trade',
        getGeoInfo: "https://geolocation-db.com/json/",//"https://ipapi.co/json/",
        socialMedia: {
            facebook: {
                appId: "1034988646970193"
            },
            linkedIn: {
                clientId: '78szlpfkw7ee7s',
                redirectUrl: 'https://99893158a13c.ngrok.io/signup',
                oauthUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
                scope: 'r_liteprofile%20r_emailaddress',
                state: '123456'
            }
        },
        FRONT_URL: `${API_URL}:3000/`
    };
}
key.tradeAccess = `?from=admin`

export default key;