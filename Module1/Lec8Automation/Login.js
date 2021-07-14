    const puppeteer=require("puppeteer");
    const id="xeyefig558@geekale.com";
    const pwd="abcdef@123";
    let tab;
    let idx;
    let gCode;
    //console.log("Hello world");
    // puppeteer has promisfied functions
    let browserpromise=puppeteer.launch({headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });
   // by default headless = true
   
    browserpromise.then(function(browser){
        console.log("browser is opened");
        return browser.pages();
    })
    .then(function(pages){
        tab=pages[0];
        return tab.goto("https://www.hackerrank.com/auth/login");
    })
   
    .then(function(){
        return tab.type("#input-1",id);
    })
    .then(function(){
        return tab.type("#input-2",pwd);
    })
    .then(function(){
        return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    })
    .then(function(){
        return WaitAndClick("#base-card-1-link");
    })
    .then(function(){
        return WaitAndClick('a[data-attr1="warmup"]');
    })
    .then(function(){
        return tab.waitForSelector(".js-track-click.challenge-list-item", { visible: true});
    })
    .then(function(){
        return tab.$$(".js-track-click.challenge-list-item");
    })
    .then(function(allQuesArray){
        let allPendingPromise=[];
        for(let i=0;i<allQuesArray.length;i++)
        {
            let oneATag=allQuesArray[i];
            let PendingPromise=tab.evaluate(function(element) {return element.getAttribute("href");},oneATag);
            allPendingPromise.push(PendingPromise);
        }
        
       let allpromiseCombined=promise.all(allPendingPromise);
       return allpromiseCombined;
       
    })
    .then(function(allQuesLink){
        //console.log(allQuesLink);
     let onequesSolvePromise=solveQues(allQuesLink[0]);
        for(let i=1; i<allQuesLink.length; i++)
        {
           onequesSolvePromise=onequesSolvePromise.then(function(){
               let nextQuesSolve=solveQues(allQuesLink[i]);
               return nextQuesSolve; 
           }) 
          
        }
        return onequesSolvePromise;
    })
    .then(function(){
        console.log("all questions are solved");
    })
    .catch(function(err){
        console.log(err);
    });

    function getCode()
    { 
        return new promise(function(scb ,fcb){
            let waitpromise=tab.waitForSelector(".hackdown-content h3",{visible:true});
            waitpromise.then(function(){
                return tab.$$(".hackdown-content h3");
            })
            .then(function(allCodeNamesElement){
                let allCodePromise=[];
                for(let i=0; i<allCodeNamesElement.length; i++)
                {
                    let codeNamePromise=tab.evaluate(function(elem){return elem.textContent;} , allCodeNamesElement[i]);
                    allCodePromise.push(codeNamePromise);
                }
                let combinedPromise=promise.all(allCodePromise);
                return combinedPromise;
            }) 
            .then(function(allCodeName){
                for(let i=0; i<allCodeName.length; i++)
                {
                    if(allCodeName[i]=="C++")
                    {
                        idx=i;
                        break;
                    }
                }
                return tab.$$(".hackdown-content .highlight");
            })  
            .then(function(allCodeDiv){
                let codeDiv=allCodeDiv[idx];
                return tab.evaluate(function(elem){return elem.textContent;},codeDiv);
            })
            .then(function(code){
                gCode=code;
                 scb();
            })
            .catch(function(err){
                fcb(err);
            })
        
        
        })
     
    }  

    function pasteCode(){
        return new promise(function(scb , fcb){
            let WaitAndClickPromise=WaitAndClick('.checkbox-input');
            WaitAndClickPromise.then(function(){

                return tab.waitForTimeout(2000);
            })
            .then(function(){
                return tab.type('.custominput' ,gCode);
            })
            .then(function(){
                return tab.keyboard.down("Control");
            })
            .then(function(){
                return tab.keyboard.press("A");
            })
            // .then(function(){
            //     return tab.keyboard.press("A");
            // })
            .then(function(){
                return tab.keyboard.press("X");
            })
            .then(function(){
                return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
            })
             .then(function(){
                return tab.keyboard.press("A");
            })
            .then(function(){
                return tab.keyboard.press("V");
            })
            // .then(function(){
            //     return tab.keyboard.press("A");
            // })
            .then(function(){
                return tab.keyboard.up("Control");
            })
            .then(function(){
                scb();
            })
            .catch(function(){
                fcb();
            })
          
         })
    }

    function handleLockBtn(){
        return new promise(function(scb ,fcb ){
            let waitForLockBtn=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
            waitForLockBtn.then(function(){
                return tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
            })
            .then(function(lockbtn){
                return tab.evaluate(function(elem){return elem.click() },lockbtn);

            })
            .then(function(){
                // Lock Button Found !!
                console.log("Lock Button Found !!");
                scb();
              })
              .catch(function(){
                // Lock Button Not Found !!
                console.log("Lock Button not found !!");
                fcb();
              })

        })

    }
   
    function solveQues(quesLink)
    {

        return new promise(function(scb , fcb){
            let gotopromise=tab.goto("https://www.hackerrank.com"+quesLink);
            gotopromise.then(function(){
                return WaitAndClick('div[data-attr2="Editorial"]');
            })
            .then(function(){
                return handleLockBtn();
            })
            .then(function(){
                return getCode();
            })
            .then(function(){
                return tab.click('div[data-attr2="Problem"]');
            })
            .then(function(){
                return pasteCode();
            })
            .then(function(){
                return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary');
            })
            .then(function(){
                return scb();
            })
            .catch(function(err){
                return fcb(err);
            })

         });

    }

    function WaitAndClick(Selector){
        return new Promise(function(scb,fcb){
            let Waitpromise=tab.waitForSelector(Selector,{visible:true});
            Waitpromise.then(function(){
                return tab.click(Selector);
            })
            .then(function(){
                scb();
            })
            .catch(function(){
                fcb();
            });
         });
    }


   
 
