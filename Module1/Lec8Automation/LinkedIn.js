const puppeteer=require("puppeteer");
let link="https://www.linkedin.com/home";
  require('dotenv').config();
let id=process.env.LinkedInUserId;
let pwd=process.env.LinkedInPassword;
    async function openLinkedInLogin(){
        let openLinkedIn=await puppeteer.launch({headless:false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        let pages=await openLinkedIn.pages();
        let tab=pages[0];
         await tab.goto(link);
         await tab.type(".input__input#session_key",id);
         await tab.type(".input__input#session_password",pwd);
         await tab.click(".sign-in-form__submit-button");
         console.log("login successfullly");
          await waitForSelector(".btn__secondary--large-muted",{visible:true});
          await tab.click(".btn__secondary--large-muted");
         await tab.waitForSelector(".search-global-typeahead__input.always-show-placeholder",{visible:true});
         await tab.waitForTimeout(2000);

         await tab.type(".search-global-typeahead__input.always-show-placeholder"," nucleus software ");
         await tab.waitForTimeout(2000);
         await tab.keyboard.press("Enter");
         await tab.waitForTimeout(10000);
         await tab.waitForSelector('button[aria-label="People"]',{visible:true});
         let allPeoples=await tab.$('button[aria-label="People"]');
         await allPeoples.click();
         await tab.waitForTimeout(10000);
          await tab.waitForSelector('.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view',{visible:true});
          let allConnection=await tab.$$('.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view');
          await console.log(allConnection.length);
          for(let i=2;i<allConnection.length-2;i++)
          {
             let oneConnection= await allConnection[i];
             await oneConnection.click();
             if(await tab.$(".ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view")){
            await tab.waitForSelector(".ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view",{visible:true});
            let sendIt=await tab.$(".ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view");
            if(sendIt);
            await sendIt.click();
            await tab.waitForTimeout(3000);}
           
              
          
          }

    };
    openLinkedInLogin();