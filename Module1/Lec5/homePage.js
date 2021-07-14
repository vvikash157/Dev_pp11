    
    let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

    const request = require("request");
    const cheerio = require("cheerio");
    const getAllMatches = require("./allmatches");


    request(matchLink , function(error , response , Data){
         processData(Data);
      
    })  


    function processData(htmlData){
        let myDocument = cheerio.load(htmlData);
        let aTag = myDocument(".widget-items.cta-link a");
        // console.log(aTag);
        // console.log(    aTag.attr("href")    );
        let allMatchesLink = "https://www.espncricinfo.com" + aTag["0"].attribs.href;
        //console.log(allMatchesLink);
        getAllMatches(allMatchesLink);
    }