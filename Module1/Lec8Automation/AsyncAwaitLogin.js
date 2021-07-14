const puppeteer=require("puppeteer");
const id="xeyefig558@geekale.com";
const pwd="abcdef@123";

    (async function login(){
       let browser= await puppeteer.launch({headless:false,
            defaultViewport:null,
            args:["--start-maximized"],
        });
        let pages=await browser.pages();
        let tab =pages[0];
        await tab.goto("https://www.hackerrank.com/auth/login");
        await tab.type("#input-1",id);
        await tab.type("#input-2",pwd);
        await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        console.log("logged in"); 
        await tab.click(".dropdown-handle.nav_link.toggle-wrap");
        await tab.waitForTimeout(2000);
        let element=await tab.$('div[data-analytics="NavBarProfileDropDown"]');
        await element.click();
        await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
        let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
        let manageChallengeLi = bothLis[1];
        await manageChallengeLi.click();
        await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true});
        let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }   ,  createChallengeElement)
        createChallengeLink = "https://www.hackerrank.com"+createChallengeLink;
        for(let i=0 ; i<challenges.length ; i++){
        await addChallenges(browser , createChallengeLink , challenges[i]);
    


   
    }
})
    login();
    
 