const request = require("request");
const cheerio = require("cheerio");
const getMatchDetails = require("./Match");



function getAllMatches(allMatchesLink){
    
    request(allMatchesLink , function(error , response , data){
       processData(data);
    })

}


function processData(html){
    let myDocument = cheerio.load(html);
    let allATags = myDocument('a[data-hover="Scorecard"]');
    console.log(allATags.length);
    //    { "0" : {aTag} , ......... "59" : {aTag} };
    for(let i=0 ; i<allATags.length ; i++){
        let matchLink =  "https://www.espncricinfo.com" + myDocument(allATags[i]).attr("href");
        getMatchDetails(matchLink);
        //console.log(matchLink);
    }   
}



    module.exports = getAllMatches; 

    // request(matchLink,cb);
    // function cb(error,res,Data)
    // {
    //     myDocument=cheerio.load(matchLink);
    //     let bothTable=
    // }