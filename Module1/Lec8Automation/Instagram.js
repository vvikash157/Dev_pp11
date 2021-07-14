    const puppeteer=require("puppeteer");
     require('dotenv').config();
     let instLogin=process.env.InstaLoginId;
     let instaPasswd=process.env.InstaLoginPasswd;
    let link="https://www.instagram.com/";


   async function instaLogin() {
   
    let browser=await puppeteer.launch({headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    })
    let pages=await browser.pages();
    let tab=await pages[0];
    await tab.goto(link);
    await tab.waitForSelector('[aria-label="Phone number, username, or email"]',{visible:true});
    await tab.type('[aria-label="Phone number, username, or email"]', instLogin);
    await tab.type('[aria-label="Password"]', instaPasswd);
    await tab.click('.sqdOP.L3NKy.y3zKF');
    tab.waitForTimeout(10000);
    await tab.waitForSelector('.cmbtv [type="button"]',{visible:true});
    await tab.click('.cmbtv [type="button"]');
    await tab.waitForSelector('.aOOlW.HoLwm',{ visible:true});
    await tab.click('.aOOlW.HoLwm');
    await tab.waitForSelector(".Igw0E.IwRSH.eGOV_.ybXk5.vwCYk.n4cjz",{visible:true});
    await tab.click(".Igw0E.IwRSH.eGOV_.ybXk5.vwCYk.n4cjz");
    await  tab.waitForTimeout(4000);
    await tab.waitForSelector("a[href].-nal3",{visible:true});

    let prefllwr=await tab.$$("a[href].-nal3");
    await console.log(prefllwr.length);
    let fllwr=await prefllwr[1];
   // await tab.click(fllwr);

    // let Link = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }  , fllwr);
    // await console.log(Link);
    // let createLink =await "https://www.instagram.com/"+Link;
    // await tab.goto(createLink);

    await tab.evaluate(function(ele){
        return ele.click();
    },fllwr);

    await tab.waitForSelector(".FPmhX.notranslate._0imsa",{visible:true});

    let clickprofile=await tab.$$(".FPmhX.notranslate._0imsa");
    let prfl=await clickprofile[3];
    await tab.evaluate(function(ele){
        return ele.click();
    },prfl);

    await tab.waitForSelector(".sqdOP.L3NKy._8A5w5",{visible:true});
    await tab.click(".sqdOP.L3NKy._8A5w5");
    await tab.waitForSelector(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi",{visible:true});
     let msg=await["hii","hello"];
    for(let i=0;i<msg.length;i++)
    {
            await tab.type(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi",msg[i]);
            await tab.waitForTimeout(5000);
            let preSend=await tab.$$(".sqdOP.yWX7d.y3zKF");
            let send=await preSend[2];
            await tab.evaluate(function(ele){
                return ele.click();
            },send);
           await  tab.waitForTimeout(10000);
    }        
    



   };
   instaLogin();
    